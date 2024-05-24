import { ChangeEventHandler } from "react";
import { RegisterOptions } from "react-hook-form";
import { FormBuilderProps } from "./formGenerationInterfaces";
import { yupFormBuilderProps } from "./yupSchemaInterfaces";
import {
  InputOptions,
  LikertLabelProps,
  DatepickerOptions,
} from "./formWrapperInterfaces";

interface BaseFieldProps {
  registerLabel: string;
  isDisabled?: boolean;
  inputClassAdditions?: string;
  classOverwrite?: string;
  options?: RegisterOptions;
  disabledClassOverrides?: string;
}

interface UserOptionsBase extends BaseFieldProps {
  ddValue: any;
  userOptions: SelectOptions[] | null;
}

export interface AnyObject {
  [name: string]: any;
}

export interface SelectOptions {
  value: number;
  label: string;
}

export interface LabelProps {
  labelContent: string;
  htmlFor?: string;
  labelClassName?: string;
  disabledLabelOverrides?: string;
  isdisabled?: boolean;
}

export interface CheckBoxArrayProps extends UserOptionsBase {
  updateStateVar: (e: any, formField: string, idx: number) => void;
}

export interface LikertProps extends UserOptionsBase {
  updateStateVar: (e: any, formField: string) => void;
  likertLabels?: LikertLabelProps;
}

export interface CheckBoxArrayObjectValueProps {
  id: number;
  isChecked: boolean;
}

export interface DropDownProps extends UserOptionsBase {
  updateStateVar: ChangeEventHandler<HTMLSelectElement>;
  options?: RegisterOptions;
}

export interface BooleanProps extends BaseFieldProps {
  id?: string;
  value?: boolean | null;
  updateStateVar: (e: any, formField: string) => void;
}

export interface DateTimeProps extends BaseFieldProps {
  id?: string;
  value?: string | null;
  datepickerOptions?: DatepickerOptions;
  updateStateVar?: (fieldName: string, timepoint: Date) => void | undefined;
}

export interface InputProps extends BaseFieldProps {
  id?: string;
  value?: string | null;
  maxLength?: number;
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
