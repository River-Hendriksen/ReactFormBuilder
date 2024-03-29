import React from "react";
import { ClusterProp } from "../../../interfaces/formGenerationInterfaces";
import { RecursiveChildren } from "./recursiveChildren";
import { Field } from "./field";
import { shouldRenderChildren } from "./shouldRenderChildren";
import { FieldChildWrapper } from "../forms/formWrappers/fieldWrapper";

export const RecursiveCluster = ({
  children,
  formData,
}: {
  children: ClusterProp[];
  formData: any;
}) => {
  return (
    <>
      {children.map((child, idx) => {
        return (
          <div className={child.className} key={`rescursive.cluster${idx}`}>
            {child.title && (
              <h2 className={child.titleClassName}>{child.title}</h2>
            )}
            {child.fields &&
              Object.entries(child.fields).map(([key, field], idcf) => (
                <React.Fragment
                  key={`RecursiveCluster.child.fields.${idcf}.${key}`}
                >
                  <Field field={field ?? {}} identifier={key} />
                  {shouldRenderChildren(field, formData) && field?.children && (
                    <FieldChildWrapper
                      wrapperClassName={field.childrenWrapperClassName}
                    >
                      <RecursiveChildren
                        children={field.children}
                        formData={formData}
                        key={`recursive.child.cluster.${idcf}.${key}.children`}
                      />
                    </FieldChildWrapper>
                  )}
                </React.Fragment>
              ))}
            {child.children && (
              <RecursiveCluster
                children={child.children}
                formData={formData}
                key={`recursive.child.cluster.${idx}.children`}
              />
            )}
          </div>
        );
      })}
    </>
  );
};
