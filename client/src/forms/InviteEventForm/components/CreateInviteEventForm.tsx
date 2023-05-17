import { observer } from 'mobx-react-lite';
import { FormikHelpers } from 'formik';

import { InviteEventFields, InviteEventFormFields } from 'types/inviteEvent';
import { usePushNotification } from 'common/hooks';

import { CreateOrEditInviteEventFormProps } from './types';
import { InviteEventForm } from '../InviteEventForm';
import { InvitePayload, createInvite } from 'api';
import { InviteFormData } from 'types';

export const CreateInviteEventForm = observer(
  ({ event, onSubmit }: CreateOrEditInviteEventFormProps) => {
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
      const invite: InvitePayload = {
        subject: event.name,
        description: values.description,
        eventId: event._id,
        type: event.type,
        city: event.city,
        address: event.address,
        date: event.date,
        time: event.time,
        companionAge: values.companionAge,
        companionGender: values.companionGender,
      };

      await createInvite(invite);

      actions.setSubmitting(false);
      pushSuccess('Инвайт успешно создан');
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
