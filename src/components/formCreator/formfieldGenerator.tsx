import { FormFieldGeneratorProps } from "../../interfaces/formGenerationInterfaces";
import React from "react";
import {
  ConditionalFields,
  shouldRenderChildren,
} from "./formfieldCreationHelpers/shouldRenderChildren";
import { Field } from "./formfieldCreationHelpers/field";
import { RecursiveChildren } from "./formfieldCreationHelpers/recursiveChildren";
import { RecursiveCluster } from "./formfieldCreationHelpers/recursiveCluster";
import { FieldChildWrapper } from "./forms/formWrappers/fieldWrapper";

export const FormFieldGenerator: React.FC<FormFieldGeneratorProps> = ({
  schema,
  data,
}) => {
  return (
    <>
      {schema.properties.map((cluster, idx) => (
        <div className={cluster.className} key={`cluster.${idx}`}>
          {cluster.title && (
            <h2 className={cluster.titleClassName}>{cluster.title}</h2>
          )}
          {cluster.fields &&
            Object.entries(cluster.fields).map(([key, field], idcf) => (
              <React.Fragment
                key={`React.Fragment.cluster.child.fields${idcf}${key}`}
              >
                <Field field={field ?? {}} identifier={key} />
                {field.conditionalChildren && (
                  <ConditionalFields
                    conditionalField={field.conditionalChildren}
                    data={data}
                  />
                )}
                {shouldRenderChildren(field, data) && field?.children && (
                  <FieldChildWrapper
                    wrapperClassName={field.childrenWrapperClassName}
                  >
                    <RecursiveChildren
                      children={field.children}
                      formData={data}
                      key={`FormFieldGenerator.cluster.child.${idcf}.${key}`}
                    />
                  </FieldChildWrapper>
                )}
              </React.Fragment>
            ))}
          {cluster.children && (
            <RecursiveCluster
              children={cluster.children}
              formData={data}
              key={`FormFieldGenerator.cluster.children.${idx}`}
            />
          )}
        </div>
      ))}
    </>
  );
};
