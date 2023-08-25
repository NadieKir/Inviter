import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useContext } from 'react';

import { Button, ButtonVariant, ImageUploader, TextField } from 'components';
import { EditAdminProfileFormData, RegistrationFormFields } from 'types';
import { LoginField } from 'forms/RegistrationForm/components/LoginField';
import { httpClient } from 'api/httpClient';
import { updateUserProfile } from 'api';
import { UserContext } from 'common/contexts';

import styles from './EditAdminProfileForm.module.scss';

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

  const handleProfileChange = async (
    values: EditAdminProfileFormData,
    actions: FormikHelpers<EditAdminProfileFormData>,
  ) => {
    try {
      let resultValues: EditAdminProfileFormData = {
        ...values,
      };

      if (typeof values[RegistrationFormFields.Image] !== 'string') {
        const { data } = await httpClient.post(
          '/uploads',
          values[RegistrationFormFields.Image],
        );

        resultValues = {
          ...values,
          [RegistrationFormFields.Image]: data.url,
        };
      }

      actions.setSubmitting(true);

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
