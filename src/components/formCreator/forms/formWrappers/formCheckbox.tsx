import React from "react";
import { ContextCheck, FieldContexts } from "../fieldContexts";
import { FormDataContexts } from "../formDataContext";
import { BooleanProps } from "../../../../interfaces/sharedInterfaces";
import classNames from "classnames";

export const FormCheckbox: React.FC<BooleanProps> = ({
  registerLabel,
  options,
  inputClassAdditions,
  updateStateVar,
}) => {
  const fieldContexts = React.useContext(FieldContexts);
  const formDataContexts = React.useContext(FormDataContexts);

  let isDisabled =
    formDataContexts?.isDisabled ?? fieldContexts?.isLocked ?? false;

  let fieldValue = formDataContexts?.formData
    ? formDataContexts?.formData[registerLabel] ?? false
    : false;

  const classes = classNames(inputClassAdditions ?? "my-auto pr-4");

  return (
    <ContextCheck fieldContexts={fieldContexts}>
      <div className={classes}>
        <input
          disabled={isDisabled}
          className={"hidden"}
          type="checkbox"
          checked={fieldValue}
          id={registerLabel}
          {...fieldContexts!.register(registerLabel as string, options)}
          onChange={(e) => {
            updateStateVar(e.target.checked, registerLabel);
          }}
        />
        <label
          htmlFor={registerLabel}
          className="flex items-center cursor-pointer"
        >
          <span className=" peer relative h-5 w-5 cursor-pointer border-slate-400 appearance-none rounded-md border-solid border-[1px] border-blue-gray-200 transition-all  border-pink-500 hover:before:opacity-10">
            {fieldValue && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4.5 w-4.5 "
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            )}
          </span>
        </label>
      </div>
    </ContextCheck>
  );
};
