import { InviteResponse } from "./inviteResponse.model";
import { Gender, User } from "./user.model";

export enum InviteType {
  SPORT = 'Спорт',
  FOOD = 'Еда',
  ENTERTAINMENT = 'Развлечения',
  TRAVELLING = 'Путешествия',
  HELP = 'Помощь',
  CINEMA = 'Кино',
  OTHER = 'Другое'
}

export interface Invite {
  id: string;
  creator: User;
  subject: string;
  description: string;
  city: string;
  type: InviteType;
  address?: string;
  date?: string;
  time?: string;
  companionAge?: string;
  companionGender: Gender[];
  companionsAmount: number;
  companions?: User[];
  responses?: InviteResponse[];
}