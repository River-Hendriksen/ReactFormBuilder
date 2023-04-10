import React from "react";
import { ChangeEventHandler } from "react";

import { ContextCheck, FieldContexts } from "../fieldContexts";
import { FormDataContexts } from "../formDataContext";
import { InputProps } from "../../../../interfaces/sharedInterfaces";

export const FormTextArea: React.FC<InputProps> = ({
  registerLabel,
  options,
  value,

  updateStateVar,
}) => {
  const fieldContexts = React.useContext(FieldContexts);
  const formDataContexts = React.useContext(FormDataContexts);

  let isDisabled = formDataContexts?.isDisabled ?? fieldContexts?.isLocked;

  return (
    <ContextCheck fieldContexts={fieldContexts}>
      <textarea
        disabled={isDisabled}
        className={
          (isDisabled
            ? "!bg-slate-200 !cursor-not-allowed !text-gray-700 "
            : "") +
          "textarea border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700 bg-white"
        }
        {...fieldContexts!.register(registerLabel as string, options)}
        value={value ?? ""}
        onChange={updateStateVar as ChangeEventHandler<HTMLTextAreaElement>}
      />
    </ContextCheck>
  );
};
