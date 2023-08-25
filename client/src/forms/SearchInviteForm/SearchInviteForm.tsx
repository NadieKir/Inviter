import { Form, Formik } from 'formik';

import {
  DateTimePicker,
  GenderPicker,
  IconButton,
  IconButtonColor,
  Select,
  TextField,
} from 'components';
import {
  CITIES_OPTIONS,
  INVITE_TYPES_OPTIONS,
  SearchInviteFilters,
  SearchInviteFiltersFormFields,
  SelectOption,
} from 'types';
import { formatToOnlyDate } from 'common/helpers';

import styles from './SearchInviteForm.module.scss';
import search from 'assets/images/search-white.svg';
import cross from 'assets/images/cross.svg';

const inviteTypeOptions: SelectOption<string>[] = [
  {
    label: 'Любой',
    value: '',
  },
  ...INVITE_TYPES_OPTIONS,
];

const cityOptions: SelectOption<string>[] = [
  {
    label: 'Любой',
    value: '',
  },
  ...CITIES_OPTIONS,
];

type Props = {
  initialFilters?: SearchInviteFiltersFormFields;
  onSubmit?: (values: SearchInviteFilters) => void;
};

const formatResultValues = (
  values: SearchInviteFiltersFormFields,
): SearchInviteFilters => {
  const formattedDate = values.date ? formatToOnlyDate(values.date) : undefined;

  return {
    ...values,
    type: values.type?.value ?? undefined,
    city: values.city?.value ?? undefined,
    keyWord: values.keyWord ?? undefined,
    date: formattedDate,
    gender: values.gender ? [...values.gender] : undefined,
  };
};

export const SearchInviteForm = ({ initialFilters, onSubmit }: Props) => {
  const initialValues = {
    type: inviteTypeOptions[0],
    city: cityOptions[0],
    keyWord: '',
    date: null,
    gender: null,
    ...initialFilters,
  };

  const handleSubmit = (
    values: SearchInviteFiltersFormFields,
    actions: any,
  ) => {
    onSubmit?.(formatResultValues(values));
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(props) => (
        <Form className={styles.form}>
          <div className={styles.multiselects}>
            <Select
              name="type"
              getOptionLabel={(o) => o.label}
              getOptionValue={(o) => o.value}
              options={inviteTypeOptions}
              noVerify
            />
            <Select
              name="city"
              getOptionLabel={(o) => o.label}
              getOptionValue={(o) => o.value}
              options={cityOptions}
              noVerify
            />
            <TextField
              name="keyWord"
              multiline={false}
              placeholderText="Ключевое слово"
            />
            <div className={styles.dateInputWrapper}>
              <DateTimePicker
                name="date"
                showTimeSelect={false}
                excludePastDateTime={true}
                placeholderText="Когда"
              />
            </div>
            <GenderPicker name="gender" inputType="checkbox" />
          </div>

          <div className={styles.actions}>
            <IconButton
              icon={search}
              type="submit"
              buttonColor={IconButtonColor.Blue}
            />
            <IconButton
              onClick={() => {
                props.resetForm();
                const initialValues = props.initialValues;

                onSubmit?.(formatResultValues(initialValues));
              }}
              icon={cross}
              type="button"
            >
              Сброс
            </IconButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};
