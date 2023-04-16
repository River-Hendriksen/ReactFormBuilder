import { ChangeEventHandler } from "react";
import { RegisterOptions } from "react-hook-form";
import { FormBuilderProps } from "./formGenerationInterfaces";
import { yupFormBuilderProps } from "./yupSchemaInterfaces";

export interface AnyObject {
  [name: string]: any;
}

export interface LabelProps {
  labelContent: string;
  htmlFor?: string;
  labelClassName?: string;
}

export interface SelectOptions {
  value: number;
  label: string;
}

export interface DropDownProps {
  registerLabel: string;
  ddValue: any;
  isDisabled?: boolean;
  ddOptions: SelectOptions[] | null;
  inputClassAdditions?: string;
  classOverwrite?: string;
  updateStateVar: ChangeEventHandler<HTMLSelectElement>;
  options?: RegisterOptions;
}

export interface BooleanProps {
  id?: string;
  value?: boolean | null;
  registerLabel: string;
  options?: RegisterOptions;
  inputClassAdditions?: string;
  isDisabled?: boolean;
  updateStateVar?:
    | ChangeEventHandler<HTMLInputElement>
    | ChangeEventHandler<HTMLTextAreaElement>
    | undefined;
}

export interface DateTimeProps {
  id?: string;
  value?: string | null;
  registerLabel: string;
  options?: RegisterOptions;
  inputClassAdditions?: string;
  isDisabled?: boolean;
  updateStateVar?: (fieldName: string, timepoint: Date) => void | undefined;
}

export interface InputProps {
  id?: string;
  value?: string | null;
  registerLabel: string;
  isDisabled?: boolean;
  options?: RegisterOptions;
  maxLength?: number;
  inputClassAdditions?: string;
  updateStateVar?:
    | ChangeEventHandler<HTMLInputElement>
    | ChangeEventHandler<HTMLTextAreaElement>
    | undefined;
}

export interface CompleteFormProps {
  type: string;
  formSchema: FormBuilderProps;
  yupSchema: yupFormBuilderProps;
}
