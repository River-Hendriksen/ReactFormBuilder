export const isEmpty = (obj: object) => {
  return Object.values(obj).every(
    (x) => x === undefined || x === null || x === ""
  );
};

export const instanceOfyupFormStoredProcedure = (object: any) => {
  return "functionName" in object;
};
