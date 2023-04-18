import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";
import { FormikHelpers } from "formik";

import { AdditionalEventFields, EventFormData, EventFormFields, RequiredEventFields } from "types";
import { usePushNotification } from "common/hooks";

import { EventForm } from "../EventForm";
import { CreateOrEditEventFormProps } from "./types";


export const EditEventForm = observer(({
    onSubmit,
}: CreateOrEditEventFormProps) => {
    const navigate = useNavigate();
    const { pushSuccess } = usePushNotification();

    // const userStore = useContext(UserContext);
    // const { meetup, isLoading, error, publishMeetup } = useLocalObservable(
    //   () => new MeetupStore(id!, userStore),
    // );

    // if (isLoading) return <FormattedMessage id="loading" />;
    // if (!meetup) throw error;

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
        //await publishMeetup(values);
        alert(JSON.stringify(values));

        actions.setSubmitting(false);
        pushSuccess('Событие создано');
        onSubmit();
    };

    return (
        <EventForm
            initialValuesRequiredStep={initialValuesRequiredStep}
            initialValuesAdditionalStep={initialValuesAdditionalStep}
            handleSubmit={handleSubmit}
        />
    );
});