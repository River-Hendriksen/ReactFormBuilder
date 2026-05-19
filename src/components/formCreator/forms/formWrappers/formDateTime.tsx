import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { ContextCheck, FieldContexts } from "../fieldContexts";
import { FormDataContexts } from "../formDataContext";
import { DateTimeProps } from "../../../../interfaces/sharedInterfaces";
import classNames from "classnames";
import { DatepickerOptions } from "../../../../interfaces/formWrapperInterfaces";

const parseDateValue = (input: string | null | undefined): Date | null => {
  if (!input) return null;
  const parsedDate = new Date(input);
  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
};

const timeFormat = (datepickerOptions: DatepickerOptions | undefined) => {
  const flatpickrFormat = datepickerOptions?.timeFormat
    ? datepickerOptions.timeFormat
    : datepickerOptions?.dateOnly
    ? "m/d/Y"
    : "m/d/Y H:i";

  // Convert common flatpickr tokens to react-datepicker/date-fns tokens.
  return flatpickrFormat
    .replace(/Y/g, "yyyy")
    .replace(/m/g, "MM")
    .replace(/d/g, "dd")
    .replace(/H/g, "HH")
    .replace(/i/g, "mm");
};

export const FormDateTime: React.FC<DateTimeProps> = ({
  registerLabel,
  options,
  value,
  inputClassAdditions,
  isDisabled,
  datepickerOptions,
  updateStateVar,
}) => {
  const fieldContexts = React.useContext(FieldContexts);
  const formDataContexts = React.useContext(FormDataContexts);

  const [date, setDate] = useState<string | null | undefined>(value);

  useEffect(() => {
    setDate(value);

    const selectedDate = parseDateValue(value);
    fieldContexts?.setValue(
      registerLabel,
      selectedDate?.toString() ?? undefined,
    );
  }, [value]);

  let curisDisabled: boolean = !!(
    isDisabled ??
    (formDataContexts?.isDisabled || fieldContexts?.isLocked)
  );

  const classes = classNames(
    (curisDisabled ? "bg-slate-200 cursor-not-allowed " : "bg-transparent ") +
      " " +
      (inputClassAdditions ??
        "block border px-5 pb-2.5 pt-4 w-full text-sm text-gray-900  rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 "),
  );
  const selectedDate = parseDateValue(date);
  const registerOptions = fieldContexts?.register(
    registerLabel as string,
    options,
  );

  return (
    <ContextCheck fieldContexts={fieldContexts}>
      {registerOptions && (
        <input type="hidden" {...registerOptions} value={date ?? ""} readOnly />
      )}
      <DatePicker
        selected={selectedDate}
        onChange={(changedDate: Date | null) => {
          const dateString = changedDate?.toString() ?? null;
          setDate(dateString);
          fieldContexts?.setValue(registerLabel, dateString ?? undefined, {
            shouldDirty: true,
            shouldValidate: true,
          });
          if (changedDate && updateStateVar) {
            updateStateVar(registerLabel, changedDate);
          }
        }}
        showTimeSelect={!datepickerOptions?.dateOnly}
        dateFormat={timeFormat(datepickerOptions)}
        placeholderText="Select Date..."
        className={classes}
        disabled={curisDisabled}
      />
    </ContextCheck>
  );
};
