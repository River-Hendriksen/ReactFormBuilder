import React from "react";
import { ContextCheck, FieldContexts } from "../fieldContexts";

interface BadgeProps {
  badgeTextAppend?: string;
  value: string;
  inputClassAdditions?: string;
}

const BasicBadge = ({
  label,
  classOverwrite,
}: {
  label: string;
  classOverwrite?: string;
}) => {
  return (
    <div
      className={
        classOverwrite ??
        "bg-sky-400/10 text-sky-600 text-sm flex w-fit px-3 cursor-default mt-1 font-light  leading-5   rounded-full py-[.1rem] items-center space-x-2  dark:highlight-white/5"
      }
    >
      {label}
    </div>
  );
};

export const FormBadge: React.FC<BadgeProps> = ({
  badgeTextAppend,
  value,
  inputClassAdditions,
}) => {
  const fieldContexts = React.useContext(FieldContexts);

  return (
    <ContextCheck fieldContexts={fieldContexts}>
      <BasicBadge
        label={(badgeTextAppend ?? "") + (value ?? "")}
        classOverwrite={inputClassAdditions}
      />
    </ContextCheck>
  );
};
