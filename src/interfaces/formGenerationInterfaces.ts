import { SelectOptions } from "./sharedInterfaces";
import { yupFormBuilderProps } from "./yupSchemaInterfaces";

export interface formProp {
  [key: string]: formProperties;
}

export interface clusterProp {
  className?: string;
  children?: clusterProp[];
  title?: string;
  titleClassName?: string;
  fields?: formProp;
}

export interface formBuilderProps {
  properties: clusterProp[];
  type: string;
}

export interface formProperties {
  type: string;
  label: string;
  isDisabled?: boolean;
  children?: formProp;
  labelClassName?: string;
  isLabelLeft?: boolean;
  wrapperClassName?: string;
  dropDownOptions?: SelectOptions[];
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
  formSchema: formBuilderProps;
  yupSchema?: yupFormBuilderProps;
}
