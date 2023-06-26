import React, { useContext } from 'react';
import { FieldContexts, ContextCheck } from '../fieldContexts';
import { FormDataContexts } from '../formDataContext';
import { FieldErrorWrapper } from './fieldErrorWrapper';
import { FormBoolean } from './formBoolean';
import { FormCheckbox } from './formCheckbox';
import { FormDateTime } from './formDateTime';
import { FormInput, FormInputNumber } from './formInput';
import FormLabel from './formLabel';
import { FormTextArea } from './formTextArea';
import { FormDropDown } from './formDropDown';
import {
    FieldChildWrapperProps,
    FieldWrapperProps,
    FieldWrapperPropsType,
} from '../../../../interfaces/formWrapperInterfaces';
import classNames from 'classnames';

import { CheckBoxArrayObjectValueProps } from '../../../../interfaces/sharedInterfaces';
import { FormCheckBoxArray } from './formCheckBoxArray';
import { FormLikert } from './formLikert';

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
            <div className={wrapperClassName ?? 'mb-10 relative'}>
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
            <div className={wrapperClassName ?? 'mb-10 relative'}>
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
    userOptions,
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
    likertLabels,
}) => {
    const fieldContexts = useContext(FieldContexts);
    const formDataContexts = useContext(FormDataContexts);

    const updateVal = (e: any, formField: string) => {
        fieldContexts?.setValue(formField, e.target.value);
        formDataContexts?.setFormData(formField, e.target.value);
    };

    const updateDateTimePicker = (fieldName: string, timepoint: Date) => {
        const timeString = timepoint.toString();
        formDataContexts?.setFormData(fieldName, timeString);
        fieldContexts?.setValue(fieldName, timeString);
    };

    const updateValCheckBox = (e: any, formField: string) => {
        fieldContexts?.setValue(formField, e);
        formDataContexts?.setFormData(formField, e);
    };

    const updateCheckboxArrayChange = (
        e: any,
        formField: string,
        idx: number
    ) => {
        const updatedFormData = [
            ...(formDataContexts?.formData[formField] || []),
        ]; // Create a copy of the array
        const updateCheck: CheckBoxArrayObjectValueProps = {
            ...updatedFormData[idx], // Copy the existing object at the specified index
            isChecked: e, // Update the isChecked property
        };

        updatedFormData[idx] = updateCheck; // Replace the object at the specified index with the updated object
        formDataContexts?.setFormData(formField, updatedFormData); // Update the formData array in the context
        fieldContexts?.setValue(formField, updatedFormData);
    };

    const fieldValue = formDataContexts?.formData?.[fieldIdentity];

    const inputType = () => {
        const components: { [key: string]: JSX.Element | null } = {
            input: (
                <FormInput
                    id={fieldIdentity}
                    registerLabel={fieldIdentity}
                    value={fieldValue}
                    updateStateVar={(e: any) => updateVal(e, fieldIdentity)}
                    inputClassAdditions={inputClassName}
                    maxLength={maxLength}
                    isDisabled={isDisabled}
                />
            ),
            numberInput: (
                <FormInputNumber
                    id={fieldIdentity}
                    registerLabel={fieldIdentity}
                    value={fieldValue}
                    updateStateVar={(e: any) => updateVal(e, fieldIdentity)}
                    isDisabled={isDisabled}
                />
            ),
            dropdown: userOptions ? (
                <FormDropDown
                    registerLabel={fieldIdentity}
                    ddValue={fieldValue}
                    userOptions={userOptions}
                    inputClassAdditions={inputClassName}
                    options={options}
                    classOverwrite={classOverwrite}
                    isDisabled={isDisabled}
                    updateStateVar={(e: any) => updateVal(e, fieldIdentity)}
                />
            ) : null,
            text: (
                <FormTextArea
                    id={fieldIdentity}
                    registerLabel={fieldIdentity}
                    value={fieldValue}
                    inputClassAdditions={inputClassName}
                    updateStateVar={(e: any) => updateVal(e, fieldIdentity)}
                    isDisabled={isDisabled}
                />
            ),
            bool: (
                <FormBoolean
                    id={fieldIdentity}
                    registerLabel={fieldIdentity}
                    inputClassAdditions={inputClassName}
                    value={fieldValue}
                    updateStateVar={updateVal}
                    isDisabled={isDisabled}
                />
            ),
            checkbox: (
                <FormCheckbox
                    id={fieldIdentity}
                    registerLabel={fieldIdentity}
                    inputClassAdditions={inputClassName}
                    value={fieldValue}
                    updateStateVar={updateValCheckBox}
                    isDisabled={isDisabled}
                />
            ),
            dateTime: (
                <FormDateTime
                    registerLabel={fieldIdentity}
                    value={fieldValue}
                    updateStateVar={updateDateTimePicker}
                    inputClassAdditions={inputClassName}
                    isDisabled={isDisabled}
                />
            ),
            checkboxArray: userOptions ? (
                <FormCheckBoxArray
                    registerLabel={fieldIdentity}
                    ddValue={fieldValue}
                    userOptions={userOptions}
                    inputClassAdditions={inputClassName}
                    options={options}
                    classOverwrite={classOverwrite}
                    isDisabled={isDisabled}
                    updateStateVar={updateCheckboxArrayChange}
                />
            ) : null,
            likert: userOptions ? (
                <FormLikert
                    registerLabel={fieldIdentity}
                    ddValue={fieldValue}
                    userOptions={userOptions}
                    inputClassAdditions={inputClassName}
                    options={options}
                    classOverwrite={classOverwrite}
                    isDisabled={isDisabled}
                    updateStateVar={updateCheckboxArrayChange}
                    likertLabels={likertLabels}
                />
            ) : null,
        };

        return components[type] || null;
    };

    const wrapperClassNames = classNames(wrapperClassName || 'mb-10 relative');
    const shouldRenderLabelLeft =
        isLabelLeft === true || isLabelLeft === undefined;
    return (
        <ContextCheck fieldContexts={fieldContexts}>
            <div className={wrapperClassNames}>
                {fieldContexts?.errors?.[fieldIdentity] && (
                    <FieldErrorWrapper
                        error={fieldContexts.errors[fieldIdentity]}
                        errMsg={errMsg}
                        errorClassName={errorClassName}
                    />
                )}
                {shouldRenderLabelLeft && (
                    <FormLabel
                        htmlFor={fieldIdentity}
                        labelContent={label || ''}
                        labelClassName={labelClassName}
                    />
                )}
                {inputType()}
                {!shouldRenderLabelLeft && (
                    <FormLabel
                        htmlFor={fieldIdentity}
                        labelContent={label || ''}
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
            {error && (
                <FieldErrorWrapper error={error} errorClassName={'ml-5'} />
            )}

            <div
                className={
                    wrapperClassName ??
                    'ml-10 pl-10 pr-10 border-l-2 border-slate-300'
                }
            >
                {children}
            </div>
        </>
    );
};
