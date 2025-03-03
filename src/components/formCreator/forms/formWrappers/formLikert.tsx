import React from "react";
import { ContextCheck, FieldContexts } from "../fieldContexts";
import { LikertProps } from "../../../../interfaces/sharedInterfaces";
import classNames from "classnames";
import { FormDataContexts } from "../formDataContext";

export const FormLikert: React.FC<LikertProps> = ({
  registerLabel,
  options,
  inputClassAdditions,
  disabledClassOverrides,
  classOverwrite,
  userOptions,
  likertLabels,
  updateStateVar,
}) => {
  const fieldContexts = React.useContext(FieldContexts);
  const formDataContexts = React.useContext(FormDataContexts);

  let isDisabled: boolean = !!(
    formDataContexts?.isDisabled ?? fieldContexts?.isLocked
  );

  const classes = classNames(
    (inputClassAdditions ?? "") +
      " " +
      (isDisabled
        ? disabledClassOverrides ?? "!bg-slate-200 !cursor-not-allowed "
        : "") +
      (classOverwrite ?? "md:flex items-center justify-center p-4")
  );

  let fieldValue: number | null = formDataContexts?.formData
    ? formDataContexts?.formData[registerLabel]
    : null;

  const inputClass =
    (isDisabled ? "!cursor-not-allowed !bg-slate-200 " : "cursor-pointer") +
    " shrink-0 my-auto h-[1.2rem] w-[1.2rem] appearance-none rounded-full border border-slate-500 checked:bg-slate-500  shadow-[inset_0px_0px_0px_4px_rgba(255,255,255,1)]";

  return (
    <ContextCheck fieldContexts={fieldContexts}>
      <div className={classes}>
        {likertLabels?.minLabel && (
          <label
            className="block text-gray-700 text-sm font-bold text-center md:mr-10 mb-5 md:mb-0"
            htmlFor={registerLabel}
          >
            {likertLabels?.minLabel}
          </label>
        )}
        {userOptions?.map((opt, idx) => (
          <label
            key={idx}
            className={
              (isDisabled ? "!cursor-not-allowed " : "cursor-pointer ") +
              (likertLabels?.likertOptionClass ??
                "flex  my-auto mr-5 justify-end")
            }
          >
            <span
              className={
                likertLabels?.likertLabelClass ??
                "text-md mr-2 text-gray-700 leading-5"
              }
            >
              {opt.label}
            </span>
            <input
              type="radio"
              disabled={isDisabled}
              checked={fieldValue != null && fieldValue == opt.value}
              // id={`${registerLabel}-${opt.value.toString()}`}
              className={inputClass}
              value={opt.value}
              {...fieldContexts!.register(registerLabel as string, options)}
              onChange={(e) => updateStateVar(e, registerLabel)}
            />
          </label>
        ))}

        {likertLabels?.maxLabel && (
          <label
            className="block text-gray-700 text-sm font-bold text-center  md:mr-4 md:ml-10  mb-5 md:mb-0"
            htmlFor={registerLabel}
          >
            {likertLabels.maxLabel}
          </label>
        )}
      </div>
    </ContextCheck>
  );
};
