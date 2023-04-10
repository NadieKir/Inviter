import { City, Event } from "models";

export enum EventFormFields {
    Name = 'name',
    Description = 'description',
    City = 'city',
    Address = 'address',
    Date = 'date',
    Time = 'time',
    Image = 'image',
    Url = 'url',
};

export type RequiredEventFields = {
    [EventFormFields.Name]: string,
    [EventFormFields.Description]: string,
    [EventFormFields.City]: City | null,
    [EventFormFields.Address]: string,
    [EventFormFields.Date]: string,
    [EventFormFields.Time]: string,
}


export type AdditionalEventFields = {
    [EventFormFields.Image]?: string;
    [EventFormFields.Url]?: string;
};

export type EventFormData = RequiredEventFields & AdditionalEventFields;