import { Form, Formik } from 'formik';

import {
  Button,
  ButtonHeight,
  ButtonVariant,
  ButtonWidth,
  DateTimePicker,
  IconCheckbox,
  MultiSelect,
} from 'components';

import styles from './SearchInviteForm.module.scss';
import man from './assets/man.svg';
import woman from './assets/woman.svg';

export const SearchInviteForm = () => {
  const initialValues = { activity: '', city: '', date: '', gender: '' };

  const handleSubmit = (values: any, actions: any) => {
    alert(JSON.stringify(values));
  };

  type A = { name: string; surname: string; id: string };
  const options: A[] = [
    { name: 'nam', surname: 'sur', id: '1' },
    { name: 'nam', surname: 'sur', id: '2' },
  ];

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(props) => (
        <Form className={styles.form}>
          <div className={styles.formInputs}>
            <div className={styles.multiselects}>
              <MultiSelect
                name="activity"
                options={options}
                getOptionLabel={(option: A) =>
                  `${option.name} ${option.surname}`
                }
                getOptionValue={(option: A) => option.id}
              />
              <MultiSelect
                name="city"
                options={options}
                getOptionLabel={(option: A) =>
                  `${option.name} ${option.surname}`
                }
                getOptionValue={(option: A) => option.id}
              />
              <DateTimePicker
                name="date"
                showTimeSelect={false}
                excludePastDateTime={true}
              />
            </div>
            <div className={styles.genders}>
              <IconCheckbox icon={man} name="gender" value="Мужской" />
              <IconCheckbox icon={woman} name="gender" value="Женский" />
            </div>
          </div>

          <div className={styles.actions}>
            <Button width={ButtonWidth.Small} type="submit">
              Найти
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
