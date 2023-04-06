import { SelectOptions } from "./sharedInterfaces";

export interface formProp {
    [key: string]: formProperties;
}

export interface clusterProp {
    className?: string;
    children?: clusterProp[];
    title?: string;
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
    wrapperClassName?: string;
    dropDownOptions?: SelectOptions[];
}