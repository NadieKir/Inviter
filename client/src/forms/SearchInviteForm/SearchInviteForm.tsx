import { Form, Formik } from 'formik';

import {
  Button,
  ButtonVariant,
  ButtonWidth,
  DateTimePicker,
  IconCheckbox,
  Select,
} from 'components';

import styles from './SearchInviteForm.module.scss';
import man from './assets/man.svg';
import woman from './assets/woman.svg';

export const SearchInviteForm = () => {
  type A = { value: string; label: string };
  const options: A[] = [
    { value: 'a', label: 'a' },
    { value: 'b', label: 'b' },
    { value: 'n', label: 'n' },
  ];

  const initialValues = {
    activity: options[0],
    city: options[0],
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
                getOptionLabel={(option: A) => option.label}
                getOptionValue={(option: A) => option.value}
                options={options}
                noVerify
              />
              <DateTimePicker
                name="date"
                showTimeSelect={false}
                excludePastDateTime={true}
                placeholderText="Когда"
              />
            </div>
            <div className={styles.genders}>
              <IconCheckbox icon={man} name="gender" value="Мужской" />
              <IconCheckbox icon={woman} name="gender" value="Женский" />
            </div>
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
