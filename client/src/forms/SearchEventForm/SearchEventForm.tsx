import { Form, Formik } from 'formik';
import styles from './SearchEventForm.module.scss';
import {
  Button,
  ButtonVariant,
  ButtonWidth,
  DateTimePicker,
  Select,
} from 'components';
import { CITIES_OPTIONS, INVITE_TYPES_OPTIONS, SearchEventFilters, SearchEventFiltersFormFields, SelectOption } from 'types';
import { formatToOnlyDate } from 'common/helpers';


const formatResultValues = (values: SearchEventFiltersFormFields): SearchEventFilters => {
  const formattedDate = values.date
    ? formatToOnlyDate(values.date)
    : undefined;

  return {
    ...values,
    type: values.type?.value ?? undefined,
    city: values.city?.value ?? undefined,
    date: formattedDate,
  };
};

const evenTypeOptions: SelectOption<string>[] = [
  {
    label: 'Любой',
    value: ''
  },
  ...INVITE_TYPES_OPTIONS,
];

const cityOptions: SelectOption<string>[] = [
  {
    label: 'Любой',
    value: ''
  },
  ...CITIES_OPTIONS,
];

type Props = {
  initialFilters?: SearchEventFiltersFormFields;
  onSubmit?: (values: SearchEventFilters) => void;
};

export const SearchEventForm = ({
  initialFilters,
  onSubmit,
}: Props) => {
  const initialValues = {
    type: evenTypeOptions[0],
    city: cityOptions[0],
    date: '',
    ...initialFilters,
  };

  const handleSubmit = (values: SearchEventFiltersFormFields, actions: any) => {
    onSubmit?.(formatResultValues(values));
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(props) => (
        <Form className={styles.form}>
          <div className={styles.formInputs}>
            <div className={styles.multiselects}>
              <Select
                name="type"
                getOptionLabel={o => o.label}
                getOptionValue={o => o.value}
                options={evenTypeOptions}
                noVerify
              />
              <Select
                name="city"
                getOptionLabel={o => o.label}
                getOptionValue={o => o.value}
                options={cityOptions}
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
            </div>
          </div>

          <div className={styles.actions}>
            <Button width={ButtonWidth.Small} type="submit">
              Искать
            </Button>
            <Button
              onClick={() => {
                props.resetForm()

                onSubmit?.(formatResultValues(props.values));
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
