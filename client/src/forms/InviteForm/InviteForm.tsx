import { FormikHelpers, FormikProps, FormikValues } from 'formik';
import { observer } from 'mobx-react-lite';
import * as Yup from 'yup';

import {
  AdditionalInviteFields,
  InviteFormData,
  InviteFormFields,
  RequiredInviteFields,
  CITIES_OPTIONS,
  INVITE_TYPES_OPTIONS,
  SelectOption,
} from 'types';
import {
  AgeRangeField,
  DateTimePicker,
  FormikStepper,
  GenderPicker,
  IStep,
  IconButton,
  NumberField,
  Select,
  TextField,
} from 'components';
import {
  ageRangeValidationSchema,
  selectOptionValidationSchema,
} from 'common/constants';
import { isDateValueEquals } from 'common/helpers';
import cross from 'assets/images/redCross.svg';

import styles from './InviteForm.module.scss';
import { City, Gender, InviteType } from 'models';

interface InviteFormProps {
  initialValuesRequiredStep: RequiredInviteFields;
  initialValuesAdditionalStep: AdditionalInviteFields;
  handleSubmit: (
    values: InviteFormData,
    actions: FormikHelpers<InviteFormData>,
  ) => Promise<void>;
  touchedNotRequired?: boolean;
}

const formConstraints = {
  [InviteFormFields.CompanionsAmount]: [1, 3],
};

const requiredFieldsSchema = Yup.object().shape({
  [InviteFormFields.Subject]: Yup.string()
    .min(3, 'Минимальная длина темы - 3 символа')
    .required('Введите тему'),
  [InviteFormFields.Type]: selectOptionValidationSchema
    .nullable()
    .required('Введите тип'),
  [InviteFormFields.City]: selectOptionValidationSchema
    .nullable()
    .required('Введите город'),
  [InviteFormFields.Description]: Yup.string()
    .min(3, 'Минимальная длина описания - 3 символа')
    .required('Введите описание'),
});

const additionalFieldsSchema = Yup.object().shape({
  [InviteFormFields.Date]: Yup.date(),
  [InviteFormFields.Time]: Yup.date(),
  [InviteFormFields.Address]: Yup.string(),
  [InviteFormFields.CompanionAge]: ageRangeValidationSchema,
  [InviteFormFields.CompanionGender]: Yup.array().of(Yup.string()),
  [InviteFormFields.CompanionsAmount]: Yup.number()
    .min(formConstraints[InviteFormFields.CompanionsAmount][0])
    .max(formConstraints[InviteFormFields.CompanionsAmount][1]),
});

const renderRequiredFields = () => (
  <>
    <TextField
      name={InviteFormFields.Subject}
      labelText="Хочу..."
      multiline={false}
    />
    <Select
      name={InviteFormFields.Type}
      labelText="Тема"
      getOptionLabel={(o) => o.label}
      getOptionValue={(o) => o.value}
      options={INVITE_TYPES_OPTIONS}
    />
    <Select
      name={InviteFormFields.City}
      labelText="Город"
      getOptionLabel={(o) => o.label}
      getOptionValue={(o) => o.value}
      options={CITIES_OPTIONS}
    />
    <TextField
      name={InviteFormFields.Description}
      labelText="Описание"
      multiline={true}
      maxLetterCount={500}
    />
  </>
);

const renderAdditionalFields = (formikProps: FormikProps<FormikValues>) => {
  const { values, setFieldValue } = formikProps;
  const dateString = values[InviteFormFields.Date] as string;
  const date = new Date(dateString);
  const time = new Date(values[InviteFormFields.Time] as string);

  const isSelectedDateToday = isDateValueEquals(date, new Date());
  const minTime = isSelectedDateToday ? new Date() : undefined;
  const maxTime = isSelectedDateToday
    ? new Date(new Date().setHours(23, 59, 59))
    : undefined;

  if (minTime && time && time < minTime) {
    setFieldValue(InviteFormFields.Time, '');
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.dateWrapper}>
          <DateTimePicker
            name={InviteFormFields.Date}
            labelText="Дата"
            excludePastDateTime={true}
            showTimeSelect={false}
          />
          <img
            src={cross}
            className={styles.clearButton}
            alt="Очистить"
            onClick={() => {
              setFieldValue(InviteFormFields.Date, '');
              setFieldValue(InviteFormFields.Time, '');
            }}
          />
        </div>
        <div className={styles.dateWrapper}>
          <DateTimePicker
            name={InviteFormFields.Time}
            labelText="Время"
            constraints={{
              showTimeSelectOnly: true,
              timeIntervals: 15,
              minTime: minTime,
              maxTime: maxTime,
              disabled: !dateString,
            }}
          />
          <img
            src={cross}
            alt="Очистить"
            className={styles.clearButton}
            onClick={() => {
              setFieldValue(InviteFormFields.Time, '');
            }}
          />
        </div>
      </div>
      <TextField
        name={InviteFormFields.Address}
        labelText="Адрес"
        multiline={false}
      />
      <div className={styles.wrapper}>
        <AgeRangeField
          name={InviteFormFields.CompanionAge}
          labelText="Возраст компаньона(-ов)"
        />
        <GenderPicker
          name={InviteFormFields.CompanionGender}
          labelText="Пол"
          inputType="checkbox"
        />
        <NumberField
          name={InviteFormFields.CompanionsAmount}
          labelText="Количество"
          min={formConstraints[InviteFormFields.CompanionsAmount][0]}
          max={formConstraints[InviteFormFields.CompanionsAmount][1]}
        />
      </div>
    </>
  );
};

export const InviteForm = observer(
  ({
    initialValuesRequiredStep,
    initialValuesAdditionalStep,
    handleSubmit,
    touchedNotRequired = false,
  }: InviteFormProps) => {
    const steps: IStep[] = [
      {
        title: 'Обязательные поля',
        initialValues: initialValuesRequiredStep,
        validateSchema: requiredFieldsSchema,
        fields: renderRequiredFields,
        noVerify: touchedNotRequired,
      },
      {
        title: 'Дополнительные поля',
        initialValues: initialValuesAdditionalStep,
        validateSchema: additionalFieldsSchema,
        fields: renderAdditionalFields,
        noVerify: true,
      },
    ];

    const onSubmit = async (
      values: InviteFormData,
      actions: FormikHelpers<InviteFormData>,
    ) => {
      const time = values[InviteFormFields.Time]
        ? new Date(values[InviteFormFields.Time])
        : undefined;

      const resultValues = {
        ...values,
        [InviteFormFields.Date]: values[InviteFormFields.Date] || undefined,
        [InviteFormFields.Time]: time
          ? `${time.getHours()}:${time.getMinutes()}`
          : undefined,
        [InviteFormFields.Address]:
          values[InviteFormFields.Address] || undefined,
        [InviteFormFields.CompanionGender]:
          values[InviteFormFields.CompanionGender]?.length === 0
            ? [Gender.MALE, Gender.FEMALE]
            : values[InviteFormFields.CompanionGender],
        [InviteFormFields.CompanionAge]:
          values[InviteFormFields.CompanionAge] || undefined,
        [InviteFormFields.City]: (
          values[InviteFormFields.City] as SelectOption<City>
        ).value,
        [InviteFormFields.Type]: (
          values[InviteFormFields.Type] as SelectOption<InviteType>
        ).value,
      };

      handleSubmit(resultValues, actions);
    };

    return (
      <FormikStepper
        steps={steps}
        formHeading="Создать инвайт"
        onFinish={onSubmit}
      />
    );
  },
);
