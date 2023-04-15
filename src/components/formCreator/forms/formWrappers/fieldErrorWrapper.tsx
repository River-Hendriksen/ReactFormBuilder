import classNames from "classnames";

interface FieldErrorProps {
  errorClassName?: string;
  error?: any;
  errMsg?: string;
}

export const FieldErrorWrapper: React.FC<FieldErrorProps> = ({
  errorClassName,
  error,
  errMsg,
}) => {
  const classes = classNames(
    errorClassName ?? "  text-red-700 px-2 py-1  relative mb-1"
  );

  return (
    <div className={classes} role="alert">
      <span className="font-semibold text-md">
        {errMsg ?? "*" + error?.message}
      </span>
    </div>
  );
};
