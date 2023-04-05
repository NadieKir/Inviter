import { Gender } from "./user.model";

export enum InviteType {
  SPORT = 'Спорт',
  FOOD = 'Еда',
  ENTERTAINMENT = 'Развлечения',
  TRAVELLING = 'Путешествия',
  HELP = 'Помощь',
  OTHER = 'Другое'
}

export interface Invite {
  id: string;
  modified: string;
  creatorId: string;
  subject: string;
  description: string;
  city: string;
  type: InviteType;
  place?: string;
  date?: string;
  time?: string;
  companionAge?: string;
  companionGender?: Gender[];
  companionsAmount?: number;
}