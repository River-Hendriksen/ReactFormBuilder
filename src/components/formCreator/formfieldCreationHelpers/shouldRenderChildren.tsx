import {
  ConditionalChildrenProps,
  ConditionallyShowChildren,
  FormProperties,
} from "../../../interfaces/formGenerationInterfaces";
import { FieldChildWrapper } from "../forms/formWrappers/fieldWrapper";
import { RecursiveChildren } from "./recursiveChildren";

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

export const shouldRenderSubChildren = (
  conditions: ConditionallyShowChildren[],
  formData: any
) => {
  if (!conditions) {
    return true;
  }

  return conditions.every(({ formField, fieldToCompare, conditionValue }) => {
    ///checktype and convert to string to compare
    const formDataValue = formData[formField]?.toString();
    const conditionValueString = conditionValue?.toString();
    return fieldToCompare
      ? formDataValue === formData[fieldToCompare]?.toString()
      : formDataValue === conditionValueString;
  });
};

export const ConditionalFields: React.FC<ConditionalChildrenProps> = ({
  conditionalField,
  data,
}) => {
  return (
    <>
      {conditionalField.map((field, idcf) => {
        return (
          shouldRenderSubChildren(field.conditions, data) &&
          field?.children && (
            <FieldChildWrapper wrapperClassName={field.wrapperClassName}>
              <RecursiveChildren
                children={field.children}
                formData={data}
                key={`FormFieldGenerator.cluster.conditionalFields.child.${idcf}`}
              />
            </FieldChildWrapper>
          )
        );
      })}
    </>
  );
};
