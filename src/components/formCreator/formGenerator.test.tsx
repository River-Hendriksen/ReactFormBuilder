// import { render } from "@testing-library/react";

// import { FormBuilder } from "./formGenerator";
// import {
//   clusterProp,
//   formBuilderProps,
//   formProp,
//   formProperties,
// } from "../../interfaces/formGenerationInterfaces";

// describe("FormBuilder creation", () => {
//   let testSchema = {
//     type: "object",
//     properties: [
//       {
//         className: "grid grid-cols-2 gap-4",
//         children: [
//           {
//             fields: {
//               alertGenerated: {
//                 type: "dateTime",
//                 label: "dateTest",
//               },
//               postalCode: {
//                 type: "input",
//                 label: "inputTest",
//               },
//             },
//           },
//           {
//             fields: {
//               Bingo: {
//                 type: "dateTime",
//                 label: "dateTest2",
//               },
//               Bango: {
//                 type: "input",
//                 label: "inputTest2",
//               },
//             },
//           },
//         ],
//       },
//       {
//         className: "w-full justify-center flex",
//         children: [
//           {
//             className:
//               "card w-3/4 justify-center  shadow-[0_2px_8px_0px_rgba(5,34,97,0.1)]",
//             children: [
//               {
//                 className: "card-body",
//                 fields: {
//                   endStageRenalDiseaseOnAdmission: {
//                     type: "checkbox",
//                     label: "asdkjasdlk",
//                   },
//                   interventionOutsideCarePlan: {
//                     type: "checkbox",
//                     label: "asdsad",
//                     children: {
//                       interventionOutsideCarePlanSpecification: {
//                         type: "input",
//                         label: "asdsad",
//                         wrapperClassName: "flex pr-8 py-5",
//                       },
//                     },
//                   },
//                 },
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   };
//   it("should render", () => {
//     const { container } = render(<FormBuilder schema={testSchema} data={{}} />);
//     expect(container).toBeTruthy();
//   });
// });
