import { Event, Gender } from "models";

export enum InviteEventFormFields {
  Subject = 'subject',
  Description = 'description',
  CompanionAge = 'companionAge',
  CompanionGender = 'companionGender',
};

export type InviteEventFields = {
  [InviteEventFormFields.Subject]: string;
  [InviteEventFormFields.Description]: string;
  [InviteEventFormFields.CompanionAge]: string | undefined;
  [InviteEventFormFields.CompanionGender]: Gender[]
};

export type InviteEventFormData = {
  event: Event;
  info: InviteEventFields;
}
