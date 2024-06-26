import { ReactNode } from "react";
import { RegisterOptions } from "react-hook-form";
import { SelectOptions } from "./sharedInterfaces";

export interface userFieldRequirements {
  requirementId: number | null;
  userField: string | null;
  qualifyingResponse: string | null;
  type: string | null;
}

export interface FormBuilderProps {
  children: any;
  isLocked: boolean;
  fieldTitles: { [key: string]: string };
  validationSchema?: any;
  watchFields?: string[];
  formClass?: string;
  fieldChanged: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (data: any) => void;
  userFieldRequirements?: userFieldRequirements[];
}

export interface FieldWrapperPropsBase {
  fieldIdentifier: string;
  htmlFor: string;
  wrapperClassName?: string;
  errorClassName?: string;
}

export interface FieldWrapperProps extends FieldWrapperPropsBase {
  children: any;
}

export interface FieldWrapperPropsType {
  fieldIdentity: string;
  isDisabled?: boolean;
  disabledClassOverrides?: string;
  disabledLabelOverrides?: string;
  type: string;
  label?: string;
  maxLength?: number;
  updateStateVar?: any;
  userOptions?: SelectOptions[];
  wrapperClassName?: string;
  inputClassName?: string;
  inputClassOverrides?: string;
  options?: RegisterOptions;
  classOverwrite?: string;
  labelClassName?: string;
  isLabelLeft?: boolean | string;
  errMsg?: string;
  errorClassName?: string;
  likertLabels?: LikertLabelProps;
  badgeTextAppend?: string;
  datepickerOptions?: DatepickerOptions;
  inputOptions?: InputOptions;
  placeHolder?: string;
}

export interface InputOptions {
  DisableCopy?: boolean;
  DisablePaste?: boolean;
}

export interface InputValidOptions {
  onCopy?: (e: any) => any;
  onPaste?: (e: any) => any;
}

export interface DatepickerOptions {
  dateOnly?: boolean;
  timeFormat?: string;
}

export interface LikertLabelProps {
  minLabel?: string;
  maxLabel?: string;
  likertOptionClass?: string;
  likertLabelClass?: string;
}

export interface FieldChildWrapperProps {
  children: ReactNode;
  error?: any;
  wrapperClassName?: string;
}

export interface BaseFormWrapperProps {
  watchedFields?: string[];
  fieldTitles: { [key: string]: string };
  formContainerClass?: string;
  formBodyClass?: string;
  children: ReactNode;
  warning?: string | null;
  formName?: string;
  showTitle?: boolean;
  isLocked: boolean;
  validationSchema?: any;
  userFieldRequirements?: userFieldRequirements[];
  setFieldChanged: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (data: any) => void;
  onSave?: (submission: any) => void;
}
