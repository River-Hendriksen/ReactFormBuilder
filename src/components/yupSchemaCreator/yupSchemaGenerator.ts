import * as yup from "yup";
import {
  validationRequirementProps,
  whenValidationProps,
  yupFormBuilderProps,
} from "../../interfaces/yupSchemaInterfaces";
import { instanceOfyupFormStoredProcedure } from "../../utils/helpers";
import { storedProcedures } from "./storedProcedures";

const checkParamsForStoredProcedures = (params: any[]) => {
  return params.map((param) => {
    if (typeof param === "object" && instanceOfyupFormStoredProcedure(param)) {
      if (
        storedProcedures &&
        storedProcedures[param.functionName as keyof typeof storedProcedures]
      ) {
        return storedProcedures[
          param.functionName as keyof typeof storedProcedures
        ];
      }
    }
    return param;
  });
};

// YupArgCreator is a function that takes a validationRequirementProps object or a string and a yup validator and returns the validator with the correct arguments.
// If validation is a string, return the validator with that string as a key
// If validation is an object, destructure type and params
// If the validator does not have the key in the type, return
// If the type is when, and params exists, and the first param is an object, destructure the object
// Create an object with the required when params
// Add the then object to the whenParams object
// If there is an otherwise param, add it to the whenParams object
// Return the validator with the when key and the whenParams object
// If type is not when, return the validator with the type key and the params array

export function yupArgCreator(
  validation: validationRequirementProps | string,
  validator: any
) {
  // if validation is a string, return the validator with that string as a key
  if (typeof validation === "string") {
    return validator[validation as keyof typeof validator]();
  }

  // if validation is an object, destructure type and params
  let { params, type } = validation;

  if (params) {
    params = checkParamsForStoredProcedures(params);
  }

  // if the validator does not have the key in the type, return
  if (!validator[type as keyof typeof validator]) {
    return;
  }

  // if the type is when, and params exists, and the first param is an object, destructure the object
  if (type === "when" && params?.length > 0 && typeof params[0] === "object") {
    const { comparatorVariable, is, then, otherwise } = params[0];
    // create an object with the required when params
    let whenParams = { is: is, then: {} } as whenValidationProps;
    whenParams.is =
      is && instanceOfyupFormStoredProcedure(is)
        ? (storedProcedures &&
            storedProcedures[
              is.functionName as keyof typeof storedProcedures
            ]) ??
          null
        : is;
    // add the then object to the whenParams object
    whenParams.then = (schema: any) => schema[then[0].type](...then[0].params);

    // if there is an otherwise param, add it to the whenParams object
    if (otherwise) {
      whenParams.otherwise = (schema: any) =>
        schema[otherwise[0].type](...otherwise[0].params);
    }

    // return the validator with the when key and the whenParams object
    return validator["when" as keyof typeof validator](
      comparatorVariable,
      whenParams
    );
  } else {
    // if type is not when, return the validator with the type key and the params array
    return validator[type as keyof typeof validator](...params);
  }
}

//this function creates a yup schema from a form schema
export const yupGeneration = (schema: yupFormBuilderProps) => {
  //properties in the schema
  const { properties } = schema;
  const yupSchema = {};
  try {
    //iterate through the properties in the schema
    for (const key in properties) {
      //get the type and validations for the current property
      const { type, validations } = properties[key];

      //check that the key is in the schema
      if (schema[key as keyof typeof schema]) {
        continue;
      }

      //create the validator function e.g. yup.string()
      let validator = (yup[type as keyof typeof yup] as Function)();

      //validations can be a string or an object
      validations?.forEach((validation) => {
        //create a new validator for the property
        let tmpValidator = yupArgCreator(validation, validator);
        if (tmpValidator) {
          validator = tmpValidator;
        }
      });

      //as any because typescript doesn't like the dynamic key
      (yupSchema[key as keyof typeof yupSchema] as any) = validator;
    }
  } catch (e) {
    console.log("error", e);
  }
  //return the schema
  return yup.object().shape(yupSchema);
};
