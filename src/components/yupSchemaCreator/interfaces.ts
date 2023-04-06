export interface formProp {
    [key: string]: formProperties;
}

interface formBuilderProps {
    properties: formProp;
    type: string;
}

interface formProperties {
    type: string;
    validations?: validationRequirementProps[] | string[];
}

interface validationRequirementProps {
    type: string;
    params: any[];
}

interface whenValidationProps {
    comparatorVariable: string;
    is: boolean;
    then: (schema: any) => any;
    otherwise?: (schema: any) => any;
}