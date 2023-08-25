import { Event } from "models";

export interface CreateOrEditInviteEventFormProps {
    event: Event;
    onSubmit: () => void;
} 