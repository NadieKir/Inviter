import classNames from 'classnames';

import {
  Input,
  InputField,
  InputFieldExternalProps,
  InputRenderProps,
  InputType,
} from 'components';

import { maskString } from './utils';

import styles from './AgeRangeField.module.scss';

export type AgeRangeFieldProps = InputFieldExternalProps & {
  className?: string;
  placeholderText?: string;
};

const ageRangeMask = 'XX-XX';

const allowedKeys = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  'Backspace',
  'ArrowLeft',
  'ArrowRight',
];

export const AgeRangeField = ({
  className,
  placeholderText,
  ...inputFieldProps
}: AgeRangeFieldProps): JSX.Element => {
  return (
    <InputField
      containerAttributes={{ className: className }}
      {...inputFieldProps}
    >
      {({
        field,
        className,
        form: { setFieldValue },
      }: InputRenderProps): JSX.Element => {
        return (
          <Input
            {...field}
            onKeyDown={(e) => {
              if (!allowedKeys.includes(e.key)) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            onChange={(e) => {
              const newValue = e.target.value;
              const clearedValue = newValue.replace('-', '');
              const maskedValue = maskString(clearedValue, ageRangeMask);
              setFieldValue(field.name, maskedValue);
            }}
            className={classNames(className, styles.ageRangeField)}
            type={InputType.Text}
            placeholder={placeholderText}
          />
        );
      }}
    </InputField>
  );
};
