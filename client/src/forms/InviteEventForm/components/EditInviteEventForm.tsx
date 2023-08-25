import { observer } from 'mobx-react-lite';
import { FormikHelpers } from 'formik';

import { usePushNotification } from 'common/hooks';
import { InviteEventFields, InviteEventFormFields } from 'types/inviteEvent';

import { CreateOrEditInviteEventFormProps } from './types';
import { InviteEventForm } from '../InviteEventForm';
import { Invite } from 'models';
import { InvitePayload, updateInvite } from 'api';

type EditInviteEventFormProps = CreateOrEditInviteEventFormProps & {
  invite: Invite;
}

export const EditInviteEventForm = observer(({
  invite,
  event,
  onSubmit
}: EditInviteEventFormProps) => {
  const { pushSuccess } = usePushNotification();

  const initialValues: InviteEventFields = {
    [InviteEventFormFields.Subject]: '',
    [InviteEventFormFields.Description]: invite.description,
    [InviteEventFormFields.CompanionAge]: invite.companionAge,
    [InviteEventFormFields.CompanionGender]: invite.companionGender,
  };

  const handleSubmit = async (
    values: InviteEventFields,
    actions: FormikHelpers<InviteEventFields>,
  ) => {

    const updateInvitePayload: InvitePayload = {
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

    await updateInvite(invite._id, updateInvitePayload);

    actions.setSubmitting(false);
    pushSuccess('Инвайт успешно обновлен');
    onSubmit();
  };

  return (
    <InviteEventForm
      initialValues={initialValues}
      handleSubmit={handleSubmit}
      formSubmitLabel='Редактировать'
    />
  );
},
);
