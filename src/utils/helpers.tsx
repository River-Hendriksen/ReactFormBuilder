export const isEmpty = (obj: object) => {
  return Object.values(obj).every(
    (x) => x === undefined || x === null || x === ""
  );
};

export const instanceOfyupFormStoredProcedure = (object: any) => {
  return "functionName" in object;
};

/**
 *  This function is used to find the enum value from the string
 * @param enumType an enum
 * @param value value to find in the enum
 * @returns number of the enum value or null
 */
export const findEnumFromString = (
  enumType: any,
  value: string
): number | null => {
  const keys = Object.keys(enumType).filter(
    (key) => enumType[key].toString() === value
  );

  return keys.length ? parseInt(keys[0]) : null;
};
