import { createContext } from 'react';
import { FieldContextsProps } from '../../interfaces/fieldContextProps';

export const FieldContexts = createContext<FieldContextsProps | null>(null);

export const ContextCheck = ({
    children,
    fieldContexts,
}: {
    children: any;
    fieldContexts: FieldContextsProps | null;
}) => {
    return fieldContexts ? children : <></>;
};
