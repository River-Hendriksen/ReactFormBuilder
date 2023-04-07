export interface yupFormProp {
  [key: string]: yupFormProperties;
}

export interface yupFormBuilderProps {
  properties: yupFormProp;
  type: string;
}

export interface yupFormProperties {
  type: string;
  validations?: validationRequirementProps[] | string[];
}

export interface validationRequirementProps {
  type: string;
  params: any[];
}

export interface whenValidationProps {
  comparatorVariable: string;
  is: boolean | ((yupVar: any) => boolean);
  then: (schema: any) => any;
  otherwise?: (schema: any) => any;
}
