import { createContext } from "react";
import { FormDataContextsProps } from "../../../interfaces/fieldContextProps";

export const FormDataContexts = createContext<FormDataContextsProps | null>(
  null
);

export const ContextCheck = ({
  children,
  fieldContexts,
}: {
  children: any;
  fieldContexts: FormDataContextsProps | null;
}) => {
  return fieldContexts ? children : <></>;
};
