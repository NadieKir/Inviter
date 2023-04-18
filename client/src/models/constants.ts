import { getEnumMembers } from "common/helpers/getEnumMembers";
import { SelectOption } from "types/other";
import { Invite, InviteType } from "models";

import { Attitude, City, FamilyStatus, Gender, Interests, Language, Orientation, Role, User } from "./user.model";
import { EventType } from "./event.model";
import { getRandomItem } from "common/helpers/getRandomElement";


function createOption<T extends string>(o: T): SelectOption<T> {
    return ({ value: o, label: o })
};

export const GENDERS = getEnumMembers(Gender);
export const GENDERS_OPTIONS = GENDERS.map(createOption);

export const CITIES = getEnumMembers(City);
export const CITIES_OPTIONS = CITIES.map(createOption);

export const ORIENTATIONS = getEnumMembers(Orientation);
export const ORIENTATIONS_OPTIONS = ORIENTATIONS.map(createOption);

export const FAMILY_STATUSES = getEnumMembers(FamilyStatus);
export const FAMILY_STATUSES_OPTIONS = FAMILY_STATUSES.map(createOption);

export const ATTITUDES = getEnumMembers(Attitude);
export const ATTITUDES_OPTIONS = ATTITUDES.map(createOption);

export const LANGUAGES = getEnumMembers(Language);
export const LANGUAGES_OPTIONS = LANGUAGES.map(createOption);

export const INTERESTS = getEnumMembers(Interests);
export const INTERESTS_OPTIONS = INTERESTS.map(createOption);

export const INVITE_TYPES = getEnumMembers(InviteType);
export const INVITE_TYPES_OPTIONS = INVITE_TYPES.map(createOption);

export const EVENT_TYPES = getEnumMembers(EventType);
export const EVENT_TYPES_OPTIONS = EVENT_TYPES.map(createOption);

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
        id: "invite1",
        modified: "2022-01-15T18:26:20.000Z",
        creatorId: "user1",
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
        responses: mockedUsers.filter(u => Math.floor(Math.random() * 2) < (2 / 2)).slice(0, 1).map(u => ({ user: u, message: 'Go. Go' }))
    },
    {
        id: "invite2",
        modified: "2022-01-18T15:47:54.000Z",
        creatorId: "user2",
        creator: getRandomItem(mockedUsers),
        subject: "Movie night",
        description: "Let's watch some classic movies and have some popcorn!",
        city: "Los Angeles",
        type: InviteType.ENTERTAINMENT,
        address: "456 Hollywood Blvd",
        date: "2022-02-14",
        time: "19:00",
        companionAge: "25-50",
        companionGender: [Gender.MALE, Gender.FEMALE],
        companionsAmount: 4,
        companions: mockedUsers.filter(u => Math.floor(Math.random() * 4) < (4 / 2)).slice(0, 3),
    },
    {
        id: "invite3",
        modified: "2022-01-20T17:35:28.000Z",
        creatorId: "user3",
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
        responses: mockedUsers.filter(u => Math.floor(Math.random() * 2) < (2 / 2)).slice(0, 3).map(u => ({ user: u, message: 'SfSDFASDFASD ASDFASD ASDF AADFSAD ADSF ADFA DSA SDFASD' }))
    },
    {
        id: "invite4",
        modified: "2022-01-22T12:15:42.000Z",
        creatorId: "user4",
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
    },
    {
        id: "invite5",
        modified: "2022-01-25T07:20:19.000Z",
        creatorId: "user5",
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
        responses: mockedUsers.filter(u => Math.floor(Math.random() * 2) < (2 / 2)).slice(0, 2).map(u => ({ user: u, message: 'Go. Go' }))
    },
];
