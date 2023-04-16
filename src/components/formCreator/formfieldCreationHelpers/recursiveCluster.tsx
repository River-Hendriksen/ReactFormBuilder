import React from "react";
import { ClusterProp } from "../../../interfaces/formGenerationInterfaces";

export const RecursiveCluster = ({ children }: { children: ClusterProp[] }) => {
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
                  {field?.children && (
                    <RecursiveChildren
                      children={field.children}
                      key={`recursive.child.cluster.${idcf}.${key}.children`}
                    />
                  )}
                </React.Fragment>
              ))}
            {child.children && (
              <RecursiveCluster
                children={child.children}
                key={`recursive.child.cluster.${idx}.children`}
              />
            )}
          </div>
        );
      })}
    </>
  );
};
