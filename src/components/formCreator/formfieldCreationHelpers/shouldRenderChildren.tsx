import { FormProperties } from "../../../interfaces/formGenerationInterfaces";

export const shouldRenderChildren = (field: FormProperties, formData: any) => {
  const { conditionallyShowChildren } = field;

  if (!conditionallyShowChildren) {
    return true;
  }

  return conditionallyShowChildren.every(
    ({ formField, fieldToCompare, conditionValue }) => {
      ///checktype and convert to string to compare
      const formDataValue = formData[formField]?.toString();
      const conditionValueString = conditionValue?.toString();
      return fieldToCompare
        ? formDataValue === formData[fieldToCompare]?.toString()
        : formDataValue === conditionValueString;
    }
  );
};
