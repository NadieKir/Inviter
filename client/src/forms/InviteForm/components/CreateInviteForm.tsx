import { observer, useLocalObservable } from 'mobx-react-lite';
import { FormikHelpers } from 'formik';

import { City, InviteType } from 'models';
import {
  AdditionalInviteFields,
  InviteFormData,
  InviteFormFields,
  RequiredInviteFields,
} from 'types';
import { InviteForm } from 'forms';
import { CreateOrEditInviteFormProps } from './types';
import { createInvite } from 'api';

export const CreateInviteForm = observer(
  ({ onSubmit }: CreateOrEditInviteFormProps) => {
    const initialValuesRequiredStep: RequiredInviteFields = {
      [InviteFormFields.Subject]: '',
      [InviteFormFields.Description]: '',
      [InviteFormFields.City]: City.BREST,
      [InviteFormFields.Type]: InviteType.ENTERTAINMENT,
    };

    const initialValuesAdditionalStep: AdditionalInviteFields = {
      [InviteFormFields.Address]: '',
      [InviteFormFields.Date]: '',
      [InviteFormFields.Time]: '',
      [InviteFormFields.CompanionAge]: '',
      [InviteFormFields.CompanionGender]: [],
      [InviteFormFields.CompanionsAmount]: 1,
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
