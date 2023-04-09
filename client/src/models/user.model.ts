export enum Gender {
  MALE = 'Мужской',
  FEMALE = 'Женский',
}

export enum Orientation {
  HETEROSEXUAL = 'Гетеросексуал',
  HOMOSEXUAL = 'Гомосексуал',
  BISEXUAL = 'Бисексуал',
  ASEXUAL = 'Асексуал',
  OTHER = 'Другое'
}

export enum FamilyStatus {
  SINGLE = 'Одинок(-а)',
  IN_RELATIONSHIP = 'В отношениях',
  MARRIED = 'Женат / замужем',
  DIVORCED = 'Разведён(-а)',
  WIDOWER_WIDOW = 'Вдовец / вдова'
}

export enum Language {
  RUSSIAN = 'Русский',
  BELARUSIAN = 'Белорусский',
  UKRAINIAN = 'Украинский',
  GERMAN = 'Немецкий',
  ENGLISH = 'Английский'
}

export enum Interests {
  MOVIES = 'Кино',
  SERIES = 'Сериалы',
  ART = 'Исскуство',
  MUSIC = 'Музыка',
  TRAVEL = 'Путешествия',
  BOOKS = 'Книги',
}

export interface User {
  id: string;
  name: string;
  birthday: string;
  login: string;
  email: string;
  phone: string;
  password: string;
  city: string;
  gender: Gender;
  orientation: Orientation;
  familyStatus: FamilyStatus;
  alcoholAttitude: boolean;
  smokingAttitude: boolean;
  languages: string[];
  interests: string[];
  welcomeMessage: string;
  connectionMethods: string;
  preferredAge: string;
}

export type MockedUser = Partial<User>;