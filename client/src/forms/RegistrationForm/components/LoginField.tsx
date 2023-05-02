import { useEffect, useState } from "react";

import { checkLogin } from "api";

import { Input, InputField, InputFieldExternalProps, InputRenderProps, InputType } from "components";
import { FormikValues, useFormikContext } from "formik";


type Props = {
    placeholderText?: string;
    pattern?: string;
    className?: string;
    onBlur?: (value: string) => void;
    onChange?: (value: string) => void;
}

type LoginFieldProps = InputFieldExternalProps & Props;

export const LoginField = ({
    name,
    className,
    placeholderText,
    onBlur,
    onChange,
    ...rest
}: LoginFieldProps) => {
    const { errors, setFieldError } = useFormikContext<FormikValues>();
    const [loginToValidate, setLoginToValidate] = useState('');
    const error = errors[name] as string;

    useEffect(() => {
        (async () => {
            if (!loginToValidate) {
                return true;
            }

            var isLoginExist = await checkLogin(loginToValidate);
            if (isLoginExist) {
                setFieldError(name, 'Введеный логин уже существует');
            } else {
                setFieldError(name, undefined);
            }
        })()
    }, [name, loginToValidate, setFieldError]);

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
                            setLoginToValidate(e.target.value);
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