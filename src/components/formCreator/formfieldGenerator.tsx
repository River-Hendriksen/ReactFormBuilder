import { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm, ValidationMode } from "react-hook-form";
import { yupGeneration } from "../yupSchemaCreator/yupSchemaGenerator";
import { isEmpty } from "lodash";
import {
  formProperties,
  formProp,
  clusterProp,
  formBuilderProps,
} from "../../interfaces/formGenerationInterfaces";
import { yupFormBuilderProps } from "../../interfaces/yupSchemaInterfaces";
import { FieldWrapperType } from "./forms/formWrappers/fieldWrapper";
import { FieldContexts } from "./forms/fieldContexts";
import { FormDataContexts } from "./forms/formDataContext";

const Field = ({
  field,
  identifier,
}: {
  field: formProperties;
  identifier: string;
}) => {
  return (
    <FieldWrapperType
      fieldIdentity={identifier}
      isDisabled={field.isDisabled}
      type={field.type}
      isLabelLeft={field.isLabelLeft}
      labelClassName={field.labelClassName}
      label={field.label}
      ddOptions={field.dropDownOptions}
      wrapperClassName={field.wrapperClassName}
    />
  );
};

const RescursiveChildren = ({ children }: { children: formProp }) => {
  return (
    <>
      {Object.keys(children).map((key, idx) => {
        let field = children ? children[key] : ({} as formProperties);
        return (
          <>
            <Field key={idx} field={field} identifier={key} />
            {field.children && <RescursiveChildren children={field.children} />}
          </>
        );
      })}
    </>
  );
};

const RescursiveCluster = ({ children }: { children: clusterProp[] }) => {
  return (
    <>
      {children.map((child, idx) => {
        return (
          <>
            <div className={child.className} key={idx}>
              {child.title && (
                <h2 className={child.titleClassName ?? ""}>{child.title}</h2>
              )}
              {child.fields &&
                Object.keys(child.fields).map((key, idx) => {
                  let field = child.fields
                    ? child.fields[key]
                    : ({} as formProperties);
                  return (
                    <>
                      <Field key={idx} field={field} identifier={key} />
                      {field.children && (
                        <RescursiveChildren children={field.children} />
                      )}
                    </>
                  );
                })}
              {child.children && (
                <RescursiveCluster children={child.children} />
              )}
            </div>
          </>
        );
      })}
    </>
  );
};

export const FormFieldGenerator = ({
  schema,
  data,
}: {
  schema: formBuilderProps;
  data: any;
}) => {
  const [formData, _setFormData] = useState<any>(data);
  const setFormData = (key: string, value: any) => {
    _setFormData({ ...formData, [key]: value });
  };

  return (
    <FormDataContexts.Provider
      value={{
        formData: formData,
        setFormData: setFormData,
      }}
    >
      <div className="mx-20">
        {schema.properties.map((cluster, idx) => {
          return (
            <div className={cluster.className} key={idx}>
              {cluster.fields &&
                Object.keys(cluster.fields).map((key, idx) => {
                  let field = cluster.fields
                    ? cluster.fields[key]
                    : ({} as formProperties);
                  return (
                    <>
                      <Field key={idx} field={field} identifier={key} />
                      {field.children && (
                        <RescursiveChildren
                          key={idx + key + "child"}
                          children={field.children}
                        />
                      )}
                    </>
                  );
                })}
              {cluster.children && (
                <RescursiveCluster children={cluster.children} />
              )}
            </div>
          );
        })}
      </div>
    </FormDataContexts.Provider>
  );
};

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

export interface schemaFormBuilderProps {
  children?: React.ReactNode;
  isLocked: boolean;
  watchFields?: string[];
  schema: CompleteFormProps;
  formClass?: string;
  fieldData?: any;
  fieldChanged: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (data: any) => void;
}

interface CompleteFormProps {
  type: string;
  formSchema: formBuilderProps;
  yupSchema?: yupFormBuilderProps;
}

export const FormBuilder: React.FC<schemaFormBuilderProps> = ({
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={formClass ?? " pb-10 md:py-10 mt-2 md:px-10"}
      >
        <FormFieldGenerator schema={schema.formSchema} data={fieldData} />
        {children}
      </form>
    </FieldContexts.Provider>
  );
};
