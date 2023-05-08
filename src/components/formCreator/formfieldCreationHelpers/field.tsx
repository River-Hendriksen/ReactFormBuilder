import { FieldProp } from "../../../interfaces/formGenerationInterfaces";
import { FieldWrapperType } from "../forms/formWrappers/fieldWrapper";

export const Field = ({ field, identifier }: FieldProp) => {
  return (
    <FieldWrapperType
      fieldIdentity={identifier}
      isDisabled={
        (field.isDisabled == true || field.isDisabled == "true") ?? false
      }
      type={field.type}
      isLabelLeft={field.isLabelLeft}
      inputClassName={field.inputClassName}
      labelClassName={field.labelClassName}
      label={field.label}
      ddOptions={field.dropDownOptions}
      wrapperClassName={field.wrapperClassName}
    />
  );
};
