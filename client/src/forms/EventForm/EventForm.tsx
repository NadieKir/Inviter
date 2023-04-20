import { observer } from 'mobx-react-lite';
import { FormikHelpers, FormikProps, FormikValues } from 'formik';
import * as Yup from 'yup';

import {
  DateTimePicker,
  FormikStepper,
  IStep,
  ImagePreviewMode,
  ImageUploader,
  Select,
  TextField,
} from 'components';
import {
  AdditionalEventFields,
  EventFormData,
  EventFormFields,
  RequiredEventFields,
  SelectOption,
  CITIES_OPTIONS,
  EVENT_TYPES_OPTIONS,
} from 'types';
import { City, EventType } from 'models';
import { selectOptionValidationSchema } from 'common/constants';
import { isDateValueEquals } from 'common/helpers';

import styles from './EventForm.module.scss';

interface EventFormProps {
  initialValuesRequiredStep: RequiredEventFields;
  initialValuesAdditionalStep: AdditionalEventFields;
  handleSubmit: (
    values: EventFormData,
    actions: FormikHelpers<EventFormData>,
  ) => Promise<void>;
  touchedNotRequired?: boolean;
}

const requiredFieldsSchema = Yup.object().shape({
  [EventFormFields.Name]: Yup.string()
    .min(3, 'Минимальная длина темы - 3 символа')
    .required('Введите тему'),
  [EventFormFields.Description]: Yup.string()
    .min(3, 'Минимальная длина описания - 3 символа')
    .required('Введите описание'),
  [EventFormFields.Type]: selectOptionValidationSchema
    .required('Введите тип события')
    .nullable(),
  [EventFormFields.Address]: Yup.string().required('Введите адрес'),
  [EventFormFields.City]: selectOptionValidationSchema
    .required('Введите город')
    .nullable(),
  [EventFormFields.Date]: Yup.date().required('Введите дату'),
  [EventFormFields.Time]: Yup.date().required('Введите время'),
});

const additionalFieldsSchema = Yup.object().shape({
  [EventFormFields.Image]: Yup.string().nullable(),
  [EventFormFields.Url]: Yup.string().url('Введите корректную ссылку'),
});

const renderRequiredFields = (formikProps: FormikProps<FormikValues>) => {
  const { values, setFieldValue } = formikProps;
  const date = new Date(values[EventFormFields.Date] as string);
  const time = new Date(values[EventFormFields.Time] as string);

  const isSelectedDateToday = isDateValueEquals(date, new Date());
  const minTime = isSelectedDateToday ? new Date() : undefined;
  const maxTime = isSelectedDateToday
    ? new Date(new Date().setHours(23, 59, 59))
    : undefined;

  if (minTime && time && time < minTime) {
    setFieldValue(EventFormFields.Time, '');
  }

  return (
    <>
      <TextField
        name={EventFormFields.Name}
        labelText="Название"
        multiline={false}
      />
      <TextField
        name={EventFormFields.Description}
        labelText="Описание"
        multiline
        maxLetterCount={1000}
      />
      <Select
        name={EventFormFields.Type}
        labelText="Тип"
        getOptionLabel={(o) => o.label}
        getOptionValue={(o) => o.value}
        options={EVENT_TYPES_OPTIONS}
      />
      <Select
        name={EventFormFields.City}
        labelText="Город"
        getOptionLabel={(o) => o.label}
        getOptionValue={(o) => o.value}
        options={CITIES_OPTIONS}
      />
      <TextField
        name={EventFormFields.Address}
        labelText="Адрес"
        multiline={false}
      />
      <div className={styles.dateWrapper}>
        <DateTimePicker
          name={EventFormFields.Date}
          className={styles.datePicker}
          labelText="Дата"
          excludePastDateTime={true}
          showTimeSelect={false}
        />
        <DateTimePicker
          name={EventFormFields.Time}
          className={styles.datePicker}
          labelText="Время"
          constraints={{
            showTimeSelectOnly: true,
            timeIntervals: 15,
            minTime: minTime,
            maxTime: maxTime,
          }}
        />
      </div>
    </>
  );
};

const renderAdditionalFields = () => (
  <>
    <TextField
      name={EventFormFields.Url}
      labelText="Ссылка"
      multiline={false}
    />
    <ImageUploader
      name={EventFormFields.Image}
      labelText="Изображение"
      variant={ImagePreviewMode.Large}
    />
  </>
);

export const EventForm = observer(
  ({
    initialValuesRequiredStep,
    initialValuesAdditionalStep,
    handleSubmit,
    touchedNotRequired = false,
  }: EventFormProps) => {
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
      values: EventFormData,
      actions: FormikHelpers<EventFormData>,
    ) => {
      const resultValues = {
        ...values,
        [EventFormFields.Type]: (
          values[EventFormFields.Type] as SelectOption<EventType>
        ).value,
        [EventFormFields.City]: (
          values[EventFormFields.City] as SelectOption<City>
        ).value,
      };

      handleSubmit(resultValues, actions);
    };

    return (
      <FormikStepper
        steps={steps}
        formHeading="Создать событие"
        finishButtonContent="Создать"
        onFinish={onSubmit}
      />
    );
  },
);
