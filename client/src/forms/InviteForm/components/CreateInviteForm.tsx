import { observer, useLocalObservable } from 'mobx-react-lite';
import { FormikHelpers } from 'formik';

import { City, InviteType } from 'models';
import {
  AdditionalInviteFields,
  InviteFormData,
  InviteFormFields,
  RequiredInviteFields,
  SelectOption,
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
      alert(JSON.stringify(values));

      const resultValues: InviteFormData = {
        ...values,
        [InviteFormFields.City]: (
          values[InviteFormFields.City] as SelectOption<City>
        ).value,
        [InviteFormFields.Type]: (
          values[InviteFormFields.Type] as SelectOption<InviteType>
        ).value,
      };

      try {
        await createInvite(resultValues);
        onSubmit();
      } catch (error) {
        console.log(error);
      } finally {
        actions.setSubmitting(false);
      }
      //await publishMeetup(values);
      // alert(JSON.stringify(values));

      // actions.setSubmitting(false);

      // onSubmit();
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
