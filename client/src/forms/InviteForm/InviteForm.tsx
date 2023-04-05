import { FormikHelpers } from 'formik';
import { observer } from 'mobx-react-lite';
import * as Yup from 'yup';

import {
  AdditionalInviteFields,
  InviteFormData,
  RequiredInviteFields,
} from 'types';
import { FormikStepper, IStep, TextField } from 'components';

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
      place: Yup.string().min(3, 'ds').required('s'),
    });

    const renderRequiredFields = () => (
      <>
        <TextField name="subject" labelText="Хочу..." multiline={false} />
        {/* <RichTextInput
          name="excerpt"
          labelText={intl.formatMessage({ id: 'excerptLabel' })}
        />
        <MultiSelect
          name="speakers"
          labelText={intl.formatMessage({ id: 'speakersLabel' })}
          options={options}
          getOptionLabel={(option) => `${option.name} ${option.surname}`}
          getOptionValue={(option) => option.id}
        />
        <DateTimeRangePicker
          startRangeName="start"
          endRangeName="finish"
          excludePastDateTime
          className={styles.datesInputWrapper}
        /> */}
      </>
    );

    const renderAdditionalFields = () => (
      <>
        <TextField name="place" labelText="Адрес" multiline={false} />
        {/* <ImageUploader
          name="image"
          variant={ImagePreviewMode.Thumbnail}
          labelText={intl.formatMessage({ id: 'imageLabel' })}
        /> */}
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
