import React from "react";
import { ContextCheck, FieldContexts } from "../fieldContexts";
import { DropDownProps } from "../../../../interfaces/sharedInterfaces";
import classNames from "classnames";

export const FormDropDown: React.FC<DropDownProps> = ({
  registerLabel,
  options,
  ddValue,
  inputClassAdditions,
  classOverwrite,
  userOptions,
  updateStateVar,
}) => {
  const fieldContexts = React.useContext(FieldContexts);

  const classes = classNames(
    (inputClassAdditions ?? "") +
      " " +
      (fieldContexts?.isLocked ? "!bg-slate-200 !cursor-not-allowed " : "") +
      (classOverwrite ??
        "block  focus:ring-0 border px-5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0")
  );

  return (
    <ContextCheck fieldContexts={fieldContexts}>
      <select
        {...fieldContexts!.register(registerLabel as string, options)}
        name={registerLabel}
        disabled={fieldContexts?.isLocked}
        value={ddValue?.toString() ?? ""}
        className={classes}
        onChange={updateStateVar}
      >
        <option value=""></option>
        {userOptions &&
          userOptions.map((opt, optIdx) => (
            <option className="text-xs" key={optIdx} value={opt.value}>
              {opt.label}
            </option>
          ))}
      </select>
    </ContextCheck>
  );
};
