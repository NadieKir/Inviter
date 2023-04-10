import { Invite } from "models";

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

export type RequiredInviteFields = Pick<
  Invite,
  InviteFormFields.Subject
  | InviteFormFields.Description
  | InviteFormFields.City
  | InviteFormFields.Type
>;

export type AdditionalInviteFields = Pick<
  Invite,
  InviteFormFields.Address
  | InviteFormFields.Date
  | InviteFormFields.Time
  | InviteFormFields.CompanionAge
  | InviteFormFields.CompanionGender
  | InviteFormFields.CompanionsAmount
>;

export type InviteFormData = RequiredInviteFields & AdditionalInviteFields;