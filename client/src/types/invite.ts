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
  CompanionsAmount = 'companionsAmount',
};

export type RequiredInviteFields = {
  [InviteFormFields.Subject]: string;
  [InviteFormFields.Description]: string;
  [InviteFormFields.City]: City | SelectOption<City> | null;
  [InviteFormFields.Type]: InviteType | SelectOption<InviteType> | null;
};


export type AdditionalInviteFields = {
  [InviteFormFields.Address]: string;
  [InviteFormFields.Date]: string;
  [InviteFormFields.Time]: string;
  [InviteFormFields.CompanionAge]: string;
  [InviteFormFields.CompanionGender]: Gender[];
  [InviteFormFields.CompanionsAmount]: number;
};

export type InviteFormData = RequiredInviteFields & AdditionalInviteFields;