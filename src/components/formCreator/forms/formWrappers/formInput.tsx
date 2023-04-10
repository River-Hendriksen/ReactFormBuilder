import React from "react";
import { ChangeEventHandler } from "react";
import { ContextCheck, FieldContexts } from "../fieldContexts";
import { FormDataContexts } from "../formDataContext";
import { InputProps } from "../../../../interfaces/sharedInterfaces";

export const FormInput: React.FC<InputProps> = ({
  id,
  registerLabel,
  options,
  value,
  maxLength,
  isDisabled,
  inputClassAdditions,
  updateStateVar,
}) => {
  const fieldContexts = React.useContext(FieldContexts);
  const formDataContexts = React.useContext(FormDataContexts);

  isDisabled =
    isDisabled ?? formDataContexts?.isDisabled ?? fieldContexts?.isLocked;

  return (
    <ContextCheck fieldContexts={fieldContexts}>
      <input
        id={id ?? ""}
        disabled={isDisabled}
        className={
          (inputClassAdditions ?? "") +
          " " +
          (isDisabled
            ? "bg-slate-200 cursor-not-allowed "
            : "bg-transparent ") +
          "block border px-5 pb-2.5 pt-4 w-full text-sm text-gray-900  rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 "
        }
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

  return (
    <ContextCheck fieldContexts={fieldContexts}>
      <input
        id={id ?? ""}
        disabled={isDisabled}
        className={
          (inputClassAdditions ?? "") +
          " " +
          (isDisabled ? "bg-slate-200 cursor-not-allowed " : "") +
          "block border px-5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 "
        }
        type="number"
        {...fieldContexts!.register(registerLabel as string, options)}
        defaultValue={value ?? ""}
        onChange={updateStateVar as ChangeEventHandler<HTMLInputElement>}
      />
    </ContextCheck>
  );
};
