import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { Button, PasswordField, TextField } from 'components';
import { LoginFormData, LoginFormFields } from 'types/authorization';

import styles from './AuthorizationForm.module.scss';

export const AuthorizationForm = () => {
  const loginSchema = Yup.object().shape({
    [LoginFormFields.Login]: Yup.string(),
    [LoginFormFields.Password]: Yup.string(),
  });

  const handleSubmit = (
    values: LoginFormData,
    actions: FormikHelpers<LoginFormData>,
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
