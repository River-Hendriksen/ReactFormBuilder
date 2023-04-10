import React, { useState } from "react";
import { ChangeEventHandler } from "react";
import { ContextCheck, FieldContexts } from "../fieldContexts";
import { BooleanProps } from "../../../../interfaces/sharedInterfaces";

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

  return (
    <ContextCheck fieldContexts={fieldContexts}>
      <div
        className={inputClassAdditions ?? "ml-4 w-1/2 grid grid-cols-2 gap-3"}
      >
        <label className="flex cursor-pointer">
          <span className="text-md mr-2 mb-3 text-gray-500 leading-5">Yes</span>
          <input
            type="radio"
            checked={curBool == true}
            className="radio radio-xs checked:bg-gray-500  mt-1"
            value="true"
            {...fieldContexts!.register(registerLabel as string, options)}
            onChange={() => {
              setCurBool(true);
              updateStateVar as ChangeEventHandler<HTMLInputElement>;
            }}
          />
        </label>

        <label className="flex cursor-pointer">
          <span className="text-md mr-2 mb-3 text-gray-500 leading-5">No</span>
          <input
            type="radio"
            checked={curBool == false}
            className="radio radio-xs text-gray-500 checked:bg-gray-500 mt-1"
            value="false"
            {...fieldContexts!.register(registerLabel as string, options)}
            onChange={() => {
              setCurBool(false);
              updateStateVar as ChangeEventHandler<HTMLInputElement>;
            }}
          />
        </label>
      </div>
    </ContextCheck>
  );
};
