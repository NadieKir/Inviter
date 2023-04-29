import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Form, Formik, FormikHelpers } from 'formik';

import { Button, TextField } from 'components';
import { InviteRespondFormData, InviteRespondFormFields } from 'types';
import { UserContext } from 'common/contexts';

import styles from './InviteResponseForm.module.scss';
import info from './info.svg';

interface InviteResponseFormProps {
  inviteId: string;
  onModalClose: () => void;
}

export const InviteResponseForm = observer(
  ({ inviteId, onModalClose }: InviteResponseFormProps) => {
    const { respondInvite } = useContext(UserContext);

    const initialValues: InviteRespondFormData = {
      [InviteRespondFormFields.Message]: '',
    };

    const handleSubmit = async (
      values: InviteRespondFormData,
      actions: FormikHelpers<InviteRespondFormData>,
    ) => {
      try {
        await respondInvite(inviteId, values);
        onModalClose();
      } catch (error) {
        console.log(error);
      } finally {
        actions.setSubmitting(false);
      }
    };

    return (
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {() => (
          <Form className={styles.form}>
            <TextField
              name="message"
              placeholderText="Ваше сообщение"
              multiline={true}
              maxLetterCount={300}
            />
            <div className={styles.infoWrapper}>
              <img src={info} alt="Информация" />
              Пожалуйста, не используйте фраз, способных обидеть собеседника
            </div>
            <Button className={styles.submitButton} type="submit">
              Отправить заявку
            </Button>
          </Form>
        )}
      </Formik>
    );
  },
);
