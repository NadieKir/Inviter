import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { UserContext } from 'common/contexts/UserProvider';
import React, { useContext } from 'react';
import { Button, PasswordField, TextField } from 'components';

import styles from './UpdateProfileForm.module.scss';
import { updateUser } from 'api/services/user.service';
import { User } from 'models';
import { observer } from 'mobx-react-lite';

export const UpdateProfileForm = observer(() => {
  const userStore = useContext(UserContext);
  if (!userStore.user) return <div>Загрузка</div>;

  const loginSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Введите минимум 2 символа'),
  });

  const handleSubmit = async (
    values: { name: string },
    actions: FormikHelpers<{ name: string }>,
  ) => {
    try {
      console.log({
        ...userStore.user,
        name: values.name,
      });
      const user = await updateUser({
        ...userStore.user,
        name: values.name,
      } as User);

      userStore.setUser(user);
    } catch (error: any) {
      if (error.response.status === 400) alert('Пользователь не найден');
      else console.log(error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ name: userStore.user?.name }}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form className={styles.form}>
          <TextField name="name" placeholderText="Имя" multiline={false} />

          <Button type="submit" disabled={!props.isValid || !props.dirty}>
            Изменить
          </Button>
        </Form>
      )}
    </Formik>
  );
});
