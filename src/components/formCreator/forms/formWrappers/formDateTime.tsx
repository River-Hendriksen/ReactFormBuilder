import React, { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import { ContextCheck, FieldContexts } from "../fieldContexts";
import { FormDataContexts } from "../formDataContext";
import { DateTimeProps } from "../../../../interfaces/sharedInterfaces";
import classNames from "classnames";
import { DatepickerOptions } from "../../../../interfaces/formWrapperInterfaces";

const timeFormat = (datepickerOptions: DatepickerOptions | undefined) => {
  if (datepickerOptions?.timeFormat) return datepickerOptions?.timeFormat;
  else if (datepickerOptions?.dateOnly) return "m/d/Y";
  else return "m/d/Y H:i";
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
  }, [value]);

  let curisDisabled: boolean = !!(
    isDisabled ??
    (formDataContexts?.isDisabled || fieldContexts?.isLocked)
  );

  const classes = classNames(
    (curisDisabled ? "bg-slate-200 cursor-not-allowed " : "bg-transparent ") +
      " " +
      (inputClassAdditions ??
        "block border px-5 pb-2.5 pt-4 w-full text-sm text-gray-900  rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 ")
  );
  const currentDate = new Date();
  return (
    <ContextCheck fieldContexts={fieldContexts}>
      <Flatpickr
        className={classes}
        {...fieldContexts!.register(registerLabel as string, options)}
        onChange={(e: Date[]) =>
          updateStateVar && updateStateVar(registerLabel, e[0])
        }
        placeholder="Select Date..."
        options={{
          enableTime: datepickerOptions?.dateOnly ?? true,
          time_24hr: true,
          dateFormat: timeFormat(datepickerOptions),
          enableSeconds: false,
          defaultDate: currentDate,
          defaultHour: currentDate.getHours(),
          defaultMinute: currentDate.getMinutes(),
          onReady: function (dObj, dStr, fp, dayElem) {
            //run on start to set the yup schema default value
            fieldContexts!.setValue(
              registerLabel,
              (value && new Date(value)) ?? undefined
            );
          },
        }}
        value={(date && new Date(date)) ?? ""}
        disabled={curisDisabled}
      />
    </ContextCheck>
  );
};
