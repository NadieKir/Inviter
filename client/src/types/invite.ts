import { Invite } from "models/invite";

export type RequiredInviteFields = Pick<
  Invite,
  'subject' | 'description' | 'city' | 'type'
>;

export type AdditionalInviteFields = Pick<
  Invite,
  'place' | 'date' | 'time' | 'companionAge' | 'companionGender' | 'companionsAmount' 
>;

export type InviteFormData = RequiredInviteFields & AdditionalInviteFields;