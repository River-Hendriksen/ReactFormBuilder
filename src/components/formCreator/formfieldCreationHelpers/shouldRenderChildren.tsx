import { useContext } from "react";
import { FormProperties } from "../../../interfaces/formGenerationInterfaces";
import { FormDataContexts } from "../forms/formDataContext";

export const shouldRenderChildren = (field: FormProperties) => {
  const formDataContexts = useContext(FormDataContexts);
  const { conditionallyShowChildren } = field;

  if (!conditionallyShowChildren) {
    return true;
  }

  return conditionallyShowChildren.every(
    ({ formField, fieldToCompare, conditionValue }) => {
      const formDataValue = formDataContexts?.formData[formField];

      return fieldToCompare
        ? formDataValue === formDataContexts?.formData[fieldToCompare]
        : formDataValue === conditionValue;
    }
  );
};
