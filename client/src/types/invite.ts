import { City, Gender, InviteType } from "models";
import { SelectOption } from "./options";

export enum InviteFormFields {
  Subject = 'subject',
  Description = 'description',
  City = 'city',
  Type = 'type',
  Address = 'address',
  Date = 'date',
  Time = 'time',
  CompanionAge = 'companionAge',
  CompanionGender = 'companionGender',
};

export enum InviteRespondFormFields {
  Message = 'message',
};

export type RequiredInviteFields = {
  [InviteFormFields.Subject]: string;
  [InviteFormFields.Description]: string;
  [InviteFormFields.City]: City | SelectOption<City> | null;
  [InviteFormFields.Type]: InviteType | SelectOption<InviteType> | null;
};

export type AdditionalInviteFields = {
  [InviteFormFields.Address]: string | undefined;
  [InviteFormFields.Date]: Date | string | undefined;
  [InviteFormFields.Time]: Date | string | undefined;
  [InviteFormFields.CompanionAge]: string | undefined;
  [InviteFormFields.CompanionGender]: Gender[]
};

export type InviteFormData = RequiredInviteFields & AdditionalInviteFields;

export type InviteRespondFormData = {
  [InviteRespondFormFields.Message]: string | undefined;
};

export type SearchInviteFiltersFormFields = {
  type?: SelectOption<string> | null;
  city?: SelectOption<string> | null;
  keyWord?: string | null;
  date?: string | null;
  gender?: string[] | null;
}

export type SearchInviteFilters = {
  type?: string | null;
  city?: string | null;
  keyWord?: string | null;
  date?: string | null;
  gender?: string[] | null;
}