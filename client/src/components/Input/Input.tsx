import { HTMLAttributes } from 'react';

export enum InputType {
  Text = 'text',
  Password = 'password',
}

type InputProps = {
  type: InputType;
} & HTMLAttributes<HTMLInputElement>;

export const Input = ({
  type,
  ...nativeHtmlProps
}: InputProps): JSX.Element => (
  <input
    type={type}
    autoComplete={type === InputType.Password ? 'off' : 'on'}
    {...nativeHtmlProps}
  />
);
