import { Form, Formik } from 'formik';

import {
  Button,
  ButtonVariant,
  ButtonWidth,
  DateTimePicker,
  GenderPicker,
  Select,
} from 'components';
import {
  CITIES_OPTIONS,
  INVITE_TYPES_OPTIONS,
  SearchInviteFilters,
  SearchInviteFiltersFormFields,
  SelectOption,
} from 'types';

import styles from './SearchInviteForm.module.scss';
import { formatToOnlyDate } from 'common/helpers';

const inviteTypeOptions: SelectOption<string>[] = [
  {
    label: 'Любой',
    value: '',
  },
  ...INVITE_TYPES_OPTIONS,
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
    date: formattedDate,
    gender: values.gender ? [...values.gender] : undefined,
  };
};

export const SearchInviteForm = ({ initialFilters, onSubmit }: Props) => {
  const initialValues = {
    type: inviteTypeOptions[0],
    city: CITIES_OPTIONS[0],
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
              options={CITIES_OPTIONS}
              noVerify
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
            <Button width={ButtonWidth.Small} type="submit">
              Искать
            </Button>
            <Button
              onClick={() => {
                props.resetForm();
                const initialValues = props.initialValues;

                onSubmit?.(formatResultValues(initialValues));
              }}
              width={ButtonWidth.Small}
              variant={ButtonVariant.Secondary}
              type="button"
            >
              Сброс
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
