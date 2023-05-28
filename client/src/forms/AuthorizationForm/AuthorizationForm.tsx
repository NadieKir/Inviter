import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { Button, Loader, PasswordField, TextField } from 'components';
import { LoginFormData, LoginFormFields } from 'types';
import { Role } from 'models';
import { UserContext } from 'common/contexts';

import styles from './AuthorizationForm.module.scss';

export const AuthorizationForm = observer(() => {
  const navigate = useNavigate();
  const [isLoadingUser, setIsUserLoading] = useState(false);

  const { login } = useContext(UserContext);

  const loginSchema = Yup.object().shape({
    [LoginFormFields.Login]: Yup.string(),
    [LoginFormFields.Password]: Yup.string(),
  });

  const handleSubmit = async (
    values: LoginFormData,
    actions: FormikHelpers<LoginFormData>,
  ) => {
    try {
      setIsUserLoading(true);
      const user = await login(values);
      if (user?.role === Role.ADMIN) navigate('/admin');
      if (user?.role === Role.USER) navigate('/');
    } catch (error: any) {
      if (error.response.status === 400) alert(error.response.data.message);
      else console.log(error);
    } finally {
      actions.setSubmitting(false);
      setIsUserLoading(false);
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

          {isLoadingUser && <Loader />}
        </Form>
      )}
    </Formik>
  );
});
