import { SelectOptions } from "./sharedInterfaces";
import { yupFormBuilderProps } from "./yupSchemaInterfaces";

export interface FormProp {
  [key: string]: FormProperties;
}

export interface FieldProp {
  field: FormProperties;
  identifier: string;
}

export interface ClusterProp {
  className?: string;
  children?: ClusterProp[];
  title?: string;
  titleClassName?: string;
  fields?: FormProp;
}

export interface FormBuilderProps {
  properties: ClusterProp[];
  type: string;
}

export interface FormProperties {
  type: string;
  label: string;
  isDisabled?: boolean | string;
  children?: FormProp;
  labelClassName?: string;
  isLabelLeft?: boolean;
  conditionallyShowChildren?: ConditionallyShowChildren[];
  wrapperClassName?: string;
  dropDownOptions?: SelectOptions[];
}

interface ConditionallyShowChildren {
  formField: string;
  fieldToCompare?: string;
  conditionValue?: string | number | boolean;
}

export interface SchemaFormBuilderProps {
  children?: React.ReactNode;
  isLocked: boolean;
  watchFields?: string[];
  schema: CompleteFormProps;
  formClass?: string;
  fieldData?: any;
  fieldChanged: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (data: any) => void;
}

export interface CompleteFormProps {
  type: string;
  formSchema: FormBuilderProps;
  yupSchema?: yupFormBuilderProps;
}

export interface FormFieldGeneratorProps {
  schema: FormBuilderProps;
  data: any;
}
