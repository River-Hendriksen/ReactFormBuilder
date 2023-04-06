import { Control, FieldValues, UseFormRegister, UseFormUnregister, FieldErrorsImpl, DeepRequired, UseFormReset, UseFormWatch, UseFormTrigger, UseFormSetValue, UseFormGetValues, UseFormSetError, UseFormClearErrors } from "react-hook-form";
import { userFieldRequirements } from "./formWrapperInterfaces";

export interface FieldContextsProps {
    control: Control<FieldValues, any>;
    register: UseFormRegister<FieldValues>;
    unregister: UseFormUnregister<FieldValues>;
    errors?: FieldErrorsImpl<DeepRequired<FieldValues>>;
    isLocked: boolean;
    userFieldRequirements?: userFieldRequirements[];
    fieldTitles: {
        [key: string]: string;
    };
    reset: UseFormReset<FieldValues>;
    watch: UseFormWatch<FieldValues>;
    trigger: UseFormTrigger<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;
    getValues: UseFormGetValues<FieldValues>;
    setError: UseFormSetError<FieldValues>;
    clearErrors: UseFormClearErrors<FieldValues>;
}
export interface FormDataContextsProps {
    formData: any;
    isDisabled?: boolean;
    setFormData: (key: string, value: any) => void;
}