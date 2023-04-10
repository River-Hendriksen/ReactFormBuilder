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
  type: string;
  label?: string;
  maxLength?: number;
  updateStateVar?: any;
  ddOptions?: SelectOptions[];
  wrapperClassName?: string;
  inputClassAdditions?: string;
  options?: RegisterOptions;
  classOverwrite?: string;
  labelClassName?: string;
  isLabelLeft?: boolean;
  errMsg?: string;
  errorClassName?: string;
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
