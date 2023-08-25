import { HTMLAttributes, InputHTMLAttributes } from 'react';

export enum InputType {
  Text = 'text',
  Number = 'number',
  Password = 'password',
}

type InputProps = {
  type: InputType;
} & InputHTMLAttributes<HTMLInputElement>;

export function Input({
  type,
  ...nativeHtmlProps
}: InputProps): JSX.Element {
  return (
    <input
      type={type}
      autoComplete={type === InputType.Password ? 'off' : 'on'}
      {...nativeHtmlProps}
    />
  );
}
