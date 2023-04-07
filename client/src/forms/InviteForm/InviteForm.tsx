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
  GenderCheckboxes,
  IStep,
  NumberField,
  Select,
  TextField,
} from 'components';

import styles from './InviteForm.module.scss';

interface InviteFormProps {
  initialValuesRequiredStep: RequiredInviteFields;
  initialValuesAdditionalStep: AdditionalInviteFields;
  handleSubmit: (
    values: InviteFormData,
    actions: FormikHelpers<InviteFormData>,
  ) => Promise<void>;
  touchedNotRequired?: boolean;
}

type A = { value: string; label: string };
const options: A[] = [
  { value: 'a', label: 'a' },
  { value: 'b', label: 'b' },
  { value: 'n', label: 'n' },
];

const formConstraints = {
  [InviteFormFields.CompanionsAmount]: [1, 3]
}

const isDateValueEqualsBy = (first: Date, second: Date) =>
  first.getDay() === second.getDay()
  && first.getMonth() === second.getMonth()
  && first.getFullYear() === second.getFullYear();

export const InviteForm = observer(
  ({
    initialValuesRequiredStep,
    initialValuesAdditionalStep,
    handleSubmit,
    touchedNotRequired = false,
  }: InviteFormProps) => {
    // const [options, setOptions] = useState<ShortUser[]>([]);

    // useEffect(() => {
    //   (async function () {
    //     const users = await getShortUsers();
    //     setOptions(users);
    //   })();
    // }, []);

    const requiredFieldsSchema = Yup.object().shape({
      [InviteFormFields.Subject]: Yup.string().min(3, 'subject min length - 3').required('subject is required'),
      [InviteFormFields.Type]: Yup.object().shape({
        value: Yup.string(),
        label: Yup.string(),
      }).nullable().required('type is required'),
      [InviteFormFields.City]: Yup.object().shape({
        value: Yup.string(),
        label: Yup.string(),
      }).nullable().required('city is required'),
      [InviteFormFields.Description]: Yup.string().min(3, 'description min length - 3').required('description is required'),
    });

    const additionalFieldsSchema = Yup.object().shape({
      [InviteFormFields.Date]: Yup.date(),
      [InviteFormFields.Time]: Yup.date(),
      [InviteFormFields.Place]: Yup.string(),
      [InviteFormFields.CompanionAge]: Yup.string()
        .test(
          'not-empty-test',
          'Введите строку типа "XX-XX"',
          value => !value ? true : /^(1[8-9]|[2-9][0-9])-(1[9]|[2-9][0-9])$/gm.test(value),
        ),
      [InviteFormFields.CompanionGender]: Yup.array()
        .of(Yup.string()),
      [InviteFormFields.CompanionsAmount]: Yup.number()
        .min(formConstraints[InviteFormFields.CompanionsAmount][0])
        .max(formConstraints[InviteFormFields.CompanionsAmount][1])
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
          getOptionLabel={(option: A) => option.label}
          getOptionValue={(option: A) => option.value}
          options={options}
        />
        <Select
          name={InviteFormFields.City}
          labelText="Город"
          getOptionLabel={(option: A) => option.label}
          getOptionValue={(option: A) => option.value}
          options={options}
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

      const isSelectedDateToday = isDateValueEqualsBy(date, new Date());
      const minTime = isSelectedDateToday ? new Date() : undefined;
      const maxTime = isSelectedDateToday ? new Date(new Date().setHours(23, 59, 59)) : undefined;

      if (minTime && time && time < minTime) {
        setFieldValue(InviteFormFields.Time, "");
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
                setFieldValue(InviteFormFields.Date, "");
                setFieldValue(InviteFormFields.Time, "");
              }}
            >
              Очистить
            </button>
          </div>
          <TextField
            name={InviteFormFields.Place}
            labelText="Адрес"
            multiline={false}
          />
          <div className={styles.wrapper}>
            <AgeRangeField
              name={InviteFormFields.CompanionAge}
              labelText="Возраст компаньона(-ов)"
            />
            <GenderCheckboxes
              name={InviteFormFields.CompanionGender}
              labelText="Пол"
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

    return <FormikStepper steps={steps} onFinish={handleSubmit} />;
  },
);
