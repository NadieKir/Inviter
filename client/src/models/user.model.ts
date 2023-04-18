export enum Gender {
  MALE = 'Мужской',
  FEMALE = 'Женский',
}

export enum City {
  MINKS = 'Минск',
  BREST = 'Брест',
  GRODNO = 'Гродно',
  MOGILEV = 'Могилев'
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

export enum Attitude {
  NOT_SPECIFIED = 'Не указано',
  STRONGLY_NEGATIVE = 'Резко негативное',
  NEGATIVE = 'Негативное',
  COMPROMISE = 'Компромисное',
  NEUTRAL = 'Нейтральное',
  POSITIVE = 'Позитивное',
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

export enum Role {
  ADMIN = 'Администратор',
  USER = 'Пользователь'
}

export interface User {
  _id: string;
  role: Role;
  image: string;
  name: string;
  birthday: string;
  login: string;
  email: string;
  password: string;
  city: City;
  gender: Gender;
  orientation: Orientation;
  familyStatus: FamilyStatus;
  alcoholAttitude: Attitude;
  smokingAttitude: Attitude;
  languages: Language[];
  interests: Interests[];
  welcomeMessage: string;
  connectionMethods: string;
  preferredAge: string;
}

export type UserWithToken = User & {token : string};
export type MockedUser = Partial<User>;