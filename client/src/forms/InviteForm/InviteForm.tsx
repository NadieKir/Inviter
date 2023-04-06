import { FormikHelpers } from 'formik';
import { observer } from 'mobx-react-lite';
import * as Yup from 'yup';

import {
  AdditionalInviteFields,
  InviteFormData,
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
      subject: Yup.string().min(3, 'd').required('s'),
    });

    const additionalFieldsSchema = Yup.object().shape({
      place: Yup.string().min(3, 'ds'),
    });

    type A = { value: string; label: string };
    const options: A[] = [
      { value: 'a', label: 'a' },
      { value: 'b', label: 'b' },
      { value: 'n', label: 'n' },
    ];

    const renderRequiredFields = () => (
      <>
        <TextField name="subject" labelText="Хочу..." multiline={false} />
        <Select
          name="type"
          labelText="Тема"
          getOptionLabel={(option: A) => option.label}
          getOptionValue={(option: A) => option.value}
          options={options}
        />
        <Select
          name="city"
          labelText="Город"
          getOptionLabel={(option: A) => option.label}
          getOptionValue={(option: A) => option.value}
          options={options}
        />
        <TextField
          name="description"
          labelText="Описание"
          multiline={true}
          maxLetterCount={500}
        />
      </>
    );

    const renderAdditionalFields = () => (
      <>
        <div className={styles.wrapper}>
          <div className={styles.dateWrapper}>
            <DateTimePicker
              name="date"
              labelText="Дата"
              excludePastDateTime={true}
              showTimeSelect={false}
            />
            <DateTimePicker
              name="time"
              labelText="Время"
              constraints={{
                showTimeSelectOnly: true,
                timeIntervals: 15,
              }}
            />
          </div>

          <button className={styles.clearButton}>Очистить</button>
        </div>
        <TextField name="place" labelText="Адрес" multiline={false} />
        <div className={styles.wrapper}>
          <TextField
            name="companionAge"
            labelText="Возраст компаньона(-ов)"
            multiline={false}
          />
          <GenderCheckboxes name="gender" labelText="Пол" />
          <NumberField
            name="companionsAmount"
            labelText="Количество"
            min={0}
            max={3}
          />
        </div>
      </>
    );

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
