export const storedProcedures = {
  transformNumber: (_: any, val: any) => (val ? Number(val) : null),
  whenChecked: (checkVar: boolean) => checkVar,
};
