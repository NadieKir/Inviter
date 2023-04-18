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
  subject: string;
  description: string;
  creator: User;
  city: string;
  type: InviteType;
  address?: string;
  date?: string;
  time?: string;
  companionAge?: string;
  companionGender?: Gender[];
  companionsAmount?: number;
}