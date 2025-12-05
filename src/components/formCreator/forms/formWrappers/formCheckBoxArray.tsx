import React from 'react';
import { ContextCheck, FieldContexts } from '../fieldContexts';
import {
    CheckBoxArrayObjectValueProps,
    CheckBoxArrayProps,
} from '../../../../interfaces/sharedInterfaces';
import classNames from 'classnames';
import { FormDataContexts } from '../formDataContext';

export const FormCheckBoxArray: React.FC<CheckBoxArrayProps> = ({
    registerLabel,
    options,
    inputClassAdditions,
    classOverwrite,
    userOptions,
}) => {
    const fieldContexts = React.useContext(FieldContexts);
    const formDataContexts = React.useContext(FormDataContexts);

    const classes = classNames(
        (inputClassAdditions ?? '') +
            ' ' +
            (fieldContexts?.isLocked
                ? '!bg-slate-200 !cursor-not-allowed '
                : '') +
            (classOverwrite ??
                'block  focus:ring-0  px-10 pb-2.5 pt-4 w-0 min-w-full text-sm text-gray-800 appearance-none ')
    );
    let isDisabled: boolean = !!(
        formDataContexts?.isDisabled ?? fieldContexts?.isLocked
    );

    const updateCheckboxArrayChange = (
        optVal: any,
        isChecked: any,
        formField: string,
        idx: number
    ) => {
        const updatedFormData = [
            ...(formDataContexts?.formData[formField] || []),
        ]; // Create a copy of the array

        const updateCheck: CheckBoxArrayObjectValueProps = {
            ...updatedFormData[idx], // Copy the existing object at the specified index
            isChecked: isChecked, // Update the isChecked property
            value: optVal, // Update the optVal property
        };

        updatedFormData[idx] = updateCheck; // Replace the object at the specified index with the updated object
        formDataContexts?.setFormData(formField, updatedFormData); // Update the formData array in the context
        fieldContexts?.setValue(formField, updatedFormData);
    };

    return (
        <ContextCheck fieldContexts={fieldContexts}>
            <div className={classes}>
                {!userOptions ||
                    (userOptions.length <= 0 && (
                        <div className="flex items-center mb-5">
                            {' '}
                            NO OPTIONS AVAILABLE{' '}
                        </div>
                    ))}
                {userOptions &&
                    userOptions.length > 0 &&
                    userOptions?.map((opt, optIdx) => {
                        let fieldValue: CheckBoxArrayObjectValueProps | null =
                            null;
                        try {
                            fieldValue = formDataContexts?.formData
                                ? (formDataContexts?.formData[registerLabel][
                                      optIdx
                                  ] as CheckBoxArrayObjectValueProps)
                                : null;
                        } catch (e) {
                            throw new Error(
                                'Error when getting value while generating the checkboxArray, verify field keyword is correct and present in your formData. Field keyword: ' +
                                    registerLabel +
                                    ' ' +
                                    e
                            );
                        }
                        let fieldValueBool = fieldValue
                            ? ((fieldValue as CheckBoxArrayObjectValueProps)
                                  ?.isChecked ?? false)
                            : false;
                        return (
                            <div
                                key={optIdx}
                                className="flex items-center mb-5"
                            >
                                <input
                                    disabled={isDisabled}
                                    className={
                                        'w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 '
                                    }
                                    type="checkbox"
                                    checked={fieldValueBool}
                                    id={registerLabel}
                                    // value={opt.value}
                                    {...fieldContexts!.register(
                                        `${registerLabel}.${optIdx}.isChecked`,
                                        options
                                    )}
                                    onChange={(e) => {
                                        updateCheckboxArrayChange(
                                            opt.value,
                                            e.target.checked,
                                            registerLabel,
                                            optIdx
                                        );
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
