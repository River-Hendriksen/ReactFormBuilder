import { yupFormStoredProcedureArguementProps } from "../../interfaces/yupSchemaInterfaces";

export const storedProceduresFlat = {
  transformNumber: (_: any, val: any) => (val ? Number(val) : null),
  whenChecked: (checkVar: boolean) => checkVar,
  whenNotChecked: (checkVar: boolean) => !checkVar,
};

//switch statement to determine which validation function to use
export const storedProcedures = (
  validationType: string,
  functionArguements: yupFormStoredProcedureArguementProps
) => {
  switch (validationType) {
    case "isNumber":
      return (variable: any) =>
        new RegExp(/^-?[0-9]\d*(\.\d+)?$/).test(variable);
    case "today":
      return new Date();
    case "transformNumber":
      return (_: any, val: any) => (val ? Number(val) : null);
    case "isNotNull":
      return (vars: any) => vars != null;
    case "whenChecked":
      return (checkVar: boolean) => checkVar;
    case "whenNotChecked":
      return (checkVar: boolean) => !checkVar;
    case "whenOptionIdIs":
      return (expectedValue: number) => {
        try {
          return (
            expectedValue == Number(functionArguements["whenOptionIdArgIs"])
          );
        } catch {
          throw new Error(
            "whenOptionIdIs: whenOptionIdArgIs is not a number or does not exist"
          );
        }
      };
    default:
      return null;
  }
};
