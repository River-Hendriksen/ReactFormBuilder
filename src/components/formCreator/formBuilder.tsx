import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { ValidationMode, useForm } from "react-hook-form";
import { FormFieldGenerator } from "./formfieldGenerator";
import { isEmpty } from "lodash";
import { SchemaFormBuilderProps } from "../../interfaces/formGenerationInterfaces";
import { yupGeneration } from "../yupSchemaCreator/yupSchemaGenerator";
import { FieldContexts } from "./forms/fieldContexts";
import classNames from "classnames";

const ruleSetter = (validationSchema?: any) => {
  return validationSchema
    ? {
        mode: "onChange" as unknown as keyof ValidationMode | undefined,
        resolver: yupResolver(validationSchema),
        context: { expectedValue: "hi" },
      }
    : {
        mode: "onChange" as unknown as keyof ValidationMode | undefined,
      };
};

export const FormBuilder: React.FC<SchemaFormBuilderProps> = ({
  children,
  schema,
  isLocked,
  fieldData,
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
  } = useForm(
    ruleSetter(schema.yupSchema ? yupGeneration(schema.yupSchema) : undefined)
  );

  const watchedFields = watchFields ? watch(watchFields) : watch();
  const classes = classNames(formClass ?? " pb-10 md:py-10 mt-2 md:px-10");

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
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={classes}>
        <FormFieldGenerator schema={schema.formSchema} data={fieldData} />
        {children}
      </form>
    </FieldContexts.Provider>
  );
};
