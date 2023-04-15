import { Form, Formik } from 'formik';

import {
  Button,
  ButtonVariant,
  ButtonWidth,
  DateTimePicker,
  GenderPicker,
  Select,
} from 'components';

import styles from './SearchInviteForm.module.scss';

export const SearchInviteForm = () => {
  type A = { value: string; label: string };

  const options: A[] = [
    { value: 'Любая активность', label: 'Любая активность' },
    { value: 'Спорт', label: 'Спорт' },
    { value: 'Искусство', label: 'Искусство' },
    { value: 'Кино', label: 'Кино' },
  ];

  const cityOptions: A[] = [
    { value: 'Минск', label: 'Минск' },
    { value: 'Гродно', label: 'Гродно' },
    { value: 'Могилев', label: 'Могилев' },
  ];

  const initialValues = {
    activity: options[0],
    city: cityOptions[0],
    date: '',
    gender: '',
  };

  const handleSubmit = (values: any, actions: any) => {
    alert(JSON.stringify(values));
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(props) => (
        <Form className={styles.form}>
          <div className={styles.formInputs}>
            <div className={styles.multiselects}>
              <Select
                name="activity"
                getOptionLabel={(option: A) => option.label}
                getOptionValue={(option: A) => option.value}
                options={options}
                noVerify
              />
              <Select
                name="city"
                getOptionLabel={(cityOption: A) => cityOption.label}
                getOptionValue={(cityOption: A) => cityOption.value}
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
            <GenderPicker name="gender" inputType="checkbox" />
          </div>

          <div className={styles.actions}>
            <Button width={ButtonWidth.Small} type="submit">
              Искать
            </Button>
            <Button
              onClick={() => props.resetForm()}
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
