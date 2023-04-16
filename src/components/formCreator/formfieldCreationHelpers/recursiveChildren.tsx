import React from "react";
import { FormProp } from "../../../interfaces/formGenerationInterfaces";
import { shouldRenderChildren } from "./shouldRenderChildren";
import { Field } from "./field";

export const RecursiveChildren = ({ children }: { children: FormProp }) => {
  return (
    <>
      {Object.entries(children).map(([key, field], idx) => {
        return (
          shouldRenderChildren(field) && (
            <React.Fragment
              key={`Rescursive.React.Fragment.Children.Field${idx}${key}`}
            >
              <Field field={field} identifier={key} />
              {field.children && (
                <RecursiveChildren
                  children={field.children}
                  key={`Rescursive.Children.Children${idx}${key}`}
                />
              )}
            </React.Fragment>
          )
        );
      })}
    </>
  );
};
