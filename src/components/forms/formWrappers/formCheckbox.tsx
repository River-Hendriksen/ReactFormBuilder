import React from 'react';
import { ChangeEventHandler } from 'react';
import { ContextCheck, FieldContexts } from '../fieldContexts';
import { FormDataContexts } from '../formDataContext';
import { BooleanProps } from '../../../interfaces/sharedInterfaces';

export const FormCheckbox: React.FC<BooleanProps> = ({
    registerLabel,
    options,
    inputClassAdditions,
    updateStateVar,
}) => {
    const fieldContexts = React.useContext(FieldContexts);
    const formDataContexts = React.useContext(FormDataContexts);

    let isDisabled = formDataContexts?.isDisabled ?? fieldContexts?.isLocked;

    return (
        <ContextCheck fieldContexts={fieldContexts}>
            <div className={inputClassAdditions ?? 'pt-4 pr-4'}>
                <label className="block relative pl-8 mb-2 select-none">
                    <input
                        disabled={isDisabled}
                        className={'checkbox checkbox-sm'}
                        type="checkbox"
                        id={registerLabel}
                        defaultChecked={
                            formDataContexts?.formData[registerLabel]
                        }
                        {...fieldContexts!.register(
                            registerLabel as string,
                            options
                        )}
                        onChange={() => {
                            updateStateVar as ChangeEventHandler<HTMLInputElement>;
                        }}
                    />
                </label>
            </div>
        </ContextCheck>
    );
};
