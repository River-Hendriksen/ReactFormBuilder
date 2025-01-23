import React, { useEffect, useState } from "react";
import { ContextCheck, FieldContexts } from "../fieldContexts";
import { BooleanProps } from "../../../../interfaces/sharedInterfaces";
import classNames from "classnames";
import { FormDataContexts } from "../formDataContext";

export const FormBoolean: React.FC<BooleanProps> = ({
  registerLabel,
  options,
  value,
  inputClassAdditions,
  disabledClassOverrides,
  updateStateVar,
}) => {
  const fieldContexts = React.useContext(FieldContexts);
  const formDataContexts = React.useContext(FormDataContexts);

  const [curBool, setCurBool] = useState<boolean | undefined>(
    value != null ? value == true : undefined
  );

  useEffect(() => {
    setCurBool(value != null ? value == true : undefined);
  }, [value]);

  let isDisabled: boolean = !!(
    formDataContexts?.isDisabled ?? fieldContexts?.isLocked
  );

  const classes = classNames(
    (isDisabled
      ? "!cursor-not-allowed !bg-slate-200 md:flex items-center justify-center p-4 "
      : "cursor-pointer ") +
      (inputClassAdditions ?? "ml-4 w-1/2 grid grid-cols-2 gap-3")
  );

  const labelClass =
    (isDisabled ? "!cursor-not-allowed" : "cursor-pointer") +
    " flex my-auto mr-5 justify-end";

  const inputClass =
    (isDisabled ? "!cursor-not-allowed !bg-slate-200 " : "cursor-pointer") +
    " shrink-0 h-[1.2rem] w-[1.2rem]  appearance-none rounded-full border border-slate-500 checked:bg-slate-500  shadow-[inset_0px_0px_0px_4px_rgba(255,255,255,1)]";

  return (
    <ContextCheck fieldContexts={fieldContexts}>
      <div className={classes}>
        <label className={labelClass}>
          <span className="text-md mr-2  text-gray-700 leading-5">Yes</span>
          <input
            type="radio"
            checked={curBool == true}
            disabled={isDisabled}
            className={inputClass}
            value={"true"}
            {...fieldContexts!.register(registerLabel as string, options)}
            onChange={() => {
              setCurBool(true);
              updateStateVar(true, registerLabel);
            }}
          />
        </label>

        <label className={labelClass}>
          <span className="text-md mr-2 leading-5">No</span>
          <input
            type="radio"
            disabled={isDisabled}
            checked={curBool == false}
            className={inputClass}
            value="false"
            {...fieldContexts!.register(registerLabel as string, options)}
            onChange={() => {
              setCurBool(false);
              updateStateVar(false, registerLabel);
            }}
          />
        </label>
      </div>
    </ContextCheck>
  );
};
