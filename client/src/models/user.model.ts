export enum Gender {
  MALE = 'Мужской',
  FEMALE = 'Женский',
}

export enum City {
  MINSK = 'Минск',
  BREST = 'Брест',
  GRODNO = 'Гродно',
  MOGILEV = 'Могилев',
  VITEBSK = 'Витебск',
  GOMEL = 'Гомель',
  NOVOPOLOTSK = 'Новополоцк',
  BARANOVICHI = 'Барановичи',
  BORISOV = 'Борисов',
  ORSHA = 'Орша',
  LIDA = 'Лида',
  PINSK = 'Пинск',
  MOZYR = 'Мозырь',
  SMORGON = 'Сморгонь',
  RECHKUNY = 'Речкуны',
  VILEIKA = 'Вилейка',
  POLONKA = 'Полонка',
  ZASLAVL = 'Заславль',
  ZHLOBIN = 'Жлобин',
  BOBRUISK = 'Бобруйск',
  LUNINETS = 'Лунинец',
  SHKLOU = 'Шклов',
  KRASNOPOL = 'Краснополь',
  SMOLEVICHI = 'Смолевичи',
  MALADZECNA = 'Молодечно',
  ZHODINO = 'Жодино',
  KALINKOVICHI = 'Калинковичи',
  STOLBTSY = 'Столбцы',
  LAGOYSK = 'Логойск',
  KOBRYN = 'Кобрин',
  SOLIGORSK = 'Солигорск',
  DOKSICY = 'Докшицы',
  VALOZHYN = 'Воложин',
  BYAROZA = 'Береза',
  KRYCHAU = 'Кричев',
  RAGACHOU = 'Рогачев',
  SALIHORSK = 'Солигорск',
  PRUZHANY = 'Пружаны',
  SLONIM = 'Слоним',
  SLUTSK = 'Слуцк',
  TUROV = 'Туров',
  VOLKOVYSK = 'Волковыск',
  ASMIANY = 'Ошмяны',
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
  ENGLISH = 'Английский',
  FRENCH = 'Французский',
  SPANISH = 'Испанский',
  ITALIAN = 'Итальянский',
  PORTUGUESE = 'Португальский',
  JAPANESE = 'Японский',
  CHINESE = 'Китайский',
  KOREAN = 'Корейский',
  ARABIC = 'Арабский',
  HINDI = 'Хинди',      
}

export enum Interests {
  MOVIES = 'Кино',
  SERIES = 'Сериалы',
  ART = 'Исскуство',
  MUSIC = 'Музыка',
  TRAVEL = 'Путешествия',
  BOOKS = 'Книги',
  READING = 'Чтение',
  WRITING = 'Писательство',
  SPORTS = 'Спорт',
  PHOTOGRAPHY = 'Фотография',
  TRAVELING = 'Путешествия',
  COOKING = 'Кулинария',
  GAMING = 'Игры',
  DANCING = 'Танцы',
  FISHING = 'Рыбалка',
  HIKING = 'Походы в горы',
  GARDENING = 'Садоводство',
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

export type UserWithToken = User & { token: string };
export type MockedUser = Partial<User>;