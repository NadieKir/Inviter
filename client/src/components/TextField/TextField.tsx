import {
  InputFieldExternalProps,
  InputField,
  InputRenderProps,
  TextArea,
  Input,
  InputType,
} from 'components';

type TextInputOrAreaProps = {
  placeholderText?: string;
  pattern?: string;
} & (
    | {
      multiline: false | undefined;
    }
    | {
      multiline: true;
      maxLetterCount?: number;
    }
  );

type TextFieldProps = InputFieldExternalProps & TextInputOrAreaProps;

export const TextField = (props: TextFieldProps): JSX.Element => {
  let placeholderText: string | undefined;
  let inputFieldProps: InputFieldExternalProps;
  let multiline: boolean | undefined;
  let maxLetterCount: number | undefined;
  let pattern: string | undefined;

  switch (props.multiline) {
    case true:
      ({ placeholderText, pattern, multiline, maxLetterCount, ...inputFieldProps } =
        props);

      return (
        <InputField {...inputFieldProps}>
          {({ field, className }: InputRenderProps): JSX.Element => (
            <TextArea
              {...field}
              className={className}
              placeholder={placeholderText}
              maxLetterCount={maxLetterCount}
              pattern={pattern}
            />
          )}
        </InputField>
      );
    case false:
    default:
      ({ placeholderText, pattern, ...inputFieldProps } = props);

      return (
        <InputField {...inputFieldProps}>
          {({ field, className }: InputRenderProps): JSX.Element => (
            <Input
              {...field}
              className={className}
              placeholder={placeholderText}
              type={InputType.Text}
              pattern={pattern}
            />
          )}
        </InputField>
      );
  }
};
