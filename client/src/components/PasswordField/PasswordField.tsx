import { useState } from 'react';

import {
  InputFieldExternalProps,
  InputField,
  InputRenderProps,
  Input,
  InputType,
} from 'components';

import eyeImage from 'assets/images/eye.svg';
import styles from './PasswordField.module.scss';
import classNames from 'classnames';


type PasswordFieldProps = {
  placeholderText?: string;
  className?: string;
} & InputFieldExternalProps;

export const PasswordField = (props: PasswordFieldProps): JSX.Element => {
  const [isPasswordRevealed, setIsPasswordRevealed] = useState<boolean>(false);
  const { className, placeholderText, ...inputFieldProps } = props;

  return (
    <InputField containerAttributes={{ className: classNames(className, styles.passwordField) }} {...inputFieldProps}>
      {({ field, className }: InputRenderProps): JSX.Element => (
        <>
          <Input
            {...field}
            className={classNames(className,)}
            placeholder={placeholderText}
            type={isPasswordRevealed ? InputType.Text : InputType.Password}
          />
          <img
            className={styles.eyeImage}
            onMouseDown={() => setIsPasswordRevealed(true)}
            onMouseUp={() => setIsPasswordRevealed(false)}
            src={eyeImage}
            alt='eye' />
        </>
      )}
    </InputField>
  );
};
// };
