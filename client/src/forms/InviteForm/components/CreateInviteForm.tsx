import { observer, useLocalObservable } from 'mobx-react-lite';
import { FormikHelpers } from 'formik';
import { useContext } from 'react';

import { City, InviteType } from 'models';
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


export const CreateInviteForm = observer(
  ({ onSubmit }: CreateOrEditInviteFormProps) => {
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
        onSubmit();
      } catch (error) {
        console.log(error);
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
