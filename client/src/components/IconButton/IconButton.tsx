import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './IconButton.module.scss';

export enum IconButtonColor {
  Default = 'default',
  Green = 'green',
  Red = 'red',
  Blue = 'blue',
}

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  icon: string;
  buttonColor?: IconButtonColor;
}

export const IconButton = ({
  className,
  icon,
  buttonColor = IconButtonColor.Default,
  ...restProps
}: IconButtonProps) => (
  <button
    {...restProps}
    className={classNames(styles.buttonCustom, className, styles[buttonColor])}
  >
    <img src={icon} alt="" className={styles.icon} />
  </button>
);
