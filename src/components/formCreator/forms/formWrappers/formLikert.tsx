import React from "react";
import { ContextCheck, FieldContexts } from "../fieldContexts";
import { LikertProps } from "../../../../interfaces/sharedInterfaces";
import classNames from "classnames";
import { FormDataContexts } from "../formDataContext";

export const FormLikert: React.FC<LikertProps> = ({
  registerLabel,
  options,
  inputClassAdditions,
  classOverwrite,
  userOptions,
  likertLabels,
}) => {
  const fieldContexts = React.useContext(FieldContexts);
  const formDataContexts = React.useContext(FormDataContexts);

  const classes = classNames(
    (inputClassAdditions ?? "") +
      " " +
      (fieldContexts?.isLocked ? "!bg-slate-200 !cursor-not-allowed " : "") +
      (classOverwrite ?? "flex items-center justify-center p-4")
  );
  let isDisabled =
    formDataContexts?.isDisabled ?? fieldContexts?.isLocked ?? false;

  return (
    <ContextCheck fieldContexts={fieldContexts}>
      <div className={classes}>
        {likertLabels?.minLabel && (
          <label
            className="block text-gray-700 text-sm font-bold mr-10"
            htmlFor={registerLabel}
          >
            {likertLabels?.minLabel}
          </label>
        )}
        {userOptions?.map((opt, idx) => (
          <div
            key={idx}
            className="grid grid-rows-2 grid-flow-col items-center mr-4"
          >
            <input
              type="radio"
              disabled={isDisabled}
              id={`${registerLabel}-${opt.value.toString()}`}
              className="radio radio-xs checked:bg-gray-500"
              value={opt.value}
              {...fieldContexts!.register(registerLabel as string, options)}
            />

            <label
              htmlFor={`${registerLabel}-${opt.value.toString()}`}
              className="mt-1"
            >
              {opt.label}
            </label>
          </div>
        ))}

        {likertLabels?.maxLabel && (
          <label
            className="block text-gray-700 text-sm font-bold mr-4 ml-10"
            htmlFor={registerLabel}
          >
            {likertLabels.maxLabel}
          </label>
        )}
      </div>
    </ContextCheck>
  );
};
