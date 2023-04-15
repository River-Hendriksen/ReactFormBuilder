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
import React from "react";
import classNames from "classnames";

const Field = ({
  field,
  identifier,
}: {
  field: formProperties;
  identifier: string;
}) => {
  const isDisabled =
    (field.isDisabled == true || field.isDisabled == "true") ?? false;

  return (
    <FieldWrapperType
      fieldIdentity={identifier}
      isDisabled={isDisabled}
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
          <React.Fragment
            key={"Rescursive.React.Fragment.Children.Field" + idx + key}
          >
            <Field
              key={"Rescursive.Children.Field" + idx + key}
              field={field}
              identifier={key}
            />
            {field.children && (
              <RescursiveChildren
                children={field.children}
                key={"Rescursive.Children.Children" + idx + key}
              />
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

const RescursiveCluster = ({ children }: { children: clusterProp[] }) => {
  return (
    <>
      {children.map((child, idx) => {
        const classes = classNames(child.className);
        const titleClasses = classNames(child.titleClassName);
        return (
          <React.Fragment key={"Rescursive.React.Fragment.Cluster" + idx}>
            <div className={classes} key={"rescursive.cluster" + idx}>
              {child.title && <h2 className={titleClasses}>{child.title}</h2>}
              {child.fields &&
                Object.keys(child.fields).map((key, idcf) => {
                  let field = child.fields
                    ? child.fields[key]
                    : ({} as formProperties);
                  return (
                    <React.Fragment
                      key={
                        "Rescursive.React.Fragment.cluster.child.fields" +
                        idcf +
                        key
                      }
                    >
                      <Field
                        key={"rescursive.child.cluster" + idcf + key}
                        field={field}
                        identifier={key}
                      />
                      {field.children && (
                        <RescursiveChildren
                          children={field.children}
                          key={
                            "rescursive.rescursive.child.cluster" + idcf + key
                          }
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              {child.children && (
                <RescursiveCluster
                  children={child.children}
                  key={"rescursive.child.children.cluster" + idx}
                />
              )}
            </div>
          </React.Fragment>
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
          const classes = classNames(cluster.className);
          return (
            <div className={classes} key={"cluster-upper" + idx}>
              {cluster.fields &&
                Object.keys(cluster.fields).map((key, idcf) => {
                  let field = cluster.fields
                    ? cluster.fields[key]
                    : ({} as formProperties);
                  return (
                    <React.Fragment
                      key={"React.Fragment.cluster.child.fields" + idcf + key}
                    >
                      <Field
                        key={"cluster-inner" + key + idcf}
                        field={field}
                        identifier={key}
                      />
                      {field.children && (
                        <RescursiveChildren
                          key={idcf + key + "child"}
                          children={field.children}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              {cluster.children && (
                <RescursiveCluster
                  children={cluster.children}
                  key={"cluster-children" + idx}
                />
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
  const classes = classNames(formClass ?? " pb-10 md:py-10 mt-2 md:px-10");
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
