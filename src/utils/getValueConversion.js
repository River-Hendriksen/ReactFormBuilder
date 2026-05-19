"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertFormValues = exports.GetValueTyped = void 0;
var GetValueTyped = function (vals) {
    return convertFormValues(vals);
};
exports.GetValueTyped = GetValueTyped;
function convertFormValues(values) {
    var convertedValues = {};
    for (var key in values) {
        if (typeof values[key] === "string") {
            var numericValue = parseFloat(values[key]);
            if (!isNaN(numericValue)) {
                convertedValues[key] = numericValue; // Type assertion here
                continue;
            }
            if (values[key] === "") {
                convertedValues[key] = undefined; // Type assertion here
                continue;
            }
            if (values[key] === "true") {
                convertedValues[key] = true; // Type assertion here
                continue;
            }
            if (values[key] === "false") {
                convertedValues[key] = false; // Type assertion here
                continue;
            }
        }
        convertedValues[key] = values[key];
    }
    return convertedValues;
}
exports.convertFormValues = convertFormValues;
