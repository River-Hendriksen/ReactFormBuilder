import { LabelProps } from "../../../../interfaces/sharedInterfaces";

const FormLabel: React.FC<LabelProps> = ({
  labelContent,
  htmlFor,
  labelClassName,
}) => {
  console.log("label creations", labelContent, htmlFor, labelClassName);
  return (
    <label
      htmlFor={htmlFor ?? ""}
      className={
        labelClassName
          ? labelClassName
          : " align-bottom flex items-baseline rounded-md mb-2 text-md text-gray-500 dark:text-gray-400 top-1 z-10 bg-white dark:bg-gray-900 px-2 min-h-[48px]"
      }
    >
      <p className="mt-auto">{labelContent}</p>
    </label>
  );
};

export default FormLabel;
