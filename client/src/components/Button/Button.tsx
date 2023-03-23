import { PropsWithChildren, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = ({
  variant = ButtonVariant.Primary,
  children,
  ...nativeButtonProps
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      {...nativeButtonProps}
      className={classNames(styles.button, styles[variant])}
    >
      <div className={styles.buttonContent}>{children}</div>
    </button>
  );
};
