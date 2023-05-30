import { Event } from "./event.model";
import { InviteResponse } from "./inviteResponse.model";
import { Gender, User } from "./user.model";

export enum InviteType {
  SPORT = 'Спорт',
  FOOD = 'Еда',
  ENTERTAINMENT = 'Развлечения',
  TRAVELLING = 'Путешествия',
  HELP = 'Помощь',
  CIRCUS = "Цирк",
  CINEMA = "Кино",
  THEATER = "Театр",
  WALK = "Прогулка",
  OTHER = 'Другое'
}

export enum InviteStatus {
  CREATED = 'Создан',
  CLOSED = 'Закрыт',
  PAST = 'Прошел'
}

export interface Invite {
  _id: string;
  creator: User;
  event?: Event | string | null;
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
  companions: User[];
  responses: InviteResponse[];
}