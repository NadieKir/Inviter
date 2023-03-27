import Select, { GetOptionLabel, GetOptionValue } from 'react-select';
import { useFormikContext } from 'formik';
import classNames from 'classnames';

import {
  InputField,
  InputFieldExternalProps,
  InputRenderProps,
} from 'components';
import { EmotionCacheProvider } from 'common/contexts';

import styles from './MultiSelect.module.scss';

type MultiSelectProps<T> = {
  options: T[];
  getOptionLabel: GetOptionLabel<T>;
  getOptionValue: GetOptionValue<T>;
  placeholderText?: string;
} & InputFieldExternalProps;

export function MultiSelect<T>({
  options,
  getOptionLabel,
  getOptionValue,
  placeholderText = '',
  ...inputFieldProps
}: MultiSelectProps<T>) {
  const { setFieldValue, setFieldTouched } = useFormikContext();

  return (
    <EmotionCacheProvider>
      <InputField {...inputFieldProps}>
        {({ field, className }: InputRenderProps): JSX.Element => (
          <Select
            options={options}
            classNames={{
              control: (state) =>
                classNames(className, styles.multiSelect, {
                  [styles.multiSelectFocused]: state.isFocused,
                }),
            }}
            styles={{
              control: (base) => ({
                ...base,
                borderColor: undefined,
                boxShadow: undefined,
              }),
            }}
            isMulti
            maxMenuHeight={145}
            defaultValue={field.value}
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
