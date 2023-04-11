import React from "react";
import { render } from "@testing-library/react";
import * as yup from "yup";
import { yupGeneration } from "./yupSchemaGenerator";
import _ from "lodash";

// export const schema = {
//   type: "object",
//   properties: {
//     numberRange: {
//       type: "number",
//       validations: [
//         {
//           type: "min",
//           params: [0],
//         },
//         {
//           type: "max",
//           params: [10],
//         },
//         {
//           type: "transform",
//           params: ["(_, val) => (val ? Number(val) : null)"],
//         },
//       ],
//     },
//     name: {
//       type: "number",
//       validations: [
//         {
//           type: "when",
//           params: [
//             {
//               comparatorVariable: "isBig",
//               is: true,
//               then: [
//                 {
//                   type: "min",
//                   params: [5],
//                 },
//               ],
//               otherwise: [
//                 {
//                   type: "min",
//                   params: [0],
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//     test: {
//       type: "string",
//       validations: ["required"],
//     },
//   },
// };

describe("yupGeneration creates a yup schema", () => {
  it("returns a valid yup schema from a schema", async () => {
    const schema = {
      type: "object",
      properties: {
        test: {
          type: "string",
          validations: [
            {
              type: "required",
              params: ["This field is required"],
            },
          ],
        },
      },
    };

    const result = yupGeneration(schema);
    expect(await result.isValid({ test: "test" })).toBe(true);
    expect(await result.isValid({ test: "" })).toBe(false);
    expect(await result.isValid({ test: null })).toBe(false);
    expect(await result.isValid({ test: undefined })).toBe(false);
    expect(await result.isValid({ test: NaN })).toBe(true);
    expect(await result.isValid({ test: 0 })).toBe(true);
    expect(await result.isValid({ test: false })).toBe(true);
    expect(await result.isValid({ test: true })).toBe(true);
    expect(await result.isValid({ test: {} })).toBe(false);
    expect(await result.isValid({ test: [] })).toBe(false);
  });

  it("returns a valid yup schema from a schema with a number", async () => {
    const schema = {
      type: "object",
      properties: {
        test: {
          type: "number",
        },
      },
    };

    const result = yupGeneration(schema);
    expect(await result.isValid({ test: 1 })).toBe(true);
    expect(await result.isValid({ test: "1" })).toBe(true);
    expect(await result.isValid({ test: "a" })).toBe(false);
    expect(await result.isValid({ test: null })).toBe(false);
    expect(await result.isValid({ test: undefined })).toBe(true);
    expect(await result.isValid({ test: NaN })).toBe(false);
    expect(await result.isValid({ test: 0 })).toBe(true);
  });

  it("returns a valid yup schema from a schema with a number and a min", async () => {
    const schema = {
      type: "object",
      properties: {
        test: {
          type: "number",
          validations: [
            {
              type: "min",
              params: [1],
            },
          ],
        },
      },
    };

    const result = yupGeneration(schema);
    expect(await result.isValid({ test: 1 })).toBe(true);
    expect(await result.isValid({ test: "1" })).toBe(true);
    expect(await result.isValid({ test: "a" })).toBe(false);
    expect(await result.isValid({ test: null })).toBe(false);
    expect(await result.isValid({ test: undefined })).toBe(true);
    expect(await result.isValid({ test: NaN })).toBe(false);
    expect(await result.isValid({ test: 0 })).toBe(false);
  });

  it("returns a valid yup schema from a schema with a number and a max", async () => {
    const schema = {
      type: "object",
      properties: {
        test: {
          type: "number",
          validations: [
            {
              type: "max",
              params: [1],
            },
          ],
        },
      },
    };

    const result = yupGeneration(schema);
    expect(await result.isValid({ test: 1 })).toBe(true);
    expect(await result.isValid({ test: "1" })).toBe(true);
    expect(await result.isValid({ test: "a" })).toBe(false);
    expect(await result.isValid({ test: null })).toBe(false);
    expect(await result.isValid({ test: undefined })).toBe(true);
    expect(await result.isValid({ test: NaN })).toBe(false);
    expect(await result.isValid({ test: 0 })).toBe(true);
    expect(await result.isValid({ test: 2 })).toBe(false);
  });

  it("returns a valid yup schema from a schema with a number and a min and a max", async () => {
    const schema = {
      type: "object",
      properties: {
        test: {
          type: "number",
          validations: [
            {
              type: "min",
              params: [1],
            },
            {
              type: "max",
              params: [10],
            },
          ],
        },
      },
    };

    const result = yupGeneration(schema);
    expect(await result.isValid({ test: 1 })).toBe(true);
    expect(await result.isValid({ test: "1" })).toBe(true);
    expect(await result.isValid({ test: "a" })).toBe(false);
    expect(await result.isValid({ test: null })).toBe(false);
    expect(await result.isValid({ test: undefined })).toBe(true);
    expect(await result.isValid({ test: NaN })).toBe(false);
    expect(await result.isValid({ test: 0 })).toBe(false);
    expect(await result.isValid({ test: 2 })).toBe(true);
    expect(await result.isValid({ test: 11 })).toBe(false);
  });

  it("returns a valid yup schema from a schema with a number and a min and a max and a required", async () => {
    const schema = {
      type: "object",
      properties: {
        test: {
          type: "number",
          validations: [
            {
              type: "required",
              params: ["This field is required"],
            },
            {
              type: "min",
              params: [1],
            },
            {
              type: "max",
              params: [10],
            },
          ],
        },
      },
    };

    const result = yupGeneration(schema);
    expect(await result.isValid({ test: 1 })).toBe(true);
    expect(await result.isValid({ test: "1" })).toBe(true);
    expect(await result.isValid({ test: "a" })).toBe(false);
    expect(await result.isValid({ test: null })).toBe(false);
    expect(await result.isValid({ test: undefined })).toBe(false);
    expect(await result.isValid({ test: NaN })).toBe(false);
    expect(await result.isValid({ test: 0 })).toBe(false);
    expect(await result.isValid({ test: 2 })).toBe(true);
    expect(await result.isValid({ test: 11 })).toBe(false);
  });

  it("returns a valid yup schema from a schema with a number and a min and a max and a required and a positive", async () => {
    const schema = {
      type: "object",
      properties: {
        test: {
          type: "number",
          validations: [
            {
              type: "required",
              params: ["This field is required"],
            },
            {
              type: "min",
              params: [1],
            },
            {
              type: "max",
              params: [10],
            },
            {
              type: "positive",
              params: ["This field must be positive"],
            },
          ],
        },
      },
    };

    const result = yupGeneration(schema);
    expect(await result.isValid({ test: 1 })).toBe(true);
    expect(await result.isValid({ test: "1" })).toBe(true);
    expect(await result.isValid({ test: "a" })).toBe(false);
    expect(await result.isValid({ test: null })).toBe(false);
    expect(await result.isValid({ test: undefined })).toBe(false);
    expect(await result.isValid({ test: NaN })).toBe(false);
    expect(await result.isValid({ test: 0 })).toBe(false);
    expect(await result.isValid({ test: 2 })).toBe(true);
    expect(await result.isValid({ test: 11 })).toBe(false);
    expect(await result.isValid({ test: -1 })).toBe(false);
  });

  it("returns a valid yup schema from a schema with a number and a transform and a type error and is not nullable", async () => {
    const schema = {
      type: "object",
      properties: {
        test: {
          type: "number",
          validations: [
            {
              type: "transform",
              params: [(_: any, val: any) => (val ? Number(val) : null)],
            },
            {
              type: "typeError",
              params: ["This field must be a number"],
            },
            {
              type: "nullable",
              params: [false],
            },
          ],
        },
      },
    };

    const result = yupGeneration(schema);

    expect(await result.isValid({ test: 1 })).toBe(true);
  });

  it("returns an invalid yup schema from a schema with a nested object in the param validation", async () => {
    const schema = {
      type: "object",
      properties: {
        test: {
          type: "number",
          validations: [
            {
              type: "required",
              params: ["This field is required"],
            },
          ],
        },
        test2: {
          type: "number",
          validations: [
            {
              type: "required",
              params: ["This field is required"],
            },
            {
              type: "when",
              params: [
                {
                  comparatorVariable: "test",
                  is: (yupVar: any) => yupVar === 1,
                  then: [
                    {
                      type: "min",
                      params: [5],
                    },
                  ],
                  otherwise: [
                    {
                      type: "min",
                      params: [0],
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    };

    const result = yupGeneration(schema);
    expect(await result.isValid({ test: 1 })).toBe(false);
    expect(await result.isValid({ test: "1" })).toBe(false);
    expect(await result.isValid({ test: "a" })).toBe(false);
    expect(await result.isValid({ test: null })).toBe(false);
    expect(await result.isValid({ test: undefined })).toBe(false);
    expect(await result.isValid({ test: NaN })).toBe(false);
    expect(await result.isValid({ test: 0 })).toBe(false);
    expect(await result.isValid({ test: 2, test2: 1 })).toBe(true);
    expect(await result.isValid({ test: 2, test2: 5 })).toBe(true);
    expect(await result.isValid({ test: 2, test2: 6 })).toBe(true);
    expect(await result.isValid({ test: 2, test2: 0 })).toBe(true);
    expect(await result.isValid({ test: 2, test2: -1 })).toBe(false);
    expect(await result.isValid({ test: 1, test2: 1 })).toBe(false);
  });

  it("returns an empty yup schema when given an empty schema", async () => {
    const schema = {
      type: "object",
      properties: {},
    };

    const result = yupGeneration(schema);
    expect(await result.isValid({})).toBe(true);
  });
});
