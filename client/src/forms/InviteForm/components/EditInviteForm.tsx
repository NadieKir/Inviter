import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { usePushNotification } from 'common/hooks';
import { City, InviteType } from 'models';
import {
  AdditionalInviteFields,
  InviteFormData,
  InviteFormFields,
  RequiredInviteFields,
} from 'types';
import { FormikHelpers } from 'formik';
import { InviteForm } from 'forms';
import { CreateOrEditInviteFormProps } from './types';

export const EditInviteForm = observer(
  ({ onSubmit }: CreateOrEditInviteFormProps) => {
    const navigate = useNavigate();
    const { pushSuccess } = usePushNotification();

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
      // [InviteFormFields.CompanionsAmount]: 1,
    };

    const handleSubmit = async (
      values: InviteFormData,
      actions: FormikHelpers<InviteFormData>,
    ) => {
      //await publishMeetup(values);
      alert(JSON.stringify(values));

      actions.setSubmitting(false);
      pushSuccess('Инвайт успешно создан');
      onSubmit();
      //close modal
    };

    return (
      <InviteForm
        initialValuesRequiredStep={initialValuesRequiredStep}
        initialValuesAdditionalStep={initialValuesAdditionalStep}
        handleSubmit={handleSubmit}
        touchedNotRequired
      />
    );
  },
);
