"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.yupGeneration = exports.yupArgCreator = exports.whenGeneration = void 0;
var yup = require("yup");
var helpers_1 = require("../../utils/helpers");
var storedProcedures_1 = require("./storedProcedures");
var checkParamsForStoredProcedures = function (params) {
    return params.map(function (param) {
        if (typeof param === 'object' &&
            (0, helpers_1.instanceOfyupFormStoredProcedure)(param)) {
            return (0, storedProcedures_1.storedProcedures)(param.functionName, param.functionArguements);
        }
        return param;
    });
};
var whenGeneration = function (validator, params, parentType) {
    var _a = params[0], comparatorVariable = _a.comparatorVariable, is = _a.is, then = _a.then, otherwise = _a.otherwise;
    // create an object with the required when params
    var whenParams = { is: is, then: {} };
    whenParams.is =
        is && (0, helpers_1.instanceOfyupFormStoredProcedure)(is)
            ? (0, storedProcedures_1.storedProcedures)(is.functionName, is.functionArguements)
            : is;
    whenParams.then = function (schema) {
        var thenValidator = schema;
        then === null || then === void 0 ? void 0 : then.map(function (thenParams) {
            var tmpValidator = yupArgCreator(thenParams, schema, parentType);
            if (tmpValidator) {
                thenValidator = thenValidator.concat(tmpValidator);
            }
        });
        return thenValidator;
    };
    // if there is an otherwise param, add it to the whenParams object
    if (otherwise) {
        whenParams.otherwise = function (schema) {
            var otherwiseValidator = schema;
            otherwise === null || otherwise === void 0 ? void 0 : otherwise.map(function (otherwiseParams) {
                var tmpValidator = yupArgCreator(otherwiseParams, schema, parentType);
                if (tmpValidator) {
                    otherwiseValidator =
                        otherwiseValidator.concat(tmpValidator);
                }
            });
            return otherwiseValidator;
        };
    }
    // return the validator with the when key and the whenParams object
    return validator['when'](comparatorVariable, whenParams);
};
exports.whenGeneration = whenGeneration;
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
function yupArgCreator(validation, validator, parentType) {
    // if validation is a string, return the validator with that string as a key
    if (typeof validation === 'string') {
        return validator[validation]();
    }
    // if validation is an object, destructure type and params
    var params = validation.params, type = validation.type;
    if (params) {
        params = checkParamsForStoredProcedures(params);
    }
    // if the validator does not have the key in the type, return
    if (!validator[type]) {
        return;
    }
    // if the type is when, and params exists, and the first param is an object, destructure the object
    if (type === 'when' &&
        (params === null || params === void 0 ? void 0 : params.length) > 0 &&
        typeof params[0] === 'object') {
        return (0, exports.whenGeneration)(validator, params, parentType);
    }
    else if (type == 'of' &&
        (params === null || params === void 0 ? void 0 : params.length) > 0 &&
        typeof params[0] === 'object') {
        return (0, exports.yupGeneration)(params[0]);
    }
    else {
        // if type is not when, return the validator with the type key and the params array
        return validator[type].apply(validator, (params !== null && params !== void 0 ? params : []));
    }
}
exports.yupArgCreator = yupArgCreator;
var ArrayOfObjectsGeneration = function (of) {
    var _a;
    //yup array of objects
    var yupArray = yup.array();
    if ((of === null || of === void 0 ? void 0 : of.type) == 'object' && (of === null || of === void 0 ? void 0 : of.shape)) {
        var yupObject = yup.object();
        // shape of the object (i.e., the fields to validate)
        var shape_1 = of.shape;
        var _loop_1 = function (shapeKey) {
            var _b;
            var shapeType = yup[shape_1[shapeKey].type]();
            //validations can be a string or an object
            (_a = shape_1[shapeKey].validations) === null || _a === void 0 ? void 0 : _a.forEach(function (validation) {
                var _a;
                //create a new validator for the property
                var tmpValidator = yupArgCreator(validation, shapeType, (_a = shape_1[shapeKey]) === null || _a === void 0 ? void 0 : _a.type);
                if (tmpValidator) {
                    shapeType = tmpValidator;
                }
            });
            yupObject = yupObject.shape((_b = {}, _b[shapeKey] = shapeType, _b));
        };
        for (var shapeKey in shape_1) {
            _loop_1(shapeKey);
        }
        yupArray = yup.array().of(yupObject); //typescript doesn't like the dynamic key
    }
    return yupArray;
};
//this function creates a yup schema from a form schema
var yupGeneration = function (schema) {
    // schema = startSchema.yupSchema;
    //properties in the schema
    var properties = schema.properties;
    var yupSchema = {};
    try {
        var _loop_2 = function (key) {
            //get the type and validations for the current property
            var _a = properties[key], type = _a.type, validations = _a.validations, of = _a.of;
            //check that the key is in the schema
            if (schema[key]) {
                return "continue";
            }
            if (type == 'array' && of) {
                yupSchema[key] =
                    ArrayOfObjectsGeneration(of);
                return "continue";
            }
            //create the validator function e.g. yup.string()
            var validator = yup[type]();
            //validations can be a string or an object
            validations === null || validations === void 0 ? void 0 : validations.forEach(function (validation) {
                //create a new validator for the property
                var tmpValidator = yupArgCreator(validation, validator, type);
                if (tmpValidator) {
                    validator = tmpValidator;
                }
            });
            //as any because typescript doesn't like the dynamic key
            yupSchema[key] = validator;
        };
        //iterate through the properties in the schema
        for (var key in properties) {
            _loop_2(key);
        }
    }
    catch (e) {
        console.log('error', e);
    }
    //return the schema
    return yup.object().shape(yupSchema);
};
exports.yupGeneration = yupGeneration;
