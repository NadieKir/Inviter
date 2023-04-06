import ReactSelect, { GetOptionLabel, GetOptionValue } from 'react-select';
import { useFormikContext } from 'formik';
import classNames from 'classnames';

import {
  InputField,
  InputFieldExternalProps,
  InputRenderProps,
} from 'components';
import { EmotionCacheProvider } from 'common/contexts';

import styles from './Select.module.scss';

type SelectProps<T> = {
  isMulti?: boolean;
  options: T[];
  getOptionLabel?: GetOptionLabel<T>;
  getOptionValue?: GetOptionValue<T>;
  placeholderText?: string;
} & InputFieldExternalProps;

export function Select<T>({
  options,
  getOptionLabel,
  getOptionValue,
  isMulti = false,
  placeholderText = '',
  ...inputFieldProps
}: SelectProps<T>) {
  const { setFieldValue, setFieldTouched } = useFormikContext();

  return (
    <EmotionCacheProvider>
      <InputField {...inputFieldProps}>
        {({ field, className }: InputRenderProps): JSX.Element => (
          <ReactSelect
            options={options}
            classNames={{
              control: (state) =>
                classNames(className, styles.select, {
                  [styles.selectFocused]: state.isFocused,
                }),
            }}
            styles={{
              control: (base) => ({
                ...base,
                borderColor: undefined,
                boxShadow: undefined,
              }),
            }}
            isMulti={isMulti}
            maxMenuHeight={145}
            defaultValue={field.value}
            value={field.value}
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
            onBlur={() => setFieldTouched(field.name, true)}
            onChange={(options) => {
              setFieldValue(field.name, options);
            }}
            placeholder={placeholderText}
            noOptionsMessage={() => 'Нет результатов'}
          />
        )}
      </InputField>
    </EmotionCacheProvider>
  );
}
