import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { ValidationMode, useForm } from "react-hook-form";
import { FormFieldGenerator } from "./formfieldGenerator";

import {
  FormBuilderProps,
  SchemaFormBuilderProps,
} from "../../interfaces/formGenerationInterfaces";
import { yupGeneration } from "../yupSchemaCreator/yupSchemaGenerator";
import { FieldContexts } from "./forms/fieldContexts";
import classNames from "classnames";
import { isEmpty } from "../../utils/helpers";
import { FormDataContexts } from "./forms/formDataContext";

const ruleSetter = (validationSchema?: any) => {
  return validationSchema
    ? {
        mode: "onChange" as unknown as keyof ValidationMode | undefined,
        resolver: yupResolver(validationSchema),
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

  //changes when values are set on the form
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [formData, _setFormData] = useState<any>(fieldData);

  //have to make this a state because otherwise there is a race condition with formdata
  //could maybe combine this with formData but meh
  const [schemaData, setSchema] = useState<FormBuilderProps>(schema.formSchema);

  const setFormData = (key: string, value: any) => {
    _setFormData({ ...formData, [key]: value });
  };

  useEffect(() => {
    setSchema(schema.formSchema);
    reset();
  }, [schema]);

  // Callback version of watch.  It's your responsibility to unsubscribe when done.
  useEffect(() => {
    setIsChanged(!isEmpty(watchedFields));
  }, [watchedFields, isChanged]);

  useEffect(() => {
    _setFormData(fieldData);
    if (fieldData) {
      //set the values of the form to the values of the fieldData
      Object.entries(fieldData).forEach(([name, value]: any) => {
        const existingValue = getValues(name);

        //if the value is undefined and the existing value is undefined or null, don't set it
        if (existingValue == undefined && (value == undefined || value == null))
          return;

        //if the existing value is undefined and the value is not, set it or if the existing value is not equal to the value, set it
        if (
          existingValue !== value &&
          (existingValue !== undefined || value !== undefined)
        ) {
          setValue(name, value);
        }
      });
    }
    clearErrors();
    // reset();
  }, [fieldData]);

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
      <FormDataContexts.Provider value={{ formData: formData, setFormData }}>
        <form onSubmit={handleSubmit(onSubmit)} className={classes}>
          <FormFieldGenerator data={formData} schema={schemaData} />
          {children}
        </form>
      </FormDataContexts.Provider>
    </FieldContexts.Provider>
  );
};
