import React, { useContext } from "react";
import { FieldContexts, ContextCheck } from "../fieldContexts";
import { FormDataContexts } from "../formDataContext";
import { FieldErrorWrapper } from "./fieldErrorWrapper";
import { FormBoolean } from "./formBoolean";
import { FormCheckbox } from "./formCheckbox";
import { FormDateTime } from "./formDateTime";
import { FormInput, FormInputNumber } from "./formInput";
import FormLabel from "./formLabel";
import { FormTextArea } from "./formTextArea";
import { FormDropDown } from "./fromDropDown";
import {
  FieldChildWrapperProps,
  FieldWrapperProps,
  FieldWrapperPropsType,
} from "../../../../interfaces/formWrapperInterfaces";
import classNames from "classnames";

export const FieldWrapper: React.FC<FieldWrapperProps> = ({
  htmlFor,
  fieldIdentifier,
  children,
  wrapperClassName,
}) => {
  const fieldContexts = useContext(FieldContexts);

  return (
    <ContextCheck fieldContexts={fieldContexts}>
      {fieldContexts!.errors && fieldContexts!.errors[htmlFor] && (
        <FieldErrorWrapper error={fieldContexts!.errors[htmlFor]} />
      )}
      <div className={wrapperClassName ?? "mb-10 relative"}>
        <FormLabel htmlFor={htmlFor} labelContent={fieldIdentifier} />
        {React.cloneElement(children, {
          registerLabel: htmlFor,
        })}
      </div>
    </ContextCheck>
  );
};

export const FieldWrapperRow: React.FC<FieldWrapperProps> = ({
  htmlFor,
  fieldIdentifier,
  children,
  wrapperClassName,
  errorClassName,
}) => {
  const fieldContexts = useContext(FieldContexts);

  return (
    <ContextCheck fieldContexts={fieldContexts}>
      <div className={wrapperClassName ?? "mb-10 relative"}>
        {fieldContexts!.errors && fieldContexts!.errors[htmlFor] && (
          <FieldErrorWrapper
            error={fieldContexts!.errors[htmlFor]}
            errorClassName={errorClassName}
          />
        )}
        <FormLabel htmlFor={htmlFor} labelContent={fieldIdentifier} />
        {React.cloneElement(children, {
          registerLabel: htmlFor,
        })}
      </div>
    </ContextCheck>
  );
};

export const FieldWrapperType: React.FC<FieldWrapperPropsType> = ({
  fieldIdentity,
  type,
  label,
  updateStateVar,
  ddOptions,
  wrapperClassName,
  labelClassName,
  inputClassName,
  options,
  classOverwrite,
  isLabelLeft,
  maxLength,
  errMsg,
  isDisabled,
  errorClassName,
}) => {
  const fieldContexts = React.useContext(FieldContexts);
  const formDataContexts = React.useContext(FormDataContexts);

  const updateVal = (e: any, formField: string) => {
    fieldContexts!.setValue(formField, e.target.value);
    formDataContexts?.setFormData(formField, e.target.value);
  };

  const updateDateTimePicker = (fieldName: string, timepoint: Date) => {
    formDataContexts?.setFormData(fieldName, timepoint.toString());
    fieldContexts!.setValue(fieldName, timepoint.toString());
  };

  const updateValCheckBox = (e: any, formField: string) => {
    fieldContexts!.setValue(formField, e);
    formDataContexts?.setFormData(formField, e);
  };

  let fieldValue = formDataContexts?.formData
    ? formDataContexts?.formData[fieldIdentity]
    : undefined;

  const inputType = () => {
    switch (type) {
      case "input": {
        return (
          <FormInput
            id={fieldIdentity}
            registerLabel={fieldIdentity}
            value={fieldValue}
            updateStateVar={(e: any) => updateVal(e, fieldIdentity)}
            inputClassAdditions={inputClassName}
            maxLength={maxLength}
            isDisabled={isDisabled}
          />
        );
      }
      case "numberInput": {
        return (
          <FormInputNumber
            id={fieldIdentity}
            registerLabel={fieldIdentity}
            value={fieldValue}
            updateStateVar={(e: any) => updateVal(e, fieldIdentity)}
            isDisabled={isDisabled}
          />
        );
      }
      case "dropdown": {
        if (!ddOptions) return;
        return (
          <FormDropDown
            registerLabel={fieldIdentity}
            ddValue={fieldValue}
            ddOptions={ddOptions}
            inputClassAdditions={inputClassName}
            options={options}
            classOverwrite={classOverwrite}
            isDisabled={isDisabled}
            updateStateVar={(e: any) => updateVal(e, fieldIdentity)}
          />
        );
      }
      case "text": {
        return (
          <FormTextArea
            id={fieldIdentity}
            registerLabel={fieldIdentity}
            value={fieldValue}
            inputClassAdditions={inputClassName}
            updateStateVar={(e: any) => updateVal(e, fieldIdentity)}
            isDisabled={isDisabled}
          />
        );
      }
      case "bool": {
        return (
          <FormBoolean
            id={fieldIdentity}
            registerLabel={fieldIdentity}
            inputClassAdditions={inputClassName}
            value={fieldValue}
            updateStateVar={updateVal}
            isDisabled={isDisabled}
          />
        );
      }
      case "checkbox": {
        return (
          <FormCheckbox
            id={fieldIdentity}
            registerLabel={fieldIdentity}
            inputClassAdditions={inputClassName}
            value={fieldValue}
            updateStateVar={updateValCheckBox}
            isDisabled={isDisabled}
          />
        );
      }
      case "dateTime": {
        return (
          <FormDateTime
            registerLabel={fieldIdentity}
            value={fieldValue}
            updateStateVar={updateDateTimePicker}
            inputClassAdditions={inputClassName}
            isDisabled={isDisabled}
          />
        );
      }
      // case "plainText": {
      //   return (
      //     <FormDateTime
      //       registerLabel={fieldIdentity}
      //       value={fieldValue}
      //       updateStateVar={updateDateTimePicker}
      //       inputClassAdditions={inputClassName}
      //       isDisabled={isDisabled}
      //     />
      //   );
      // }
      default:
        return <></>;
    }
  };

  const wrapperClassNames = classNames(wrapperClassName ?? "mb-10 relative");

  return (
    <ContextCheck fieldContexts={fieldContexts}>
      <div className={wrapperClassNames}>
        {fieldContexts!.errors && fieldContexts!.errors[fieldIdentity] && (
          <FieldErrorWrapper
            error={fieldContexts!.errors[fieldIdentity]}
            errMsg={errMsg}
            errorClassName={errorClassName}
          />
        )}
        {(isLabelLeft == true ||
          isLabelLeft == "true" ||
          isLabelLeft == undefined) && (
          <FormLabel
            htmlFor={fieldIdentity}
            labelContent={label ?? ""}
            labelClassName={labelClassName}
          />
        )}
        {inputType()}
        {(isLabelLeft == false || isLabelLeft == "false") && (
          <FormLabel
            htmlFor={fieldIdentity}
            labelContent={label ?? ""}
            labelClassName={labelClassName}
          />
        )}
      </div>
    </ContextCheck>
  );
};

export const FieldChildWrapper: React.FC<FieldChildWrapperProps> = ({
  children,
  error,
  wrapperClassName,
}) => {
  return (
    <>
      {error && <FieldErrorWrapper error={error} errorClassName={"ml-5"} />}

      <div
        className={
          wrapperClassName ?? "ml-10 pl-10 pr-10 border-l-2 border-slate-300"
        }
      >
        {children}
      </div>
    </>
  );
};
