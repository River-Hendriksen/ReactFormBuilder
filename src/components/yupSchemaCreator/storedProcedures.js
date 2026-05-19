"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storedProcedures = exports.storedProceduresFlat = void 0;
exports.storedProceduresFlat = {
    transformNumber: function (_, val) { return (val ? Number(val) : null); },
    transformArrayToNumber: function (_, val) { return (val ? val.map(Number) : null); },
    whenChecked: function (checkVar) { return checkVar; },
    whenNotChecked: function (checkVar) { return !checkVar; },
};
var decimalRegex = function (numberOfDecimals) {
    return new RegExp("^-?[0-9]*\\.?[0-9]{0," + numberOfDecimals + "}$");
};
var isNullOrUndefined = function (variable) {
    return variable == "" || variable == null || variable == undefined;
}; //just in case of a boolean
//switch statement to determine which validation function to use
var storedProcedures = function (validationType, functionArguements) {
    switch (validationType) {
        case "isNumber":
            return function (variable) {
                return isNullOrUndefined(variable) ||
                    new RegExp(/^-?[0-9]\d*(\.\d+)?$/).test(variable);
            };
        case "isPhoneNumber":
            return function (variable) {
                return variable == "" ||
                    variable == null ||
                    variable == undefined ||
                    new RegExp(/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/).test(variable);
            };
        case "limitDecimalsTo":
            return function (variable) {
                return variable == null ||
                    decimalRegex(functionArguements.decimals).test(variable);
            };
        case "today":
            return new Date();
        case "transformNumber":
            return function (_, val) { return (val ? Number(val) : null); };
        case "transformArrayToNumber":
            return function (_, val) {
                return val ? val.map(Number) : null;
            };
        case "isNotNull":
            return function (vars) { return vars != null; };
        case "whenChecked":
            return function (checkVar) { return checkVar; };
        case "whenNotChecked":
            return function (checkVar) { return !checkVar; };
        case "whenOptionIdIs":
            return function (expectedValue) {
                try {
                    return (expectedValue == Number(functionArguements["whenOptionIdArgIs"]));
                }
                catch (_a) {
                    throw new Error("whenOptionIdIs: whenOptionIdArgIs is not a number or does not exist");
                }
            };
        case "whenOptionIdIsNot":
            return function (expectedValue) {
                try {
                    return (expectedValue !== Number(functionArguements["whenOptionIdArgIs"]));
                }
                catch (_a) {
                    throw new Error("whenOptionIdIs: whenOptionIdArgIs is not a number or does not exist");
                }
            };
        case "arrayIsNumbers":
            return function (arr) {
                if (!Array.isArray(arr))
                    return false;
                return arr.every(function (num) { return !isNaN(Number(num)); });
            };
        default:
            return null;
    }
};
exports.storedProcedures = storedProcedures;
