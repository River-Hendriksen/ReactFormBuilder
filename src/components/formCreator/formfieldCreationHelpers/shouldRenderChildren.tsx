import { useContext } from "react";
import { FormProperties } from "../../../interfaces/formGenerationInterfaces";
import { FormDataContexts } from "../forms/formDataContext";

export const shouldRenderChildren = (field: FormProperties) => {
  const formDataContexts = useContext(FormDataContexts);

  return (
    !field?.conditionallyShowChildren ||
    field.conditionallyShowChildren.every(
      ({ formField, conditionValue }) =>
        formDataContexts?.formData[formField] === conditionValue
    )
  );
};
