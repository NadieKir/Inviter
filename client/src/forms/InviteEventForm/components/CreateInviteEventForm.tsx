import { observer } from 'mobx-react-lite';
import { FormikHelpers } from 'formik';

import { InviteEventFields, InviteEventFormFields } from 'types';
import { usePushNotification } from 'common/hooks';
import { InvitePayload, createInvite } from 'api';

import { CreateOrEditInviteEventFormProps } from './types';
import { InviteEventForm } from '../InviteEventForm';

export const CreateInviteEventForm = observer(
  ({ event, onSubmit }: CreateOrEditInviteEventFormProps) => {
    const { pushSuccess, pushError } = usePushNotification();

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
        companionAge: values.companionAge || undefined,
        companionGender: values.companionGender,
      };

      try {
        await createInvite(invite);
        pushSuccess(
          'Инвайт на это событие успешно создан',
          'Не забывайте проверять вкладку "Мои инвайты" для подбора компании',
        );
      } catch (e) {
        console.log(e);
        pushError('При создании инвайта произошла ошибка');
      } finally {
        actions.setSubmitting(false);
        onSubmit();
      }
    };

    return (
      <InviteEventForm
        initialValues={initialValues}
        handleSubmit={handleSubmit}
      />
    );
  },
);
