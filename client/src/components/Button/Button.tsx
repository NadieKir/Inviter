import { PropsWithChildren, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
}

export enum ButtonSize {
  Big = 'big',
  Small = 'small',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = ({
  variant = ButtonVariant.Primary,
  size = ButtonSize.Big,
  children,
  ...nativeButtonProps
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      {...nativeButtonProps}
      className={classNames(styles.button, styles[variant], styles[size])}
    >
      <div className={styles.buttonContent}>{children}</div>
    </button>
  );
};
