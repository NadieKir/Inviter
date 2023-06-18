import ReactSelect, { GetOptionLabel, GetOptionValue } from 'react-select';
import CreatableReactSelect from 'react-select/creatable';

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
  className?: string;
  isMulti?: boolean;
  creatable?: boolean;
  options: T[];
  getOptionLabel?: GetOptionLabel<T>;
  getOptionValue?: GetOptionValue<T>;
  placeholderText?: string;
  maxMenuHeight?: number;
} & InputFieldExternalProps;

export function Select<T>({
  className,
  options,
  getOptionLabel,
  getOptionValue,
  isMulti = false,
  placeholderText = '',
  creatable = false,
  maxMenuHeight = 145,
  ...inputFieldProps
}: SelectProps<T>) {
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const SelectComponent = creatable ? CreatableReactSelect : ReactSelect;

  return (
    <EmotionCacheProvider>
      <InputField
        containerAttributes={{ className: className }}
        {...inputFieldProps}
      >
        {({ field, className }: InputRenderProps): JSX.Element => (
          <SelectComponent
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
            maxMenuHeight={maxMenuHeight}
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
