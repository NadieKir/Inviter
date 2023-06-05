import * as Yup from 'yup';

import {
  selectOptionValidationSchema,
  ageRangeValidationSchema,
} from 'common/constants';
import {
  AgeRangeField,
  FormikStepper,
  IStep,
  ImageUploader,
  Select,
  TextField,
} from 'components';

import { LoginField } from 'forms/RegistrationForm/components/LoginField';

import {
  ATTITUDES_OPTIONS,
  CITIES_OPTIONS,
  EditProfileFormData,
  FAMILY_STATUSES_OPTIONS,
  INTERESTS_OPTIONS,
  LANGUAGES_OPTIONS,
  ORIENTATIONS_OPTIONS,
  RegistrationFormData,
  RegistrationFormFields,
  RegistrationThirdStepFormData,
  SelectOption,
  createOption,
} from 'types';

import styles from './EditProfileForm.module.scss';
import {
  Attitude,
  City,
  FamilyStatus,
  Interests,
  Language,
  Orientation,
} from 'models';
import { useContext } from 'react';
import { UserContext } from 'common/contexts';
import { updateUserProfile } from 'api';
import { FormikHelpers } from 'formik';
import { usePushNotification } from 'common/hooks';

interface EditProfileFormProps {
  initialValues: EditProfileFormData;
  onSubmit: () => void;
}

const firstStepValidationSchema = Yup.object().shape({
  [RegistrationFormFields.Name]: Yup.string().required('Введите имя'),
  [RegistrationFormFields.Login]: Yup.string().required('Введите логин'),
});

const firstStepFields = () => {
  return (
    <>
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
    </>
  );
};

const secondStepValidationSchema = Yup.object().shape({
  [RegistrationFormFields.City]: selectOptionValidationSchema
    .nullable()
    .required('Введите город'),
  [RegistrationFormFields.Orientation]: selectOptionValidationSchema
    .nullable()
    .required('Введите ориентацию'),
  [RegistrationFormFields.FamilyStatus]: selectOptionValidationSchema
    .nullable()
    .required('Введите семейный статус'),
  [RegistrationFormFields.AlcoholAttitude]: selectOptionValidationSchema
    .nullable()
    .required('Выберите отношение к алкоголю'),
  [RegistrationFormFields.SmokingAttitude]: selectOptionValidationSchema
    .nullable()
    .required('Выберите отношение к курению'),
  [RegistrationFormFields.Languages]: Yup.array()
    .of(selectOptionValidationSchema)
    .min(1, 'Введите хотя бы один язык'),
  [RegistrationFormFields.Interests]: Yup.array()
    .of(selectOptionValidationSchema)
    .min(1, 'Введите хотя бы один интерес'),
});

const secondStepFields = () => (
  <>
    <Select
      name={RegistrationFormFields.City}
      className={styles.secondStepFormCity}
      placeholderText="Город"
      getOptionLabel={(o) => o.value}
      getOptionValue={(o) => o.label}
      options={CITIES_OPTIONS}
    />
    <div className={styles.spaceBetweenWrapper}>
      <Select
        name={RegistrationFormFields.Orientation}
        className={styles.secondStepFormOrientation}
        placeholderText="Ориентация"
        getOptionLabel={(o) => o.value}
        getOptionValue={(o) => o.label}
        options={ORIENTATIONS_OPTIONS}
      />
      <Select
        name={RegistrationFormFields.FamilyStatus}
        className={styles.secondStepFormFamilyStatus}
        placeholderText="Семейное положение"
        getOptionLabel={(o) => o.value}
        getOptionValue={(o) => o.label}
        options={FAMILY_STATUSES_OPTIONS}
      />
    </div>
    <div className={styles.spaceBetweenWrapper}>
      <Select
        name={RegistrationFormFields.AlcoholAttitude}
        className={styles.secondStepFormAlcoholAttitude}
        placeholderText="Отношение к алкоголю"
        getOptionLabel={(o) => o.value}
        getOptionValue={(o) => o.label}
        options={ATTITUDES_OPTIONS}
      />
      <Select
        name={RegistrationFormFields.SmokingAttitude}
        className={styles.secondStepFormSmokingAttitude}
        placeholderText="Отношение к курению"
        getOptionLabel={(o) => o.value}
        getOptionValue={(o) => o.label}
        options={ATTITUDES_OPTIONS}
      />
    </div>
    <Select
      name={RegistrationFormFields.Languages}
      className={styles.secondStepFormLanguages}
      placeholderText="Языки"
      getOptionLabel={(o) => o.value}
      getOptionValue={(o) => o.label}
      isMulti
      options={LANGUAGES_OPTIONS}
    />
    <Select
      name={RegistrationFormFields.Interests}
      className={styles.secondStepFormInterests}
      placeholderText="Интересы"
      getOptionLabel={(o) => o.value}
      getOptionValue={(o) => o.label}
      isMulti
      creatable
      options={INTERESTS_OPTIONS}
    />
  </>
);

const thirdStepValidationSchema = Yup.object().shape({
  [RegistrationFormFields.WelcomeMessage]: Yup.string().required(
    'Введите приветственное сообщение',
  ),
  [RegistrationFormFields.ConnectionMethods]: Yup.string().required(
    'Введите свои контактные данные',
  ),
  [RegistrationFormFields.PreferredAge]: ageRangeValidationSchema.required(
    'Введите предпочитаемый возраст пользователей',
  ),
});

const thirdStepFields = () => (
  <>
    <TextField
      name={RegistrationFormFields.WelcomeMessage}
      placeholderText="Рассказ о вас, отображаемый в профиле"
      multiline
      maxLetterCount={500}
    />
    <TextField
      name={RegistrationFormFields.ConnectionMethods}
      placeholderText="Данные для связи, показываемые при взаимности инвайта"
      multiline
      maxLetterCount={200}
    />
    <AgeRangeField
      name={RegistrationFormFields.PreferredAge}
      placeholderText="Предпочитаемый возраст отобржаемых компаньонов"
    />
    <ImageUploader
      name={RegistrationFormFields.Image}
      placeholderText="ваше фото"
    />
  </>
);

export function EditProfileForm({
  initialValues,
  onSubmit,
}: EditProfileFormProps) {
  const userStore = useContext(UserContext);
  const { pushSuccess, pushError } = usePushNotification();

  const firstStepInitialValues = {
    [RegistrationFormFields.Name]: initialValues.name,
    [RegistrationFormFields.Login]: initialValues.login,
  };

  const secondStepInitialValues = {
    [RegistrationFormFields.City]: createOption(
      (initialValues.city as string) ?? '',
    ),
    [RegistrationFormFields.Orientation]: createOption(
      (initialValues.city as string) ?? '',
    ),
    [RegistrationFormFields.FamilyStatus]: createOption(
      (initialValues.familyStatus as string) ?? '',
    ),
    [RegistrationFormFields.AlcoholAttitude]: createOption(
      (initialValues.alcoholAttitude as string) ?? '',
    ),
    [RegistrationFormFields.SmokingAttitude]: createOption(
      (initialValues.smokingAttitude as string) ?? '',
    ),
    [RegistrationFormFields.Languages]: initialValues.languages.map((l) =>
      createOption(l as string),
    ),
    [RegistrationFormFields.Interests]: initialValues.interests.map((l) =>
      createOption(l as string),
    ),
  };

  const thirdStepInitialValues: RegistrationThirdStepFormData = {
    [RegistrationFormFields.WelcomeMessage]: initialValues.welcomeMessage,
    [RegistrationFormFields.ConnectionMethods]: initialValues.connectionMethods,
    [RegistrationFormFields.PreferredAge]: initialValues.preferredAge,
    [RegistrationFormFields.Image]: initialValues.image,
  };

  const steps: IStep[] = [
    {
      title: 'Шаг 1',
      initialValues: firstStepInitialValues,
      validateSchema: firstStepValidationSchema,
      formClassName: styles.firstStepForm,
      fields: firstStepFields,
      noVerify: true,
    },
    {
      title: 'Шаг 2',
      initialValues: secondStepInitialValues,
      validateSchema: secondStepValidationSchema,
      formClassName: styles.secondStepForm,
      fields: secondStepFields,
      noVerify: true,
    },
    {
      title: 'Шаг 3',
      initialValues: thirdStepInitialValues,
      validateSchema: thirdStepValidationSchema,
      formClassName: styles.thirdStepForm,
      fields: thirdStepFields,
      noVerify: true,
    },
  ];

  const handleSubmit = async (
    values: EditProfileFormData,
    actions: FormikHelpers<EditProfileFormData>,
  ) => {
    actions.setSubmitting(true);

    const resultValues: EditProfileFormData = {
      ...values,
      [RegistrationFormFields.Orientation]: (
        values[RegistrationFormFields.Orientation] as SelectOption<Orientation>
      ).value,
      [RegistrationFormFields.FamilyStatus]: (
        values[
          RegistrationFormFields.FamilyStatus
        ] as SelectOption<FamilyStatus>
      ).value,
      [RegistrationFormFields.City]: (
        values[RegistrationFormFields.City] as SelectOption<City>
      ).value,
      [RegistrationFormFields.AlcoholAttitude]: (
        values[RegistrationFormFields.AlcoholAttitude] as SelectOption<Attitude>
      ).value,
      [RegistrationFormFields.SmokingAttitude]: (
        values[RegistrationFormFields.SmokingAttitude] as SelectOption<Attitude>
      ).value,
      [RegistrationFormFields.Languages]: (
        values[RegistrationFormFields.Languages] as SelectOption<Language>[]
      ).map((o) => o.value),
      [RegistrationFormFields.Interests]: (
        values[RegistrationFormFields.Interests] as SelectOption<
          Interests | string
        >[]
      ).map((o) => o.value),
    };

    try {
      const user = await updateUserProfile(resultValues);
      userStore.setUser(user);

      pushSuccess('Данные профиля успешно изменены');
    } catch (e) {
      console.log(e);
      pushError('Данные профиля не были изменены');
    } finally {
      actions.setSubmitting(false);
      onSubmit();
    }
  };

  return (
    <FormikStepper
      steps={steps}
      formHeading="Изменение анкеты"
      finishButtonContent="Изменить"
      onFinish={handleSubmit}
    />
  );
}
