import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { FormikHelpers } from 'formik';

import { InviteType } from 'models';
import {
  AdditionalInviteFields,
  InviteFormData,
  InviteFormFields,
  RequiredInviteFields,
  createOption,
} from 'types';
import { InviteForm } from 'forms';
import { createInvite } from 'api';
import { UserContext } from 'common/contexts';
import { CreateOrEditInviteFormProps } from './types';
import { usePushNotification } from 'common/hooks';

export const CreateInviteForm = observer(
  ({ onSubmit }: CreateOrEditInviteFormProps) => {
    const { pushSuccess, pushError } = usePushNotification();
    const { user } = useContext(UserContext);

    if (!user) {
      return null;
    }

    const initialValuesRequiredStep: RequiredInviteFields = {
      [InviteFormFields.Subject]: '',
      [InviteFormFields.Description]: '',
      [InviteFormFields.City]: createOption(user?.city),
      [InviteFormFields.Type]: createOption(InviteType.ENTERTAINMENT),
    };

    const initialValuesAdditionalStep: AdditionalInviteFields = {
      [InviteFormFields.Address]: '',
      [InviteFormFields.Date]: '',
      [InviteFormFields.Time]: '',
      [InviteFormFields.CompanionAge]: '',
      [InviteFormFields.CompanionGender]: [],
    };

    const handleSubmit = async (
      values: InviteFormData,
      actions: FormikHelpers<InviteFormData>,
    ) => {
      try {
        await createInvite(values);
        pushSuccess(
          'Инвайт успешно создан',
          'Не забывайте проверять вкладку "Мои инвайты" для подбора компании',
        );
        onSubmit();
      } catch (error) {
        console.log(error);
        pushError('Инвайт не был создан');
      } finally {
        actions.setSubmitting(false);
      }
    };

    return (
      <InviteForm
        initialValuesRequiredStep={initialValuesRequiredStep}
        initialValuesAdditionalStep={initialValuesAdditionalStep}
        handleSubmit={handleSubmit}
      />
    );
  },
);
