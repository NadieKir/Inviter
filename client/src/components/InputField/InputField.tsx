import { FunctionComponent, HTMLAttributes } from 'react';
import { Field, FieldProps } from 'formik';
import classNames from 'classnames';

import { InputLabel, HelperText } from 'components';

import styles from './InputField.module.scss';

export enum InputFieldVariant {
  Error = 'error',
  Success = 'success',
  Default = 'default',
}

export type InputRenderProps = FieldProps & {
  variant?: InputFieldVariant;
  className?: string;
};

export interface InputFieldExternalProps {
  name: string;
  labelText?: string;
  successText?: string;
  hintText?: string;
  noVerify?: boolean;
  disabled?: boolean;
  forcedError?: string;
}

type InputFieldProps = InputFieldExternalProps & {
  children: FunctionComponent<InputRenderProps>;
  containerAttributes?: Omit<HTMLAttributes<HTMLDivElement>, 'children'>;
};

export const InputField = ({
  name,
  children: inputComponent,
  labelText,
  successText,
  hintText,
  containerAttributes,
  forcedError,
  disabled = false,
  noVerify = false,
}: InputFieldProps): JSX.Element => (
  <Field name={name}>
    {(formikProps: FieldProps) => {
      const {
        field: { name },
        meta: { error, touched },
      } = formikProps;

      let inputVariant: InputFieldVariant;
      let helperTextVariant: InputFieldVariant;
      inputVariant = helperTextVariant = InputFieldVariant.Default;
      let helperText = hintText;

      const hasError = !!error || !!forcedError;
      const isTouched = !!touched;

      if (isTouched && hasError && !noVerify) {
        inputVariant = helperTextVariant = InputFieldVariant.Error;
        helperText = forcedError ? forcedError : error;
      }

      if (isTouched && !hasError && !noVerify) {
        inputVariant = InputFieldVariant.Success;

        if (successText) {
          helperTextVariant = InputFieldVariant.Success;
          helperText = successText;
        }
      }

      return (
        <div
          {...containerAttributes}
          className={classNames(
            containerAttributes?.className,
            styles.container,
          )}
        >
          {labelText ? (
            <InputLabel name={name} className={styles.inputLabel}>
              {labelText}
            </InputLabel>
          ) : null}
          {inputComponent({
            ...formikProps,
            variant: inputVariant,
            className: classNames(styles.input, styles[inputVariant], {
              [styles.inputDisabled]: disabled
            }),
          })}
          {helperText ? (
            <HelperText
              className={styles.helperText}
              variant={helperTextVariant}
            >
              {helperText}
            </HelperText>
          ) : null}
        </div>
      );
    }}
  </Field>
);
