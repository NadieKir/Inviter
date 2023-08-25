import { observer } from 'mobx-react-lite';
import { FormikHelpers } from 'formik';
import dayjs from 'dayjs';

import { usePushNotification } from 'common/hooks';
import { City, Invite } from 'models';
import {
  AdditionalInviteFields,
  InviteFormData,
  InviteFormFields,
  RequiredInviteFields,
  createOption,
} from 'types';
import { InviteForm } from 'forms';
import { CreateOrEditInviteFormProps } from './types';
import { updateInvite } from 'api';

type EditInviteFormProps = CreateOrEditInviteFormProps & {
  invite: Invite;
};

export const EditInviteForm = observer(
  ({ invite, onSubmit }: EditInviteFormProps) => {
    const { pushSuccess } = usePushNotification();

    const initialValuesRequiredStep: RequiredInviteFields = {
      [InviteFormFields.Subject]: invite.subject,
      [InviteFormFields.Description]: invite.description,
      [InviteFormFields.City]: createOption(invite.city as City),
      [InviteFormFields.Type]: createOption(invite.type),
    };

    const initialValuesAdditionalStep: AdditionalInviteFields = {
      [InviteFormFields.Address]: invite.address,
      [InviteFormFields.Date]: invite.date ?? '',
      [InviteFormFields.Time]:
        invite.date && invite.time
          ? dayjs(new Date(`${invite.date} ${invite.time}`)).format(
              'YYYY-MM-DD HH:mm:ss',
            )
          : '',
      [InviteFormFields.CompanionAge]: invite.companionAge,
      [InviteFormFields.CompanionGender]: invite.companionGender,
    };

    const handleSubmit = async (
      values: InviteFormData,
      actions: FormikHelpers<InviteFormData>,
    ) => {
      const resultValues = {
        event: invite.event,
        ...values,
      };

      await updateInvite(invite._id, resultValues);

      actions.setSubmitting(false);
      pushSuccess('Инвайт успешно изменен');
      onSubmit();
    };

    return (
      <InviteForm
        initialValuesRequiredStep={initialValuesRequiredStep}
        initialValuesAdditionalStep={initialValuesAdditionalStep}
        handleSubmit={handleSubmit}
        touchedNotRequired
        formHeading="Редактирование инвайта"
        formSubmitButtonTitle="Редактировать"
      />
    );
  },
);
