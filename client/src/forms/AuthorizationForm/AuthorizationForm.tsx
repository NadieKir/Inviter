import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { Button, PasswordField, TextField } from 'components';
import { LoginFormData, LoginFormFields } from 'types';
import { login } from 'api';
import { UserContext } from 'common/contexts';

import styles from './AuthorizationForm.module.scss';

export const AuthorizationForm = () => {
  const navigate = useNavigate();

  const userStore = useContext(UserContext);

  const loginSchema = Yup.object().shape({
    [LoginFormFields.Login]: Yup.string(),
    [LoginFormFields.Password]: Yup.string(),
  });

  const handleSubmit = async (
    values: LoginFormData,
    actions: FormikHelpers<LoginFormData>,
  ) => {
    try {
      const user = await login(values);

      userStore.setUser(user);
      localStorage.setItem('user', user.token);

      navigate('/');
    } catch (error: any) {
      if (error.response.status === 400) alert('Пользователь не найден');
      else console.log(error);
    } finally {
      actions.setSubmitting(false);
    }
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
