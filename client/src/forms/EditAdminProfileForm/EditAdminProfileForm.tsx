import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { Button, ButtonVariant, ImageUploader, TextField } from 'components';
import { EditAdminProfileFormData, RegistrationFormFields } from 'types';

import styles from './EditAdminProfileForm.module.scss';
import { LoginField } from 'forms/RegistrationForm/components/LoginField';
import { httpClient } from 'api/httpClient';
import { updateUserProfile } from 'api';
import { useContext } from 'react';
import { UserContext } from 'common/contexts';

interface EditAdminProfileFormProps {
  initialValues: EditAdminProfileFormData;
  onSubmit: () => void;
}

export const EditAdminProfileForm = ({
  initialValues,
  onSubmit,
}: EditAdminProfileFormProps) => {
  const userStore = useContext(UserContext);

  const editProfileSchema = Yup.object().shape({
    [RegistrationFormFields.Name]: Yup.string().required('Введите имя'),
    [RegistrationFormFields.Login]: Yup.string().required('Введите логин'),
  });

  // TODO: make it work))

  const handleProfileChange = async (
    values: EditAdminProfileFormData,
    actions: FormikHelpers<EditAdminProfileFormData>,
  ) => {
    try {
      const { data } = await httpClient.post(
        '/uploads',
        values[RegistrationFormFields.Image],
      );

      actions.setSubmitting(true);

      const resultValues: EditAdminProfileFormData = {
        ...values,
        [RegistrationFormFields.Image]: data.url,
      };

      const user = await updateUserProfile(resultValues);
      userStore.setUser(user);

      actions.setSubmitting(false);

      onSubmit();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={editProfileSchema}
      onSubmit={handleProfileChange}
    >
      {(props) => (
        <Form className={styles.form}>
          <TextField
            name={RegistrationFormFields.Name}
            className={styles.firstStepFormName}
            placeholderText="Имя"
            multiline={false}
          />
          <LoginField
            name={RegistrationFormFields.Login}
            className={styles.firstStepFormLogin}
            placeholderText="Логин"
          />
          <ImageUploader
            name={RegistrationFormFields.Image}
            placeholderText="ваше фото"
          />
          <Button type="submit" disabled={!props.isValid}>
            Изменить
          </Button>
        </Form>
      )}
    </Formik>
  );
};
