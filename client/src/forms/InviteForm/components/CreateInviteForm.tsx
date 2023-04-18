import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { FormikHelpers } from 'formik';

import { usePushNotification } from 'common/hooks';
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
    const navigate = useNavigate();

    // const userStore = useContext(UserContext);
    // const { meetup, isLoading, error, publishMeetup } = useLocalObservable(
    //   () => new MeetupStore(id!, userStore),
    // );

    // if (isLoading) return <FormattedMessage id="loading" />;
    // if (!meetup) throw error;

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
