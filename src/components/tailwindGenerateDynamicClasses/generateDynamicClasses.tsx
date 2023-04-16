import { useState, useEffect } from "react";

interface DynamicClasses {
  [key: string]: string | DynamicClasses;
}

const classKeys = [
  "titleClassName",
  "labelClassName",
  "wrapperClassName",
  "className",
];

export function generateDynamicClasses(dynamicClassesJson: string): string {
  const [dynamicClasses, setDynamicClasses] = useState<string>("");

  useEffect(() => {
    const dynamicClassesObj: DynamicClasses = JSON.parse(dynamicClassesJson);

    const classNamesSet = new Set<string>();

    function addClassNames(obj: DynamicClasses) {
      for (const key in obj) {
        const value = obj[key];
        if (classKeys.includes(key) && typeof value === "string") {
          const classNames = value.split(" ");
          for (const className of classNames) {
            if (className !== "") {
              classNamesSet.add(className);
            }
          }
        } else if (typeof value === "object" && value !== null) {
          addClassNames(value);
        }
      }
    }

    addClassNames(dynamicClassesObj);
    const classNames = Array.from(classNamesSet).join(" ");

    setDynamicClasses(classNames);
  }, [dynamicClassesJson]);

  return dynamicClasses;
}
