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
    return (
        <div
            className={
                errorClassName ?? '  text-red-700 px-2 py-1  relative mb-1'
            }
            role="alert"
        >
            <span className="font-semibold text-md">
                {errMsg ?? '*' + error?.message}
            </span>
        </div>
    );
};
