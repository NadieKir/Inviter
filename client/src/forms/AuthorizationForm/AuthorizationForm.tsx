import { AuthFormData } from 'types';
import styles from './AuthorizationForm.module.scss';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Button, PasswordField, TextField } from 'components';

export const AuthorizationForm = () => {
  const loginSchema = Yup.object().shape({
    login: Yup.string(),
    password: Yup.string(),
  });

  const handleSubmit = (
    values: AuthFormData,
    actions: FormikHelpers<AuthFormData>,
  ) => {
    alert(JSON.stringify(values));
  };

  return (
    <Formik
      initialValues={{ login: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form className={styles.form}>
          <TextField name="login" placeholderText="Логин" multiline={false} />
          <PasswordField name="password" placeholderText="Пароль" />

          <Button type="submit" disabled={!props.isValid || !props.dirty}>
            Войти
          </Button>
        </Form>
      )}
    </Formik>
  );
};
