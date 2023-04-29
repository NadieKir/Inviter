import { Attitude, City, FamilyStatus, Gender, Interests, Language, Orientation, Role, User } from "./user.model";
import { Invite, InviteType } from "models";
import { getRandomItem } from "common/helpers";

export const mockedUsers: User[] = [
  {
    _id: "1",
    role: Role.USER,
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "Андрей",
    birthday: "1990-01-01",
    login: "andrew034",
    email: "andrew034@gmail.com",
    password: "andrew_password",
    city: City.MINKS,
    gender: Gender.MALE,
    orientation: Orientation.HETEROSEXUAL,
    familyStatus: FamilyStatus.SINGLE,
    alcoholAttitude: Attitude.NEUTRAL,
    smokingAttitude: Attitude.NEGATIVE,
    languages: [Language.RUSSIAN, Language.ENGLISH],
    interests: [Interests.MOVIES, Interests.MUSIC, Interests.TRAVEL],
    welcomeMessage: "Привет, давай поговорим и посмотрим, что получится :)",
    connectionMethods: "Skype, Whatsapp",
    preferredAge: "20-30",
  },
  {
    _id: "2",
    role: Role.USER,
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    name: "Александра",
    birthday: "1995-05-05",
    login: "alex_95",
    email: "alex_95@gmail.com",
    password: "alex_password",
    city: City.GRODNO,
    gender: Gender.FEMALE,
    orientation: Orientation.HOMOSEXUAL,
    familyStatus: FamilyStatus.SINGLE,
    alcoholAttitude: Attitude.NEGATIVE,
    smokingAttitude: Attitude.POSITIVE,
    languages: [Language.RUSSIAN, Language.UKRAINIAN],
    interests: [Interests.BOOKS, Interests.ART],
    welcomeMessage: "Привет, я ищу серьезные отношения",
    connectionMethods: "Viber, Telegram",
    preferredAge: "25-35",
  },
  {
    _id: "3",
    role: Role.USER,
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    name: "Алексей",
    birthday: "1987-08-08",
    login: "alex87",
    email: "alex87@gmail.com",
    password: "alex_password",
    city: City.MOGILEV,
    gender: Gender.MALE,
    orientation: Orientation.ASEXUAL,
    familyStatus: FamilyStatus.SINGLE,
    alcoholAttitude: Attitude.POSITIVE,
    smokingAttitude: Attitude.NEUTRAL,
    languages: [Language.RUSSIAN],
    interests: [Interests.MOVIES, Interests.MUSIC],
    welcomeMessage: "Привет, я ищу собеседника для общения",
    connectionMethods: "Instagram, Snapchat",
    preferredAge: "18-25",
  },
  {
    _id: "4",
    role: Role.USER,
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    name: "Екатерина",
    birthday: "1993-03-03",
    login: "katya_93",
    email: "katya_93@gmail.com",
    password: "katya_password",
    city: City.BREST,
    gender: Gender.FEMALE,
    orientation: Orientation.HETEROSEXUAL,
    familyStatus: FamilyStatus.IN_RELATIONSHIP,
    alcoholAttitude: Attitude.NEUTRAL,
    smokingAttitude: Attitude.NEUTRAL,
    languages: [Language.RUSSIAN, Language.ENGLISH],
    interests: [Interests.MOVIES, Interests.SERIES, Interests.BOOKS],
    welcomeMessage: "Привет, я ищу новых друзей",
    connectionMethods: "Facebook, Whatsapp",
    preferredAge: "20-30",
  },
  {
    _id: "5",
    role: Role.USER,
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    name: "Влад",
    birthday: "1992-02-02",
    login: "vlad92",
    email: "vlad92@gmail.com",
    password: "vlad_password",
    city: City.GRODNO,
    gender: Gender.MALE,
    orientation: Orientation.BISEXUAL,
    familyStatus: FamilyStatus.DIVORCED,
    alcoholAttitude: Attitude.POSITIVE,
    smokingAttitude: Attitude.NEGATIVE,
    languages: [Language.RUSSIAN, Language.BELARUSIAN],
    interests: [Interests.ART, Interests.MUSIC, Interests.TRAVEL],
    welcomeMessage: "Привет, я ищу жизнерадостную компанию для общения",
    connectionMethods: "Skype, Telegram",
    preferredAge: "20-40",
  },
];

export const mockedInvites: Invite[] = [
  {
    _id: "invite1",
    creator: getRandomItem(mockedUsers),
    subject: "Coffee talk",
    description: "Let's catch up over some coffee and croissants!",
    city: "San Francisco",
    type: InviteType.FOOD,
    address: "123 Main St",
    date: "2022-02-01",
    time: "10:00",
    companionAge: "19-30",
    companionGender: [Gender.FEMALE],
    companionsAmount: 2,
    companions: mockedUsers.filter(u => Math.floor(Math.random() * 2) < (2 / 2)).slice(0, 1),
    responses: []
    // responses: mockedUsers.filter(u => Math.floor(Math.random() * 2) < (2 / 2)).slice(0, 1).map(u => ({ user: u, message: 'Go. Go' }))
  },
  {
    _id: "invite2",
    creator: getRandomItem(mockedUsers),
    subject: "Movie night",
    description: "Let's watch some classic movies and have some popcorn!",
    city: "Los Angeles",
    type: InviteType.ENTERTAINMENT,
    address: "456 Hollywood Blvd",
    date: "2022-02-14",
    time: "",
    companionAge: "25-50",
    companionGender: [Gender.MALE, Gender.FEMALE],
    companionsAmount: 4,
    companions: mockedUsers.filter(u => Math.floor(Math.random() * 4) < (4 / 2)).slice(0, 3),
    responses: []
  },
  {
    _id: "invite3",
    creator: getRandomItem(mockedUsers),
    subject: "Hiking adventure",
    description: "Let's explore the beautiful trails and views of Yosemite!",
    city: "Fresno",
    type: InviteType.SPORT,
    address: "789 Yosemite Rd",
    date: "2022-03-01",
    time: "08:00",
    companionAge: "18-45",
    companionGender: [Gender.MALE, Gender.FEMALE],
    companionsAmount: 3,
    companions: mockedUsers.filter(u => Math.floor(Math.random() * 3) < (3 / 2)).slice(0, 2),
    responses: []
    // responses: mockedUsers.filter(u => Math.floor(Math.random() * 2) < (2 / 2)).slice(0, 3).map(u => ({ user: u, message: 'SfSDFASDFASD ASDFASD ASDF AADFSAD ADSF ADFA DSA SDFASD' }))
  },
  {
    _id: "invite4",
    creator: getRandomItem(mockedUsers),
    subject: "Sushi dinner",
    description: "Let's enjoy some delicious sushi rolls and sashimi together!",
    city: "San Francisco",
    type: InviteType.FOOD,
    address: "456 Geary St",
    date: "2022-02-22",
    time: "19:30",
    companionAge: "21-35",
    companionGender: [Gender.FEMALE],
    companionsAmount: 1,
    companions: mockedUsers.filter(u => Math.floor(Math.random() * 1) < (1 / 2)).slice(0, 1),
    responses: []
  },
  {
    _id: "invite5",
    creator: getRandomItem(mockedUsers),
    subject: "Beach day",
    description: "Let's soak up some sun and play some volleyball on the beach!",
    city: "Santa Monica",
    type: InviteType.TRAVELLING,
    address: "123 Beach Blvd",
    date: "2022-04-01",
    time: "10:00",
    companionAge: "18-40",
    companionGender: [Gender.MALE, Gender.FEMALE],
    companionsAmount: 5,
    companions: mockedUsers.filter(u => Math.floor(Math.random() * 5) < (5 / 2)).slice(0, 4),
    responses: []
  },
];
