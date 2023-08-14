import { FieldValues } from 'react-hook-form';

export const GetValueTyped = <T>(vals: FieldValues): T | null => {
    return convertFormValues(vals) as T;
};

export function convertFormValues<T extends Record<string, any>>(values: T): T {
    const convertedValues: Partial<T> = {};

    for (const key in values) {
        if (typeof values[key] === 'string') {
            const numericValue = parseFloat(values[key] as string);
            if (!isNaN(numericValue)) {
                convertedValues[key] = numericValue as T[typeof key]; // Type assertion here
                continue;
            }
            if (values[key] === '') {
                convertedValues[key] = undefined; // Type assertion here
                continue;
            }
        }
        convertedValues[key] = values[key];
    }

    return convertedValues as T;
}
