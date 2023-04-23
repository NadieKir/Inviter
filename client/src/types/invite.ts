import { City, Gender, InviteType, User } from "models";
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
  [InviteFormFields.Date]: string | undefined;
  [InviteFormFields.Time]: string | undefined;
  [InviteFormFields.CompanionAge]: string | undefined;
  [InviteFormFields.CompanionGender]: Gender[]
  [InviteFormFields.CompanionsAmount]: number;
};

export type InviteFormData = RequiredInviteFields & AdditionalInviteFields;

export type InviteRespondFormData = {
  [InviteRespondFormFields.Message]: string | undefined;
};