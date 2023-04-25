import { Invite } from "./invite.model";
import { User } from "./user.model";

export interface InviteResponse {
  user: User;
  invite: Invite;
  message: string;
}
