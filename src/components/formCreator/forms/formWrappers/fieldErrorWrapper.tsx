import classNames from 'classnames';

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
        errorClassName ?? '  text-red-700 px-2 py-1  relative mb-1'
    );
    let msg = errMsg ?? '*' + error?.message;
    if (Array.isArray(error)) {
        const tmp = error.find((e) => e?.value?.message);
        if (tmp) msg = '*' + tmp.value.message;
    }

    return (
        <div className={classes} role="alert">
            <span className="font-semibold text-md">{msg}</span>
        </div>
    );
};
