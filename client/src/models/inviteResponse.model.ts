import { Event } from "./event.model";
import { Invite } from "./invite.model";
import { User } from "./user.model";

export interface InviteResponse {
  _id: string;
  user: User;
  invite: Invite;
  message: string;
}

export interface InviteEventResponse {
  event: Event;
  inviters: Invite[];
}