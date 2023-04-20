import { City, EventType } from "models";
import { SelectOption } from "./options";

export enum EventFormFields {
  Name = 'name',
  Description = 'description',
  Type = 'type',
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
  [EventFormFields.Type]: EventType | SelectOption<EventType> | null,
  [EventFormFields.City]: City | SelectOption<City> | null,
  [EventFormFields.Address]: string,
  [EventFormFields.Date]: string,
  [EventFormFields.Time]: string,
}

export type AdditionalEventFields = {
  [EventFormFields.Image]?: string;
  [EventFormFields.Url]?: string;
};

export type EventFormData = RequiredEventFields & AdditionalEventFields;