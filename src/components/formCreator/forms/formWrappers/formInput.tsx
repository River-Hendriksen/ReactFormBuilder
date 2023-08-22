import React from "react";
import { ChangeEventHandler } from "react";
import { ContextCheck, FieldContexts } from "../fieldContexts";
import { FormDataContexts } from "../formDataContext";
import { InputProps } from "../../../../interfaces/sharedInterfaces";
import classNames from "classnames";
import {
  InputOptions,
  InputValidOptions,
} from "../../../../interfaces/formWrapperInterfaces";

const inputOptionMapper = (inputOptions?: InputOptions) => {
  if (!inputOptions) return {};
  // Filter out properties that are not valid for input elements
  const validInputOptions: InputValidOptions = {};

  for (const key in inputOptions) {
    if (key === "DisableCopy" || key === "DisablePaste") {
      validInputOptions.onCopy = (e: any) => {
        if (inputOptions?.DisableCopy) {
          e.preventDefault();
          return false;
        }
        return e;
      };
    }
    if (key === "DisablePaste") {
      validInputOptions.onPaste = (e: any) => {
        if (inputOptions?.DisablePaste) {
          e.preventDefault();
          return false;
        }
        return e;
      };
    }
  }
  return validInputOptions;
};

export const FormInput: React.FC<InputProps> = ({
  id,
  registerLabel,
  options,
  value,
  maxLength,
  isDisabled,
  inputClassAdditions,
  inputOptions,
  updateStateVar,
}) => {
  const fieldContexts = React.useContext(FieldContexts);
  const formDataContexts = React.useContext(FormDataContexts);

  isDisabled =
    isDisabled ?? formDataContexts?.isDisabled ?? fieldContexts?.isLocked;

  const classes = classNames(
    (inputClassAdditions ?? "") +
      " " +
      (isDisabled ? "bg-slate-200 cursor-not-allowed " : "bg-transparent ") +
      "block border px-5 pb-2.5 pt-4 w-full text-sm text-gray-900  rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 "
  );

  return (
    <ContextCheck fieldContexts={fieldContexts}>
      <input
        id={id ?? ""}
        {...inputOptionMapper(inputOptions)}
        onPaste={(e) => {
          if (inputOptions?.DisableCopy) {
            e.preventDefault();
            return false;
          }
          return e;
        }}
        onCopy={(e) => {
          if (inputOptions?.DisablePaste) {
            e.preventDefault();
            return false;
          }
          return e;
        }}
        disabled={isDisabled}
        className={classes}
        type="text"
        maxLength={maxLength}
        {...fieldContexts!.register(registerLabel as string, options)}
        defaultValue={value ?? ""}
        onChange={updateStateVar as ChangeEventHandler<HTMLInputElement>}
      />
    </ContextCheck>
  );
};

export const FormInputNumber: React.FC<InputProps> = ({
  id,
  registerLabel,
  options,
  value,
  isDisabled,
  inputClassAdditions,
  updateStateVar,
}) => {
  const fieldContexts = React.useContext(FieldContexts);
  const formDataContexts = React.useContext(FormDataContexts);

  isDisabled =
    isDisabled ?? formDataContexts?.isDisabled ?? fieldContexts?.isLocked;

  const classes = classNames(
    (inputClassAdditions ?? "") +
      " " +
      (isDisabled ? "bg-slate-200 cursor-not-allowed " : "") +
      "block border px-5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 "
  );

  return (
    <ContextCheck fieldContexts={fieldContexts}>
      <input
        id={id ?? ""}
        disabled={isDisabled}
        className={classes}
        type="number"
        {...fieldContexts!.register(registerLabel as string, options)}
        defaultValue={value ?? ""}
        onChange={updateStateVar as ChangeEventHandler<HTMLInputElement>}
      />
    </ContextCheck>
  );
};
