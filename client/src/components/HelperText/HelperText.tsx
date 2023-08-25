import { PropsWithChildren, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { InputFieldVariant } from 'components';

import styles from './HelperText.module.scss';

type HelperTextProps = {
  variant: InputFieldVariant;
} & PropsWithChildren &
  HTMLAttributes<HTMLParagraphElement>;

export const HelperText = ({
  variant = InputFieldVariant.Default,
  children,
  ...nativeHtmlProps
}: HelperTextProps): JSX.Element => (
  <p
    {...nativeHtmlProps}
    className={classNames(
      nativeHtmlProps.className,
      styles.container,
      styles[variant],
    )}
  >
    {children}
  </p>
);
