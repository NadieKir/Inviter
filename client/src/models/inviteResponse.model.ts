import { User } from "./user.model";

export interface InviteResponse {
  user: User;
  message?: string;
}