import { observer } from 'mobx-react-lite';
import { FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { AgeRangeField, DateTimePicker, FormikStepper, GenderPicker, IStep, PasswordField, Select, TextField, YesNoPicker } from 'components';
import {
  RegistrationFirstStepFormData,
  RegistrationSecondStepFormData,
  RegistrationThirdStepFormData,
  RegistrationFormData,
  RegistrationFormFields
} from 'types/authorization';
import { FAMILY_STATUSES_OPTIONS, GENDERS, ORIENTATIONS_OPTIONS } from 'models/constants';

import styles from './RegistrationForm.module.scss';
import { ageRangeValidationSchema, selectOptionValidationSchema } from 'common/constants';
import { SelectOption } from 'types/other';
import { FamilyStatus, Orientation } from 'models';


const firstStepInitialValues: RegistrationFirstStepFormData = {
  [RegistrationFormFields.Name]: '',
  [RegistrationFormFields.Login]: '',
  [RegistrationFormFields.Email]: '',
  [RegistrationFormFields.Birthday]: null,
  [RegistrationFormFields.Gender]: null,
  [RegistrationFormFields.Password]: '',
  [RegistrationFormFields.ConfirmPassword]: '',
}

const firstStepValidationSchema = Yup.object().shape({
  [RegistrationFormFields.Name]: Yup.string().required('Введите имя'),
  [RegistrationFormFields.Login]: Yup.string().required('Введите логин'),
  [RegistrationFormFields.Email]: Yup.string().email('Введите правильную почту').required('Введите почту'),
  [RegistrationFormFields.Birthday]: Yup.string().nullable().required('Введите день рождения'),
  [RegistrationFormFields.Gender]: Yup.string().nullable().oneOf(GENDERS).required('Введите пол'),
  [RegistrationFormFields.Password]: Yup.string().required('Введите пароль'),
  [RegistrationFormFields.ConfirmPassword]: Yup.string()
    .oneOf([Yup.ref(RegistrationFormFields.Password), null], 'Пароли должны совпадать')
    .required('Подтвердите пароль'),
});

const firstStepFields = () => (
  <>
    <TextField
      name={RegistrationFormFields.Name}
      className={styles.firstStepFormName}
      placeholderText='Имя'
      multiline={false}
    />
    <TextField
      name={RegistrationFormFields.Login}
      className={styles.firstStepFormLogin}
      placeholderText='Логин'
      multiline={false}
    />
    <div className={styles.firstStepFormEmailGenderBirthday}>
      <TextField
        name={RegistrationFormFields.Email}
        labelText='Почта'
        multiline={false}
      />
      <DateTimePicker
        name={RegistrationFormFields.Birthday}
        labelText="День рождения"
        showTimeSelect={false}
        constraints={{
          dateFormat: "dd.MM.yyyy",
          showYearDropdown: true,
          scrollableYearDropdown: true,
          yearDropdownItemNumber: 30,
        }}
      />
      <GenderPicker
        name={RegistrationFormFields.Gender}
        labelText='Пол'
        inputType='radio'
      />
    </div>
    <PasswordField
      name={RegistrationFormFields.Password}
      className={styles.firstStepFormPassword}
      placeholderText='Пароль'
    />
    <PasswordField
      name={RegistrationFormFields.ConfirmPassword}
      className={styles.firstStepFormConfirmPassword}
      placeholderText='Подтвердите пароль'
    />
  </>
);

const secondStepInitialValues: RegistrationSecondStepFormData = {
  [RegistrationFormFields.City]: '',
  [RegistrationFormFields.Orientation]: null,
  [RegistrationFormFields.FamilyStatus]: null,
  [RegistrationFormFields.AlcoholAttitude]: null,
  [RegistrationFormFields.SmokingAttitude]: null,
  [RegistrationFormFields.Languages]: [],
  [RegistrationFormFields.Interests]: [],
}

const secondStepValidationSchema = Yup.object().shape({
  [RegistrationFormFields.City]: Yup.string().required('Введите город'),
  [RegistrationFormFields.Orientation]: selectOptionValidationSchema.nullable().required('Введите ориентацию'),
  [RegistrationFormFields.FamilyStatus]: selectOptionValidationSchema.nullable().required('Введите семейный статус'),
  [RegistrationFormFields.AlcoholAttitude]: Yup.boolean().nullable().required('Выберите отношение к алкоголю'),
  [RegistrationFormFields.SmokingAttitude]: Yup.boolean().nullable().required('Выберите отношение к курению'),
  [RegistrationFormFields.Languages]: Yup.array().of(selectOptionValidationSchema).min(1, 'Введите хотя бы один язык'),
  [RegistrationFormFields.Interests]: Yup.array().of(selectOptionValidationSchema).min(1, 'Введите хотя бы один интерес'),
});

const secondStepFields = () => (
  <>
    <TextField
      name={RegistrationFormFields.City}
      className={styles.secondStepFormCity}
      placeholderText='Город'
      multiline={false}
    />
    <Select
      name={RegistrationFormFields.Orientation}
      className={styles.secondStepFormOrientation}
      placeholderText="Ориентация"
      getOptionLabel={o => o.value}
      getOptionValue={o => o.label}
      options={ORIENTATIONS_OPTIONS}
    />
    <Select
      name={RegistrationFormFields.FamilyStatus}
      className={styles.secondStepFormFamilyStatus}
      placeholderText="Семейное положение"
      getOptionLabel={o => o.value}
      getOptionValue={o => o.label}
      options={FAMILY_STATUSES_OPTIONS}
    />
    <YesNoPicker
      name={RegistrationFormFields.AlcoholAttitude}
      className={styles.secondStepFormAlcoholAttitude}
      labelText='Отношение к алкоголю'
    />
    <YesNoPicker
      name={RegistrationFormFields.SmokingAttitude}
      className={styles.secondStepFormSmokingAttitude}
      labelText='Отношение к курению'
    />
    <Select
      name={RegistrationFormFields.Languages}
      className={styles.secondStepFormLanguages}
      placeholderText="Языки"
      getOptionLabel={o => o.value}
      getOptionValue={o => o.label}
      isMulti
      options={ORIENTATIONS_OPTIONS}
    />
    <Select
      name={RegistrationFormFields.Interests}
      className={styles.secondStepFormInterests}
      placeholderText="Интересы"
      getOptionLabel={o => o.value}
      getOptionValue={o => o.label}
      isMulti
      options={FAMILY_STATUSES_OPTIONS}
    />
  </>
);

const thirdStepInitialValues: RegistrationThirdStepFormData = {
  [RegistrationFormFields.WelcomeMessage]: '',
  [RegistrationFormFields.ConnectionMethods]: '',
  [RegistrationFormFields.PreferredAge]: '',
}

const thirdStepValidationSchema = Yup.object().shape({
  [RegistrationFormFields.WelcomeMessage]: Yup.string().required('Введите приветственное сообщение'),
  [RegistrationFormFields.ConnectionMethods]: Yup.string().required('Введите свои контактные данные'),
  [RegistrationFormFields.PreferredAge]: ageRangeValidationSchema.required('Введите предпочитаемый возраст пользователей'),
});

const thirdStepFields = () => (
  <>
    <TextField
      name={RegistrationFormFields.WelcomeMessage}
      labelText='Приветственное сообщение'
      multiline
    />
    <TextField
      name={RegistrationFormFields.ConnectionMethods}
      labelText='Контактные данные'
      multiline
    />
    <AgeRangeField
      name={RegistrationFormFields.PreferredAge}
      labelText='Предпочитаемый возраст'
    />
  </>
);


export const RegistrationForm = observer(() => {
  const handleSubmit = async (values: RegistrationFormData, actions: FormikHelpers<RegistrationFormData>) => {
    const resultValues: RegistrationFormData = {
      ...values,
      [RegistrationFormFields.Orientation]: (values[RegistrationFormFields.Orientation] as SelectOption).value as Orientation,
      [RegistrationFormFields.FamilyStatus]: (values[RegistrationFormFields.FamilyStatus] as SelectOption).value as FamilyStatus,
      [RegistrationFormFields.Languages]: (values[RegistrationFormFields.Languages] as SelectOption[]).map(o => o.value),
      [RegistrationFormFields.Interests]: (values[RegistrationFormFields.Interests] as SelectOption[]).map(o => o.value),
    };

    alert(JSON.stringify(resultValues));
  }

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
      fields: thirdStepFields,
    },
  ];

  return <FormikStepper steps={steps} onFinish={handleSubmit} />;
});
