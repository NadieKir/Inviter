import { observer } from 'mobx-react-lite';
import { FormikHelpers } from 'formik';

import {
  AdditionalEventFields,
  EventFormData,
  EventFormFields,
  RequiredEventFields,
  createOption,
} from 'types';
import { usePushNotification } from 'common/hooks';
import { Event } from 'models';

import { EventForm } from '../EventForm';
import { CreateOrEditEventFormProps } from './types';
import { updateEvent } from 'api';
import { httpClient } from 'api/httpClient';

type EditEventFormProps = CreateOrEditEventFormProps & {
  event: Event;
}

export const EditEventForm = observer(({
  onSubmit,
  event,
}: EditEventFormProps) => {
  const { pushSuccess } = usePushNotification();

  const initialValuesRequiredStep: RequiredEventFields = {
    [EventFormFields.Name]: event.name,
    [EventFormFields.Description]: event.description,
    [EventFormFields.Type]: createOption(event.type),
    [EventFormFields.City]: createOption(event.city),
    [EventFormFields.Address]: event.address,
    [EventFormFields.Date]: event.date,
    [EventFormFields.Time]: new Date(`${event.date} ${event.time}`)
  };

  const initialValuesAdditionalStep: AdditionalEventFields = {
    [EventFormFields.Image]: event.image,
    [EventFormFields.Url]: event.url,
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

    await updateEvent(event._id, resultValues);

    actions.setSubmitting(false);
    pushSuccess('Событие успешно обновлено');
    onSubmit();
  };

  return (
    <EventForm
      initialValuesRequiredStep={initialValuesRequiredStep}
      initialValuesAdditionalStep={initialValuesAdditionalStep}
      handleSubmit={handleSubmit}
      formHeading='Редактировать событие'
      formSubmitButtonTitle='Редактировать'
      touchedNotRequired
    />
  );
},
);
