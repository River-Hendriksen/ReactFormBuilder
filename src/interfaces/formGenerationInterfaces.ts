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
  inputClassName?: string;
  childrenWrapperClassName?: string;
  isLabelLeft?: boolean;
  conditionallyShowChildren?: ConditionallyShowChildren[];
  conditionalChildren?: ConditionalChildren[];
  wrapperClassName?: string;
  userOptions?: SelectOptions[];
}

export interface ConditionalChildren {
  conditions: ConditionallyShowChildren[];
  wrapperClassName?: string;
  children?: FormProp;
}

export interface ConditionallyShowChildren {
  formField: string;
  fieldToCompare?: string;
  conditionValue?: string | number | boolean;
  comparisonType?: string;
}

export interface SchemaFormBuilderProps {
  priorChildren?: React.ReactNode;
  children?: React.ReactNode;
  isLocked: boolean;
  watchFields?: string[];
  schema: CompleteFormProps;
  formClass?: string;
  fieldData?: any;
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

export interface ConditionalChildrenProps {
  conditionalField: ConditionalChildren[];
  data: any;
}
