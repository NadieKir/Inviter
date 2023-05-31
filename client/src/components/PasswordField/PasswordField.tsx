import { useState } from 'react';
import classNames from 'classnames';

import {
  InputFieldExternalProps,
  InputField,
  InputRenderProps,
  Input,
  InputType,
} from 'components';

import styles from './PasswordField.module.scss';
import eyeImage from 'assets/images/eye.svg';

type PasswordFieldProps = {
  placeholderText?: string;
  className?: string;
} & InputFieldExternalProps;

export const PasswordField = (props: PasswordFieldProps): JSX.Element => {
  const [isPasswordRevealed, setIsPasswordRevealed] = useState<boolean>(false);
  const { className, placeholderText, ...inputFieldProps } = props;

  return (
    <InputField
      containerAttributes={{
        className: classNames(className),
      }}
      {...inputFieldProps}
    >
      {({ field, className }: InputRenderProps): JSX.Element => (
        <div className={styles.passwordField}>
          <Input
            {...field}
            className={classNames(className, styles.passwordInput)}
            placeholder={placeholderText}
            type={isPasswordRevealed ? InputType.Text : InputType.Password}
          />
          <img
            className={styles.eyeImage}
            onMouseDown={() => setIsPasswordRevealed(true)}
            onMouseUp={() => setIsPasswordRevealed(false)}
            src={eyeImage}
            alt="eye"
          />
        </div>
      )}
    </InputField>
  );
};
