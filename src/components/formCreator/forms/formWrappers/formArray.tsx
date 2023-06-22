import React from "react";
import { ContextCheck, FieldContexts } from "../fieldContexts";
import {
  CheckBoxArrayObjectValueProps,
  CheckBoxArrayProps,
} from "../../../../interfaces/sharedInterfaces";
import classNames from "classnames";
import { FormDataContexts } from "../formDataContext";

export const CheckBoxArray: React.FC<CheckBoxArrayProps> = ({
  registerLabel,
  options,
  inputClassAdditions,
  classOverwrite,
  ddOptions,
  updateStateVar,
}) => {
  const fieldContexts = React.useContext(FieldContexts);
  const formDataContexts = React.useContext(FormDataContexts);

  const classes = classNames(
    (inputClassAdditions ?? "") +
      " " +
      (fieldContexts?.isLocked ? "!bg-slate-200 !cursor-not-allowed " : "") +
      (classOverwrite ??
        "block  focus:ring-0  px-10 pb-2.5 pt-4 w-0 min-w-full text-sm text-gray-800 appearance-none ")
  );
  let isDisabled =
    formDataContexts?.isDisabled ?? fieldContexts?.isLocked ?? false;

  return (
    <ContextCheck fieldContexts={fieldContexts}>
      <div className={classes}>
        {ddOptions?.map((opt, optIdx) => {
          let fieldValue = formDataContexts?.formData
            ? (formDataContexts?.formData[registerLabel][
                optIdx
              ] as CheckBoxArrayObjectValueProps)
            : null;
          let fieldValueBool = fieldValue
            ? (fieldValue as CheckBoxArrayObjectValueProps)?.isChecked ?? false
            : false;

          return (
            <div key={fieldValue?.id} className="flex items-center mb-5">
              <input
                key={fieldValue?.id}
                disabled={isDisabled}
                className={
                  "w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 "
                }
                type="checkbox"
                checked={fieldValueBool}
                id={registerLabel}
                {...fieldContexts!.register(
                  `${registerLabel}.${optIdx}.isChecked`,
                  options
                )}
                onChange={(e) => {
                  updateStateVar(e.target.checked, registerLabel, optIdx);
                }}
              />
              <label className="ml-2 text-sm font-medium  text-gray-700">
                {opt.label}
              </label>
            </div>
          );
        })}
      </div>
    </ContextCheck>
  );
};
