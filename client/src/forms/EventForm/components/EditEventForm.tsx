import { observer } from 'mobx-react-lite';
import { FormikHelpers } from 'formik';

import {
  AdditionalEventFields,
  EventFormData,
  EventFormFields,
  RequiredEventFields,
} from 'types';
import { usePushNotification } from 'common/hooks';

import { EventForm } from '../EventForm';
import { CreateOrEditEventFormProps } from './types';

export const EditEventForm = observer(
  ({ onSubmit }: CreateOrEditEventFormProps) => {
    const { pushSuccess } = usePushNotification();

    const initialValuesRequiredStep: RequiredEventFields = {
      [EventFormFields.Name]: '',
      [EventFormFields.Description]: '',
      [EventFormFields.Type]: null,
      [EventFormFields.City]: null,
      [EventFormFields.Address]: '',
      [EventFormFields.Date]: '',
      [EventFormFields.Time]: '',
    };

    const initialValuesAdditionalStep: AdditionalEventFields = {
      [EventFormFields.Image]: undefined,
      [EventFormFields.Url]: undefined,
    };

    const handleSubmit = async (
      values: EventFormData,
      actions: FormikHelpers<EventFormData>,
    ) => {
      //await createEvent(values);

      actions.setSubmitting(false);
      pushSuccess('Событие успешно создано');
      onSubmit();
    };

    return (
      <EventForm
        initialValuesRequiredStep={initialValuesRequiredStep}
        initialValuesAdditionalStep={initialValuesAdditionalStep}
        handleSubmit={handleSubmit}
      />
    );
  },
);
