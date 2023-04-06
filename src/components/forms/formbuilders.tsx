import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm, ValidationMode } from 'react-hook-form';
import { isEmpty } from '../../utils/helpers';
import { FieldContexts } from './fieldContexts';
import { FormBuilderProps } from '../../interfaces/formWrapperInterfaces';

const ruleSetter = (validationSchema?: any) => {
    return validationSchema
        ? {
              mode: 'onChange' as unknown as keyof ValidationMode | undefined,
              resolver: yupResolver(validationSchema),
          }
        : {
              mode: 'onChange' as unknown as keyof ValidationMode | undefined,
          };
};

export const FieldBuilder: React.FC<FormBuilderProps> = ({
    children,
    isLocked,
    fieldTitles,
    validationSchema,
    userFieldRequirements,
    watchFields,
    formClass,
    fieldChanged,
    onSubmit,
}) => {
    const {
        control,
        register,
        unregister,
        handleSubmit,
        setValue,
        getValues,
        watch,
        trigger,
        reset,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm(ruleSetter(validationSchema));

    const watchedFields = watchFields ? watch(watchFields) : watch();

    // Callback version of watch.  It's your responsibility to unsubscribe when done.
    useEffect(() => {
        fieldChanged(!isEmpty(watchedFields));
    }, [watchedFields, fieldChanged]);

    return (
        <FieldContexts.Provider
            value={{
                control: control,
                register: register,
                unregister: unregister,
                errors: errors,
                watch: watch,
                trigger: trigger,
                reset: reset,
                isLocked: isLocked,
                setValue: setValue,
                getValues: getValues,
                setError: setError,
                clearErrors: clearErrors,
                fieldTitles: fieldTitles,
                userFieldRequirements: userFieldRequirements,
            }}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={formClass ?? ' pb-10 md:py-10 mt-2 md:px-10'}
            >
                {children}
            </form>
        </FieldContexts.Provider>
    );
};
