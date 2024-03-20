import { ChangeEventHandler } from "react";
import { RegisterOptions } from "react-hook-form";
import { FormBuilderProps } from "./formGenerationInterfaces";
import { yupFormBuilderProps } from "./yupSchemaInterfaces";
import {
  InputOptions,
  LikertLabelProps,
  DatepickerOptions,
} from "./formWrapperInterfaces";

export interface AnyObject {
  [name: string]: any;
}

export interface LabelProps {
  labelContent: string;
  htmlFor?: string;
  labelClassName?: string;
  disabledLabelOverrides?: string;
  isdisabled?: boolean;
}

export interface SelectOptions {
  value: number;
  label: string;
}

export interface CheckBoxArrayProps {
  registerLabel: string;
  ddValue: any;
  isDisabled?: boolean;
  disabledClassOverrides?: string;
  userOptions: SelectOptions[] | null;
  inputClassAdditions?: string;
  classOverwrite?: string;
  updateStateVar: (e: any, formField: string, idx: number) => void;
  options?: RegisterOptions;
}

export interface LikertProps extends CheckBoxArrayProps {
  likertLabels?: LikertLabelProps;
}

export interface CheckBoxArrayObjectValueProps {
  id: number;
  isChecked: boolean;
}

export interface DropDownProps {
  registerLabel: string;
  ddValue: any;
  isDisabled?: boolean;
  disabledClassOverrides?: string;
  userOptions: SelectOptions[] | null;
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
  disabledClassOverrides?: string;
  updateStateVar: (e: any, formField: string) => void;
}

export interface DateTimeProps {
  id?: string;
  value?: string | null;
  registerLabel: string;
  options?: RegisterOptions;
  inputClassAdditions?: string;
  disabledClassOverrides?: string;
  isDisabled?: boolean;
  datepickerOptions?: DatepickerOptions;
  updateStateVar?: (fieldName: string, timepoint: Date) => void | undefined;
}

export interface InputProps {
  id?: string;
  value?: string | null;
  registerLabel: string;
  isDisabled?: boolean;
  disabledClassOverrides?: string;
  options?: RegisterOptions;
  maxLength?: number;
  inputClassAdditions?: string;
  inputClassOverrides?: string;
  placeHolder?: string;
  inputOptions?: InputOptions;
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
