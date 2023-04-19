import { FormProperties } from "../../../interfaces/formGenerationInterfaces";

export const shouldRenderChildren = (field: FormProperties, formData: any) => {
  const { conditionallyShowChildren } = field;

  if (!conditionallyShowChildren) {
    return true;
  }

  return conditionallyShowChildren.every(
    ({ formField, fieldToCompare, conditionValue }) => {
      const formDataValue = formData[formField]?.toString();

      return fieldToCompare
        ? formDataValue === formData[fieldToCompare]
        : formDataValue === conditionValue;
    }
  );
};
