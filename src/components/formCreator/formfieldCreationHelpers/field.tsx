import { FieldProp } from "../../../interfaces/formGenerationInterfaces";
import { FieldWrapperType } from "../forms/formWrappers/fieldWrapper";

export const Field = ({ field, identifier }: FieldProp) => {
  return (
    <FieldWrapperType
      fieldIdentity={identifier}
      {...field}
      isDisabled={
        field?.isDisabled !== undefined
          ? field.isDisabled === true || field.isDisabled === "true"
          : undefined
      }
      type={field.type}
      isLabelLeft={field.isLabelLeft}
      inputClassName={field.inputClassName}
      labelClassName={field.labelClassName}
      label={field.label}
      wrapperClassName={field.wrapperClassName}
    />
  );
};
