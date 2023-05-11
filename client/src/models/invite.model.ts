import { Event } from "./event.model";
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

export enum InviteStatus {
  CONFIRMED = 'Утверждённые',
  PAST = 'Прошедшие',
}

export interface Invite {
  _id: string;
  creator: User;
  event?: Event | null;
  subject: string;
  description: string;
  status?: InviteStatus,
  city: string;
  type: InviteType;
  address?: string;
  date?: string;
  time?: string;
  companionAge?: string;
  companionGender: Gender[];
  // companionsAmount: number;
  companions: User[];
  responses: InviteResponse[];
}