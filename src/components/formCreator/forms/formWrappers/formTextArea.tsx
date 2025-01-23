import React from "react";
import { ChangeEventHandler } from "react";
import { ContextCheck, FieldContexts } from "../fieldContexts";
import { FormDataContexts } from "../formDataContext";
import { InputProps } from "../../../../interfaces/sharedInterfaces";
import classNames from "classnames";

export const FormTextArea: React.FC<InputProps> = ({
  registerLabel,
  options,
  value,
  isDisabled,
  inputClassOverrides,
  inputClassAdditions,
  updateStateVar,
}) => {
  const fieldContexts = React.useContext(FieldContexts);
  const formDataContexts = React.useContext(FormDataContexts);

  isDisabled =
    isDisabled ?? formDataContexts?.isDisabled ?? fieldContexts?.isLocked;

  var nonOverridedClass =
    (inputClassAdditions ?? " ") +
    " textarea border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700 ";

  const classes = classNames(
    (isDisabled
      ? "!bg-slate-200 !cursor-not-allowed !text-gray-700 "
      : "bg-white ") + (inputClassOverrides ?? nonOverridedClass)
  );

  return (
    <ContextCheck fieldContexts={fieldContexts}>
      <textarea
        disabled={isDisabled}
        className={classes}
        {...fieldContexts!.register(registerLabel as string, options)}
        value={value ?? ""}
        onChange={updateStateVar as ChangeEventHandler<HTMLTextAreaElement>}
      />
    </ContextCheck>
  );
};
