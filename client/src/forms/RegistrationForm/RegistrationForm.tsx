import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { FormikHelpers, FormikProps, FormikValues } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';

import {
  AgeRangeField,
  DateTimePicker,
  FormikStepper,
  GenderPicker,
  IStep,
  ImageUploader,
  PasswordField,
  Select,
  TextField,
} from 'components';
import { register } from 'api';
import {
  RegistrationFirstStepFormData,
  RegistrationSecondStepFormData,
  RegistrationThirdStepFormData,
  RegistrationFormData,
  RegistrationFormFields,
  ATTITUDES_OPTIONS,
  CITIES_OPTIONS,
  FAMILY_STATUSES_OPTIONS,
  GENDERS,
  INTERESTS_OPTIONS,
  LANGUAGES_OPTIONS,
  ORIENTATIONS_OPTIONS,
  SelectOption,
} from 'types';
import {
  Attitude,
  City,
  FamilyStatus,
  Interests,
  Language,
  Orientation,
  Role,
} from 'models';
import {
  ageRangeValidationSchema,
  selectOptionValidationSchema,
} from 'common/constants';
import { UserContext } from 'common/contexts';
import { getAge } from 'common/helpers';
import { httpClient } from 'api/httpClient';

import { LoginField } from './components/LoginField';
import { EmailField } from './components/EmailField';

import styles from './RegistrationForm.module.scss';

const getDefaultPossibleDate = () => {
  const currentDate = dayjs();
  const possibleYear = currentDate.get('year') - 16;
  const possibleDate = currentDate.set('year', possibleYear);

  return possibleDate.toDate();
};

const firstStepInitialValues: RegistrationFirstStepFormData = {
  [RegistrationFormFields.Name]: '',
  [RegistrationFormFields.Login]: '',
  [RegistrationFormFields.Email]: '',
  [RegistrationFormFields.Birthday]: getDefaultPossibleDate().toDateString(),
  [RegistrationFormFields.Gender]: null,
  [RegistrationFormFields.Password]: '',
  [RegistrationFormFields.ConfirmPassword]: '',
};

const firstStepValidationSchema = Yup.object().shape({
  [RegistrationFormFields.Name]: Yup.string().required('Введите имя'),
  [RegistrationFormFields.Login]: Yup.string().required('Введите логин'),
  [RegistrationFormFields.Email]: Yup.string()
    .email('Введите правильную почту')
    .required('Введите почту'),
  [RegistrationFormFields.Birthday]: Yup.string()
    .nullable()
    .required('Введите день рождения')
    .test('adultTest', 'Вам должно быть 16 лет', (v) =>
      v ? getAge(new Date(v)) >= 16 : true,
    ),
  [RegistrationFormFields.Gender]: Yup.string()
    .nullable()
    .oneOf(GENDERS)
    .required('Введите пол'),
  [RegistrationFormFields.Password]: Yup.string()
    .required('Введите пароль')
    .min(8, 'Минимальная длина пароля - 8 символов'),
  [RegistrationFormFields.ConfirmPassword]: Yup.string()
    .oneOf(
      [Yup.ref(RegistrationFormFields.Password), null],
      'Пароли должны совпадать',
    )
    .required('Подтвердите пароль'),
});

const firstStepFields = (formikProps: FormikProps<FormikValues>) => {
  return (
    <>
      <TextField
        name={RegistrationFormFields.Name}
        className={styles.firstStepFormName}
        placeholderText="Имя"
        multiline={false}
      />
      <div className={styles.spaceBetweenWrapper}>
        <DateTimePicker
          name={RegistrationFormFields.Birthday}
          className={styles.firstStepFormBirthday}
          placeholderText="День рождения"
          showTimeSelect={false}
          constraints={{
            dateFormat: 'dd.MM.yyyy',
            showYearDropdown: true,
            scrollableYearDropdown: true,
            yearDropdownItemNumber: 30,
            maxDate: getDefaultPossibleDate(),
          }}
        />
        <GenderPicker
          className={styles.genderWrapper}
          name={RegistrationFormFields.Gender}
          inputType="radio"
        />
      </div>
      <LoginField
        name={RegistrationFormFields.Login}
        className={styles.firstStepFormLogin}
        placeholderText="Логин"
      />
      <EmailField
        name={RegistrationFormFields.Email}
        className={styles.firstStepFormEmail}
        placeholderText="Почта"
      />
      <div className={styles.spaceBetweenWrapper}>
        <PasswordField
          name={RegistrationFormFields.Password}
          className={styles.firstStepFormPassword}
          placeholderText="Пароль"
        />
        <PasswordField
          name={RegistrationFormFields.ConfirmPassword}
          className={styles.firstStepFormConfirmPassword}
          placeholderText="Подтвердите пароль"
        />
      </div>
    </>
  );
};

const secondStepInitialValues: RegistrationSecondStepFormData = {
  [RegistrationFormFields.City]: null,
  [RegistrationFormFields.Orientation]: null,
  [RegistrationFormFields.FamilyStatus]: null,
  [RegistrationFormFields.AlcoholAttitude]: null,
  [RegistrationFormFields.SmokingAttitude]: null,
  [RegistrationFormFields.Languages]: [],
  [RegistrationFormFields.Interests]: [],
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
      maxMenuHeight={60}
      creatable
      options={INTERESTS_OPTIONS}
    />
  </>
);

const thirdStepInitialValues: RegistrationThirdStepFormData = {
  [RegistrationFormFields.WelcomeMessage]: '',
  [RegistrationFormFields.ConnectionMethods]: '',
  [RegistrationFormFields.PreferredAge]: '',
  [RegistrationFormFields.Image]: '',
};

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
  [RegistrationFormFields.Image]: Yup.string().required(
    'Загрузите свое изображение',
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

export const RegistrationForm = observer(() => {
  const navigate = useNavigate();

  const userStore = useContext(UserContext);

  const handleSubmit = async (
    values: RegistrationFormData,
    actions: FormikHelpers<RegistrationFormData>,
  ) => {
    try {
      const { data } = await httpClient.post(
        '/uploads',
        values[RegistrationFormFields.Image],
      );

      const resultValues: RegistrationFormData = {
        ...values,
        role: Role.USER,
        [RegistrationFormFields.ConfirmPassword]: undefined,
        [RegistrationFormFields.Orientation]: (
          values[
            RegistrationFormFields.Orientation
          ] as SelectOption<Orientation>
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
          values[
            RegistrationFormFields.AlcoholAttitude
          ] as SelectOption<Attitude>
        ).value,
        [RegistrationFormFields.SmokingAttitude]: (
          values[
            RegistrationFormFields.SmokingAttitude
          ] as SelectOption<Attitude>
        ).value,
        [RegistrationFormFields.Languages]: (
          values[RegistrationFormFields.Languages] as SelectOption<Language>[]
        ).map((o) => o.value),
        [RegistrationFormFields.Interests]: (
          values[RegistrationFormFields.Interests] as SelectOption<
            Interests | string
          >[]
        ).map((o) => o.value),
        [RegistrationFormFields.Image]: data.url,
      };

      const user = await register(resultValues);
      userStore.setUser(user);
      localStorage.setItem('user', user.token);
      navigate('/');
    } catch (e) {
      alert(e);
    } finally {
      actions.setSubmitting(false);
    }
  };

  const steps: IStep[] = [
    {
      title: 'Шаг 1',
      initialValues: firstStepInitialValues,
      validateSchema: firstStepValidationSchema,
      formClassName: styles.firstStepForm,
      fields: firstStepFields,
    },
    {
      title: 'Шаг 2',
      initialValues: secondStepInitialValues,
      validateSchema: secondStepValidationSchema,
      formClassName: styles.secondStepForm,
      fields: secondStepFields,
    },
    {
      title: 'Шаг 3',
      initialValues: thirdStepInitialValues,
      validateSchema: thirdStepValidationSchema,
      formClassName: styles.thirdStepForm,
      fields: thirdStepFields,
    },
  ];

  return (
    <FormikStepper
      finishButtonContent="Зарегистрироваться"
      steps={steps}
      onFinish={handleSubmit}
      formHeading="Зарегистрироваться"
    />
  );
});
