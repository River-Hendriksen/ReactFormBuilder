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

  let isDisabled = formDataContexts?.isDisabled ?? fieldContexts?.isLocked;

  let fieldValue = formDataContexts?.formData
    ? formDataContexts?.formData[registerLabel]
    : false;

  const classes = classNames(inputClassAdditions ?? "pt-4 pr-4");

  return (
    <ContextCheck fieldContexts={fieldContexts}>
      <div className={classes}>
        <label className="block relative pl-8 mb-2 select-none">
          <input
            disabled={isDisabled}
            className={"checkbox checkbox-sm"}
            type="checkbox"
            checked={fieldValue}
            id={registerLabel}
            {...fieldContexts!.register(registerLabel as string, options)}
            onChange={(e) => {
              updateStateVar(e.target.checked, registerLabel);
            }}
          />
        </label>
      </div>
    </ContextCheck>
  );
};
