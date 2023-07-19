import React, { useState } from "react";
import { ContextCheck, FieldContexts } from "../fieldContexts";
import { BooleanProps } from "../../../../interfaces/sharedInterfaces";
import classNames from "classnames";

export const FormBoolean: React.FC<BooleanProps> = ({
  registerLabel,
  options,
  value,
  inputClassAdditions,
  updateStateVar,
}) => {
  const fieldContexts = React.useContext(FieldContexts);

  const [curBool, setCurBool] = useState<boolean | undefined>(
    value != null ? value == true : undefined
  );

  const classes = classNames(
    inputClassAdditions ?? "ml-4 w-1/2 grid grid-cols-2 gap-3"
  );

  return (
    <ContextCheck fieldContexts={fieldContexts}>
      <div className={classes}>
        <label className="flex cursor-pointer my-auto mr-5">
          <span className="text-md mr-2  text-gray-700 leading-5">Yes</span>
          <input
            type="radio"
            checked={curBool == true}
            className=" shrink-0 h-[1.2rem] w-[1.2rem] cursor-pointer appearance-none rounded-full border border-slate-500 checked:bg-slate-500  shadow-[inset_0px_0px_0px_4px_rgba(255,255,255,1)]"
            value={"true"}
            {...fieldContexts!.register(registerLabel as string, options)}
            onChange={() => {
              setCurBool(true);
              updateStateVar(true, registerLabel);
            }}
          />
        </label>

        <label className="flex cursor-pointer text-gray-700 my-auto">
          <span className="text-md mr-2 leading-5">No</span>
          <input
            type="radio"
            checked={curBool == false}
            className=" shrink-0 h-[1.2rem] w-[1.2rem] cursor-pointer appearance-none rounded-full border border-slate-500 checked:bg-slate-500  shadow-[inset_0px_0px_0px_4px_rgba(255,255,255,1)]"
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
