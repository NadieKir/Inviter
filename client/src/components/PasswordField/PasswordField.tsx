import {
  InputFieldExternalProps,
  InputField,
  InputRenderProps,
  Input,
  InputType,
} from 'components';

type PasswordFieldProps = {
  placeholderText?: string;
} & InputFieldExternalProps;

export const PasswordField = (props: PasswordFieldProps): JSX.Element => {
  const { placeholderText, ...inputFieldProps } = props;

  return (
    <InputField {...inputFieldProps}>
      {({ field, className }: InputRenderProps): JSX.Element => (
        <Input
          {...field}
          className={className}
          placeholder={placeholderText}
          type={InputType.Password}
        />
      )}
    </InputField>
  );
};
// };
