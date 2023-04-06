import React from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';

import { ContextCheck, FieldContexts } from '../fieldContexts';
import { FormDataContexts } from '../formDataContext';
import { DateTimeProps } from '../../../interfaces/sharedInterfaces';

export const FormDateTime: React.FC<DateTimeProps> = ({
    registerLabel,
    options,
    value,
    inputClassAdditions,
    isDisabled,
    updateStateVar,
}) => {
    const fieldContexts = React.useContext(FieldContexts);
    const formDataContexts = React.useContext(FormDataContexts);

    isDisabled =
        isDisabled ?? formDataContexts?.isDisabled ?? fieldContexts?.isLocked;

    return (
        <ContextCheck fieldContexts={fieldContexts}>
            <Flatpickr
                className={
                    (inputClassAdditions ?? '') +
                    ' ' +
                    (isDisabled
                        ? 'bg-slate-200 cursor-not-allowed '
                        : 'bg-transparent ') +
                    'block border px-5 pb-2.5 pt-4 w-full text-sm text-gray-900  rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 '
                }
                {...fieldContexts!.register(registerLabel as string, options)}
                onChange={(e: Date[]) =>
                    updateStateVar && updateStateVar(registerLabel, e[0])
                }
                options={{
                    enableTime: true,
                    time_24hr: true,
                    dateFormat: 'm/d/Y H:i',
                    enableSeconds: false,
                    onReady: function (dObj, dStr, fp, dayElem) {
                        //run on start to set the yup schema default value
                        fieldContexts!.setValue(
                            registerLabel,
                            (value && new Date(value)) ?? undefined
                        );
                    },
                }}
                value={(value && new Date(value)) ?? ''}
                disabled={isDisabled}
            ></Flatpickr>
        </ContextCheck>
    );
};
