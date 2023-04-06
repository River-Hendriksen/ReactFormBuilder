import { FieldContextsProps } from "../../interfaces/fieldContextProps";
import { SelectOptions } from "../../interfaces/sharedInterfaces";


export const updateVal = (
    e: any,
    formField: string,
    fieldContexts: FieldContextsProps | null,
    setFormData: (key: string, value: any) => void
) => {
    fieldContexts!.setValue(formField, e.target.value);
    setFormData(formField, e.target.value);
};

export const updateDate = (
    fieldName: string,
    timepoint: Date,
    fieldContexts: FieldContextsProps | null,
    setFormData: (key: string, value: any) => void
) => {
    timepoint.setHours(0, 0, 0);
    setFormData(fieldName, timepoint.toString());
    fieldContexts!.setValue(fieldName, timepoint.toString());
};

export const validationDDBase = (
    ddVal: string | number | null,
    ddOpts: SelectOptions[] | null,
    stringToMatch: string
) => {
    return ddVal && ddOpts && optionIs(ddVal as number, ddOpts, stringToMatch);
};

//find if current option in the dropdown is labeled "other"
export const optionIsOther = (
    optionId: number,
    optionsList: SelectOptions[]
) => {
    return optionsList
        .find((e) => e.value == optionId)
        ?.label.toLowerCase()
        .includes('other');
};

export const optionIs = (
    optionId: number,
    optionsList: SelectOptions[],
    inlcudedString: string
) => {
    return optionsList
        .find((e) => e.value == optionId)
        ?.label.toLowerCase()
        .includes(inlcudedString);
};

export const optionIsInRange = (
    optionValue: number,
    includedString: string
): boolean => {
    let splitString = includedString.split(':');

    if (splitString.length != 2) return false;

    return (
        optionValue >= parseInt(splitString[0]) &&
        optionValue <= parseInt(splitString[1])
    );
};

export const optionContains = (
    optionId: number,
    optionsList: SelectOptions[],
    includedString: string
): boolean => {
    let splitString = includedString.split(',');
    let found = false;
    splitString.forEach((element) => {
        if (
            element != '' &&
            optionsList
                .find((e) => e.value == optionId)
                ?.label.toLowerCase()
                .includes(element)
        ) {
            found = true;
        }
    });
    return found;
};

export const getValueFromList = (
    optionId: number,
    optionsList: SelectOptions[]
) => {
    return optionsList.find((e) => e.value == optionId)?.label.toLowerCase();
};
