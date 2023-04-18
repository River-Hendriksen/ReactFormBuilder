import { useEffect, useState } from "react";
import { FormFieldGeneratorProps } from "../../interfaces/formGenerationInterfaces";
import { FormDataContexts } from "./forms/formDataContext";
import React from "react";
import { shouldRenderChildren } from "./formfieldCreationHelpers/shouldRenderChildren";
import { Field } from "./formfieldCreationHelpers/field";
import { RecursiveChildren } from "./formfieldCreationHelpers/recursiveChildren";
import { RecursiveCluster } from "./formfieldCreationHelpers/recursiveCluster";
import { FieldChildWrapper } from "./forms/formWrappers/fieldWrapper";

export const FormFieldGenerator: React.FC<FormFieldGeneratorProps> = ({
  schema,
  data,
}) => {
  const [formData, _setFormData] = useState<any>(data);
  const setFormData = (key: string, value: any) => {
    _setFormData({ ...formData, [key]: value });
  };

  return (
    <FormDataContexts.Provider value={{ formData: formData, setFormData }}>
      <div className="mx-20">
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
                  {shouldRenderChildren(field, formData) && field?.children && (
                    <FieldChildWrapper>
                      <RecursiveChildren
                        children={field.children}
                        formData={formData}
                        key={`FormFieldGenerator.cluster.child.${idcf}.${key}`}
                      />
                    </FieldChildWrapper>
                  )}
                </React.Fragment>
              ))}
            {cluster.children && (
              <RecursiveCluster
                children={cluster.children}
                formData={formData}
                key={`FormFieldGenerator.cluster.children.${idx}`}
              />
            )}
          </div>
        ))}
      </div>
    </FormDataContexts.Provider>
  );
};
