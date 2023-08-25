import { useEffect, useState } from "react";
import { FormikValues, useFormikContext } from "formik";

import { checkEmail } from "api";

import { Input, InputField, InputFieldExternalProps, InputRenderProps, InputType } from "components";


type Props = {
    placeholderText?: string;
    pattern?: string;
    className?: string;
    onBlur?: (value: string) => void;
    onChange?: (value: string) => void;
}

type EmailFieldProps = InputFieldExternalProps & Props;

export const EmailField = ({
    name,
    className,
    placeholderText,
    onBlur,
    onChange,
    ...rest
}: EmailFieldProps) => {
    const { errors, setFieldError } = useFormikContext<FormikValues>();
    const [emailToValidate, setEmailToValidate] = useState('');
    const error = errors[name] as string;

    useEffect(() => {
        (async () => {
            if (!emailToValidate) {
                return true;
            }

            var isLoginExist = await checkEmail(emailToValidate);
            if (isLoginExist) {
                setFieldError(name, 'Введеная почта уже существует');
            } else {
                setFieldError(name, undefined);
            }
        })()
    }, [name, emailToValidate, setFieldError]);

    return (
        <InputField
            name={name}
            containerAttributes={{ className: className }}
            forcedError={error}
            {...rest}>
            {({ field, className }: InputRenderProps): JSX.Element => {
                return (
                    <Input
                        {...field}
                        onBlur={(e) => {
                            field.onBlur(e);
                            onBlur?.(e.target.value);
                            setEmailToValidate(e.target.value);
                        }}
                        onChange={(e) => {
                            field.onChange(e);
                            onChange?.(e.currentTarget.value);
                        }}
                        className={className}
                        placeholder={placeholderText}
                        type={InputType.Text}
                    />
                );
            }}
        </InputField>
    );
}