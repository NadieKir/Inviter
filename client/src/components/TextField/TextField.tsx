import classNames from 'classnames';
import {
  InputFieldExternalProps,
  InputField,
  InputRenderProps,
  TextArea,
  Input,
  InputType,
} from 'components';

import styles from './TextField.module.scss';


type TextInputOrAreaProps = {
  placeholderText?: string;
  pattern?: string;
  className?: string;
  onBlur?: (value: string) => void;
  onChange?: (value: string) => void;
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
  let className: string | undefined;
  let placeholderText: string | undefined;
  let inputFieldProps: InputFieldExternalProps;
  let multiline: boolean | undefined;
  let maxLetterCount: number | undefined;
  let pattern: string | undefined;



  switch (props.multiline) {
    case true:
      ({ className, placeholderText, pattern, multiline, maxLetterCount, ...inputFieldProps } =
        props);

      return (
        <InputField containerAttributes={{ className: className }} {...inputFieldProps}>
          {({ field, className }: InputRenderProps): JSX.Element => (
            <TextArea
              {...field}
              onBlur={(e) => {
                field.onBlur(e);
                props.onBlur?.(e.target.value);
              }}
              onChange={(e) => {
                field.onChange(e);
                props.onChange?.(e.currentTarget.value);
              }}
              className={classNames(className, styles.textArea)}
              placeholder={placeholderText}
              maxLetterCount={maxLetterCount}
              pattern={pattern}
            />
          )}
        </InputField>
      );
    case false:
    default:
      ({ className, placeholderText, pattern, ...inputFieldProps } = props);

      return (
        <InputField containerAttributes={{ className: className }} {...inputFieldProps}>
          {({ field, className }: InputRenderProps): JSX.Element => (
            <Input
              {...field}
              onBlur={(e) => {
                field.onBlur(e);
                props.onBlur?.(e.target.value);
              }}
              onChange={(e) => {
                field.onChange(e);
                props.onChange?.(e.currentTarget.value);
              }}
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
