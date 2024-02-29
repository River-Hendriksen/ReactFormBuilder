import { childComparisonOption } from "../../../enums/enums";
import {
  ConditionalChildrenProps,
  ConditionallyShowChildren,
  FormProperties,
} from "../../../interfaces/formGenerationInterfaces";
import { findEnumFromString } from "../../../utils/helpers";
import { FieldChildWrapper } from "../forms/formWrappers/fieldWrapper";
import { RecursiveChildren } from "./recursiveChildren";

const comparison = (
  formDataValue: any,
  conditionValue: string | number | boolean,
  comparisonType?: string
): boolean => {
  if (comparisonType == undefined)
    return formDataValue === conditionValue?.toString();

  switch (findEnumFromString(childComparisonOption, comparisonType)) {
    case childComparisonOption.equals:
      return formDataValue === conditionValue?.toString();
    case childComparisonOption.doesNotEqual: {
      return (
        formDataValue !== conditionValue?.toString() &&
        formDataValue !== "" &&
        formDataValue !== undefined &&
        formDataValue !== null
      );
    }
    default:
      return formDataValue === conditionValue?.toString();
  }
};

export const shouldRenderChildren = (field: FormProperties, formData: any) => {
  const { conditionallyShowChildren } = field;

  if (!conditionallyShowChildren) {
    return true;
  }

  return conditionallyShowChildren.every(
    ({ formField, fieldToCompare, conditionValue, comparisonType }) => {
      ///checktype and convert to string to compare
      const formDataValue = formData[formField]?.toString();
      const conditionValueString = conditionValue?.toString();

      return comparison(
        formDataValue,
        fieldToCompare ? formData[fieldToCompare] : conditionValueString,
        comparisonType
      );

      // return fieldToCompare
      //   ? comparison(formDataValue, formData[fieldToCompare], comparisonType)
      //   : formDataValue === conditionValueString;
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

  return conditions.every(
    ({ formField, fieldToCompare, conditionValue, comparisonType }) => {
      ///checktype and convert to string to compare
      const formDataValue = formData[formField]?.toString();
      const conditionValueString = conditionValue?.toString();

      return comparison(
        formDataValue,
        fieldToCompare ? formData[fieldToCompare] : conditionValueString, //if there is a field value to compare against, compare that, otherwise compare to the current field value
        comparisonType
      );
    }
  );
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
            <FieldChildWrapper
              wrapperClassName={field.wrapperClassName}
              key={`FormFieldGenerator.cluster.conditionalFields.child.FieldChildWrapper.${idcf}`}
            >
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
