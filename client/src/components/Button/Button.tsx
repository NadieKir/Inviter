import { PropsWithChildren, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
}

export enum ButtonWidth {
  Big = 'widthBig',
  Small = 'widthSmall',
}

export enum ButtonHeight {
  Big = 'heightBig',
  Small = 'heightSmall',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  width?: ButtonWidth;
  height?: ButtonHeight;
}

export const Button = ({
  variant = ButtonVariant.Primary,
  width = ButtonWidth.Big,
  height = ButtonHeight.Big,
  children,
  ...nativeButtonProps
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      {...nativeButtonProps}
      className={classNames(
        styles.button,
        styles[variant],
        styles[width],
        styles[height],
      )}
    >
      <div className={styles.buttonContent}>{children}</div>
    </button>
  );
};
