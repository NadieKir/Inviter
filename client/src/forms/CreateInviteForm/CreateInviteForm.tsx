import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { usePushNotification } from 'common/hooks';
import { InviteType } from 'models';
import {
  AdditionalInviteFields,
  InviteFormData,
  RequiredInviteFields,
} from 'types';
import { FormikHelpers } from 'formik';
import { InviteForm } from 'forms';

export const CreateInviteForm = observer(() => {
  const navigate = useNavigate();
  const { pushSuccess } = usePushNotification();

  // const userStore = useContext(UserContext);
  // const { meetup, isLoading, error, publishMeetup } = useLocalObservable(
  //   () => new MeetupStore(id!, userStore),
  // );

  // if (isLoading) return <FormattedMessage id="loading" />;
  // if (!meetup) throw error;

  const initialValuesRequiredStep: RequiredInviteFields = {
    subject: '',
    description: '',
    city: '',
    type: InviteType.ENTERTAINMENT,
  };

  const initialValuesAdditionalStep: AdditionalInviteFields = {
    place: '',
    date: '',
    time: '',
    companionAge: '',
    companionGender: [],
    companionsAmount: 1,
  };

  const handleSubmit = async (
    values: InviteFormData,
    actions: FormikHelpers<InviteFormData>,
  ) => {
    //await publishMeetup(values);
    alert(JSON.stringify(values));

    actions.setSubmitting(false);
    pushSuccess('Инвайт создан');
    //close modal
  };

  return (
    <InviteForm
      initialValuesRequiredStep={initialValuesRequiredStep}
      initialValuesAdditionalStep={initialValuesAdditionalStep}
      handleSubmit={handleSubmit}
    />
  );
});
