import {
    InputFieldExternalProps,
    InputField,
    InputRenderProps,
    TextArea,
    Input,
    InputType,
} from 'components';


type NumberFieldConstraints = {
    min?: number,
    max?: number,
}

type NumberFieldProps = InputFieldExternalProps & NumberFieldConstraints;

export const NumberField = ({
    max,
    min,
    ...inputFieldProps
}: NumberFieldProps): JSX.Element => {


    return (
        <InputField {...inputFieldProps}>
            {({ field, className, form: { setFieldValue } }: InputRenderProps): JSX.Element => {
                return (
                    <Input
                        {...field}
                        onKeyDown={e => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                        className={className}
                        type={InputType.Number}
                        min={min}
                        max={max}
                    />
                )
            }}
        </InputField>
    );
};
