import * as yup from 'yup';
import { validationRequirementProps, whenValidationProps, yupFormBuilderProps } from '../../interfaces/yupSchemaInterfaces';

export const schema = {
    type: 'object',
    properties: {
        numberRange: {
            type: 'number',
            validations: [
                {
                    type: 'min',
                    params: [0],
                },
                {
                    type: 'max',
                    params: [10],
                },
                {
                    type: 'transform',
                    params: ['(_, val) => (val ? Number(val) : null)'],
                },
            ],
        },
        name: {
            type: 'number',
            validations: [
                {
                    type: 'when',
                    params: [
                        {
                            comparatorVariable: 'isBig',
                            is: true,
                            then: [
                                {
                                    type: 'min',
                                    params: [5],
                                },
                            ],
                            otherwise: [
                                {
                                    type: 'min',
                                    params: [0],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        test: {
            type: 'string',
            validations: ['required'],
        },
    },
};

const yupArgCreator = (
    validation: validationRequirementProps | string,
    validator: any
) => {
    //if it's a string, it's a function in the yup schema
    if (typeof validation === 'string') {
        return validator[validation as keyof typeof validator]();
    }

    const { params, type } = validation;

    //check the type is in the yup schema
    if (!validator[type as keyof typeof validator]) {
        console.log('returning');
        return;
    }

    if (type === 'when' && params.length > 0 && typeof params[0] === 'object') {
        const { comparatorVariable, is, then, otherwise } = params[0];
        let whenParams = { is: is, then: {} } as whenValidationProps;
        whenParams.is = is;
        whenParams.then = (schema: any) =>
            schema[then[0].type](...then[0].params);

        if (otherwise) {
            whenParams.otherwise = (schema: any) =>
                schema[otherwise[0].type](...otherwise[0].params);
        }

        return validator['when' as keyof typeof validator](
            comparatorVariable,
            whenParams
        );
    } else {
        console.log('params', params);
        return validator[type as keyof typeof validator](...params);
    }
};

export const yupGeneration = (schema: yupFormBuilderProps) => {
    const { properties } = schema;
    const yupSchema = {};
    try {
        // const yepSchema = formData.reduce(createYupSchema, {});
        for (const key in properties) {
            const { type, validations } = properties[key];

            //check that the key is in the schema
            if (schema[key as keyof typeof schema]) {
                console.log('we hit this');
                continue;
            }

            //create the validator function e.g. yup.string()
            let validator = (yup[type as keyof typeof yup] as Function)();

            //validations can be a string or an object
            validations?.forEach((validation) => {
                let tmpValidator = yupArgCreator(validation, validator);
                if (tmpValidator) {
                    validator = tmpValidator;
                }
            });

            //as any because typescript doesn't like the dynamic key
            (yupSchema[key as keyof typeof yupSchema] as any) = validator;
        }
    } catch (e) {
        console.log('error', e);
    }
    return yup.object().shape(yupSchema);

};

