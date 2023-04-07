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
  [InviteFormFields.CompanionsAmount]: [0, 3]
}

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
        value: Yup.string().required(),
        label: Yup.string().required(),
      }).nullable().required('type is required'),
      [InviteFormFields.City]: Yup.object().shape({
        value: Yup.string().required(),
        label: Yup.string().required(),
      }).nullable().required('city is required'),
      [InviteFormFields.Description]: Yup.string().min(3, 'description min length - 3').required('description is required'),
    });

    const additionalFieldsSchema = Yup.object().shape({
      [InviteFormFields.Date]: Yup.date(),
      [InviteFormFields.Time]: Yup.date(),
      [InviteFormFields.Place]: Yup.string(),
      [InviteFormFields.CompanionAge]: Yup.string(),
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
      const { setFieldValue } = formikProps;

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
            <TextField
              name={InviteFormFields.CompanionAge}
              labelText="Возраст компаньона(-ов)"
              multiline={false}
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
