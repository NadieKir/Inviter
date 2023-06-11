import { observer } from 'mobx-react-lite';
import { FormikHelpers } from 'formik';

import {
  AdditionalEventFields,
  EventFormData,
  EventFormFields,
  RequiredEventFields,
} from 'types';
import { createEvent } from 'api';
import { usePushNotification } from 'common/hooks';
import { EventForm } from '../EventForm';
import { CreateOrEditEventFormProps } from './types';
import { httpClient } from 'api/httpClient';

export const CreateEventForm = observer(
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
      [EventFormFields.Image]: '',
      [EventFormFields.Url]: undefined,
    };

    const handleSubmit = async (
      values: EventFormData,
      actions: FormikHelpers<EventFormData>,
    ) => {

      let resultValues = {
        ...values
      };

      if (values[EventFormFields.Image] && typeof values[EventFormFields.Image] !== 'string') {
        const { data } = await httpClient.post(
          '/uploads',
          values[EventFormFields.Image],
        );

        resultValues = {
          ...values,
          [EventFormFields.Image]: data.url,
        };
      }

      await createEvent(resultValues);

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
