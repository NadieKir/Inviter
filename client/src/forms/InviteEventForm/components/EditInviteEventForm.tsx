import { observer } from 'mobx-react-lite';
import { FormikHelpers } from 'formik';

import { usePushNotification } from 'common/hooks';
import { InviteEventFields, InviteEventFormFields } from 'types/inviteEvent';

import { CreateOrEditInviteEventFormProps } from './types';
import { InviteEventForm } from '../InviteEventForm';

export const EditInviteEventForm = observer(
  ({ onSubmit }: CreateOrEditInviteEventFormProps) => {
    const { pushSuccess } = usePushNotification();

    const initialValues: InviteEventFields = {
      [InviteEventFormFields.Subject]: '',
      [InviteEventFormFields.Description]: '',
      [InviteEventFormFields.CompanionAge]: '',
      [InviteEventFormFields.CompanionGender]: [],
    };

    const handleSubmit = async (
      values: InviteEventFields,
      actions: FormikHelpers<InviteEventFields>,
    ) => {
      alert(JSON.stringify(values));

      actions.setSubmitting(false);
      pushSuccess('Инвайт успешно изменён');
      onSubmit();
    };

    return (
      <InviteEventForm
        initialValues={initialValues}
        handleSubmit={handleSubmit}
      />
    );
  },
);
