import React from "react";
import { FormProp } from "../../../interfaces/formGenerationInterfaces";
import { shouldRenderChildren } from "./shouldRenderChildren";
import { Field } from "./field";
import { FieldChildWrapper } from "../forms/formWrappers/fieldWrapper";

export const RecursiveChildren = ({
  children,
  formData,
}: {
  children: FormProp;
  formData: any;
}) => {
  return (
    <>
      {Object.entries(children).map(([key, field], idx) => {
        return (
          <React.Fragment
            key={`Rescursive.React.Fragment.Children.Field${idx}${key}`}
          >
            <Field field={field} identifier={key} />
            {shouldRenderChildren(field, formData) && field.children && (
              <FieldChildWrapper>
                <RecursiveChildren
                  children={field.children}
                  formData={formData}
                  key={`Rescursive.Children.Children${idx}${key}`}
                />
              </FieldChildWrapper>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};
