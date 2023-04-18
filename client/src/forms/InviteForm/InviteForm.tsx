import { FormikHelpers, FormikProps, FormikValues } from 'formik';
import { observer } from 'mobx-react-lite';
import * as Yup from 'yup';

import {
  AdditionalInviteFields,
  InviteFormData,
  InviteFormFields,
  RequiredInviteFields,
} from 'types';
import {
  AgeRangeField,
  DateTimePicker,
  FormikStepper,
  GenderPicker,
  IStep,
  NumberField,
  Select,
  TextField,
} from 'components';
import {
  ageRangeValidationSchema,
  selectOptionValidationSchema,
} from 'common/constants';

import styles from './InviteForm.module.scss';
import { CITIES_OPTIONS, INVITE_TYPES_OPTIONS } from 'models';
import { isDateValueEquals } from 'common/helpers';

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
  [InviteFormFields.City]:
    selectOptionValidationSchema.required('Введите город'),
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
  const date = new Date(values[InviteFormFields.Date] as string);
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
          <DateTimePicker
            name={InviteFormFields.Time}
            labelText="Время"
            constraints={{
              showTimeSelectOnly: true,
              timeIntervals: 15,
              minTime: minTime,
              maxTime: maxTime,
            }}
          />
        </div>

        <button
          type="button"
          className={styles.clearButton}
          onClick={() => {
            setFieldValue(InviteFormFields.Date, '');
            setFieldValue(InviteFormFields.Time, '');
          }}
        >
          Очистить
        </button>
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

    return (
      <FormikStepper
        steps={steps}
        formHeading="Создать инвайт"
        onFinish={handleSubmit}
      />
    );
  },
);
