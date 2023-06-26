import classNames from "classnames";
import { LabelProps } from "../../../../interfaces/sharedInterfaces";
import { ConvertText } from "../../../textParser/textParser";

const FormLabel: React.FC<LabelProps> = ({
  labelContent,
  htmlFor,
  labelClassName,
}) => {
  const labelClassNames = classNames(
    labelClassName ??
      "align-bottom flex items-baseline rounded-md mb-2 text-md text-gray-700 dark:text-gray-400 top-1 z-10 bg-white dark:bg-gray-900 px-2 min-h-[48px]"
  );

  return (
    <label htmlFor={htmlFor ?? ""} className={labelClassNames}>
      <p className="mt-auto">
        <ConvertText text={labelContent} />
      </p>
    </label>
  );
};

export default FormLabel;
