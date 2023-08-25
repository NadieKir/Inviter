import { Form, Formik, FormikHelpers } from 'formik';
import { observer } from 'mobx-react-lite';
import * as Yup from 'yup';

import {
  AgeRangeField,
  Button,
  ButtonVariant,
  ButtonWidth,
  GenderPicker,
  TextField,
} from 'components';
import {
  ageRangeValidationSchema,
} from 'common/constants';

import { InviteEventFields, InviteEventFormFields } from 'types/inviteEvent';
import { Gender } from 'models';

import styles from './InviteEventForm.module.scss';

interface InviteEventFormProps {
  initialValues: InviteEventFields;
  handleSubmit: (
    values: InviteEventFields,
    actions: FormikHelpers<InviteEventFields>,
  ) => Promise<void>;
  formSubmitLabel?: string;
}

const validationSchema = Yup.object().shape({
  [InviteEventFormFields.Description]: Yup.string()
    .min(3, 'Минимальная длина описания - 3 символа')
    .required('Введите описание'),
  [InviteEventFormFields.CompanionAge]: ageRangeValidationSchema,
  [InviteEventFormFields.CompanionGender]: Yup.array().of(Yup.string()),
});


export const InviteEventForm = observer(
  ({
    initialValues,
    handleSubmit,
    formSubmitLabel = 'Создать'
  }: InviteEventFormProps) => {
    const onSubmit = async (
      values: InviteEventFields,
      actions: FormikHelpers<InviteEventFields>,
    ) => {

      const resultValues = {
        ...values,
        [InviteEventFormFields.CompanionGender]:
          values[InviteEventFormFields.CompanionGender]?.length === 0
            ? [Gender.MALE, Gender.FEMALE]
            : values[InviteEventFormFields.CompanionGender],
      };

      handleSubmit(resultValues, actions);
    };

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(props) => {
          return (
            <Form className={styles.form}>
              <TextField
                name={InviteEventFormFields.Description}
                labelText="Описание"
                multiline={true}
                maxLetterCount={500}
              />
              <div className={styles.wrapper}>
                <AgeRangeField
                  name={InviteEventFormFields.CompanionAge}
                  labelText="Возраст компаньона(-ов)"
                />
                <GenderPicker
                  name={InviteEventFormFields.CompanionGender}
                  labelText="Пол"
                  inputType="checkbox"
                />
              </div>
              <Button
                className={styles.submitButton}
                type="submit"
                variant={ButtonVariant.Primary}
                width={ButtonWidth.Small}
                disabled={!props.isValid || !props.dirty}
              >
                {formSubmitLabel}
              </Button>
            </Form>
          )
        }}
      </Formik >
    );
  },
);
