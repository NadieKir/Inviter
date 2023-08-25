import { City, InviteType } from "models";
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
  [EventFormFields.Type]: InviteType | SelectOption<InviteType> | null,
  [EventFormFields.City]: City | SelectOption<City> | null,
  [EventFormFields.Address]: string,
  [EventFormFields.Date]: Date | string,
  [EventFormFields.Time]: Date | string,
}

export type AdditionalEventFields = {
  [EventFormFields.Image]?: string;
  [EventFormFields.Url]?: string;
};

export type EventFormData = RequiredEventFields & AdditionalEventFields;

export type SearchEventFiltersFormFields = {
  type?: SelectOption<string> | null;
  city?: SelectOption<string> | null;
  date?: string | null;
  keyWord?: string | null;
}

export type SearchEventFilters = {
  type?: string | null;
  city?: string | null;
  date?: string | null;
  keyWord?: string | null;
  tabType?: 'current' | 'past' | 'draft' | null;
}