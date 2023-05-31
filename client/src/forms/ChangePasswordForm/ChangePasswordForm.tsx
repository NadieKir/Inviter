import { useState } from 'react';
import { AxiosError } from 'axios';
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';

import {
  Button,
  ButtonVariant,
  Loader,
  LoaderSize,
  PasswordField,
} from 'components';
import { ChangePasswordFields, ChangePasswordFormData } from 'types';
import { updateUserPassword } from 'api';
import { usePushNotification } from 'common/hooks';
import { User } from 'models';

import styles from './ChangePasswordForm.module.scss';

interface ChangePasswordFormProps {
  user: User;
}

export const ChangePasswordForm = ({ user }: ChangePasswordFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { pushSuccess, pushError } = usePushNotification();

  const changePasswordInitialValues = {
    [ChangePasswordFields.OldPassword]: '',
    [ChangePasswordFields.NewPassword]: '',
    [ChangePasswordFields.ConfirmNewPassword]: '',
  };

  const changePasswordSchema = Yup.object().shape({
    [ChangePasswordFields.OldPassword]: Yup.string()
      .min(8, 'Введите минимум 8 символов')
      .required('Введите старый пароль'),
    [ChangePasswordFields.NewPassword]: Yup.string()
      .min(8, 'Введите минимум 8 символов')
      .required('Введите новый пароль'),
    [ChangePasswordFields.ConfirmNewPassword]: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Пароли должны совпадать')
      .required('Подтвердите пароль'),
  });

  const handlePasswordChange = async (
    values: ChangePasswordFormData,
    action: FormikHelpers<ChangePasswordFormData>,
  ) => {
    const payload = {
      userId: user._id,
      formData: values,
    };

    try {
      setIsLoading(true);
      await updateUserPassword(payload);

      pushSuccess('Пароль успешно обновлен');
      action.resetForm();
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      console.log(error);

      pushError('Пароль не был изменен', error.response?.data?.message ?? '');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={changePasswordInitialValues}
      validationSchema={changePasswordSchema}
      onSubmit={handlePasswordChange}
    >
      {(props) => (
        <Form className={styles.form}>
          <PasswordField name="oldPassword" placeholderText="Старый пароль" />
          <PasswordField name="newPassword" placeholderText="Новый пароль" />
          <PasswordField
            name="confirmNewPassword"
            placeholderText="Повтор нового пароля"
          />

          {isLoading ? (
            <Loader variant={LoaderSize.SMALL} />
          ) : (
            <Button
              type="submit"
              variant={ButtonVariant.Secondary}
              disabled={!props.isValid || !props.dirty}
            >
              Изменить
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
};
