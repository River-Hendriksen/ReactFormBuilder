import { useState } from "react";
import { FormFieldGeneratorProps } from "../../interfaces/formGenerationInterfaces";
import { FormDataContexts } from "./forms/formDataContext";
import React from "react";
import { shouldRenderChildren } from "./formfieldCreationHelpers/shouldRenderChildren";
import { Field } from "./formfieldCreationHelpers/field";
import { RecursiveChildren } from "./formfieldCreationHelpers/recursiveChildren";
import { RecursiveCluster } from "./formfieldCreationHelpers/recursiveCluster";

export const FormFieldGenerator: React.FC<FormFieldGeneratorProps> = ({
  schema,
  data,
}) => {
  const [formData, _setFormData] = useState<any>(data);
  const setFormData = (key: string, value: any) => {
    _setFormData({ ...formData, [key]: value });
  };

  return (
    <FormDataContexts.Provider value={{ formData, setFormData }}>
      <div className="mx-20">
        {schema.properties.map((cluster, idx) => (
          <div className={cluster.className} key={`cluster.${idx}`}>
            {cluster.fields &&
              Object.entries(cluster.fields).map(([key, field], idcf) => (
                <React.Fragment
                  key={`React.Fragment.cluster.child.fields${idcf}${key}`}
                >
                  <Field field={field ?? {}} identifier={key} />
                  {shouldRenderChildren(field) && field?.children && (
                    <RecursiveChildren
                      children={field.children}
                      key={`FormFieldGenerator.cluster.child.${idcf}.${key}`}
                    />
                  )}
                </React.Fragment>
              ))}
            {cluster.children && (
              <RecursiveCluster
                children={cluster.children}
                key={`FormFieldGenerator.cluster.children.${idx}`}
              />
            )}
          </div>
        ))}
      </div>
    </FormDataContexts.Provider>
  );
};
