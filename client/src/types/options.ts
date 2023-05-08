import { Attitude, City, EventType, FamilyStatus, Gender, Interests, InviteType, Language, Orientation, Role, User } from "models";
import { getEnumMembers } from "common/helpers";

export function createOption<T extends string>(o: T): SelectOption<T> {
  return ({ value: o, label: o })
};

export type SelectOption<T extends string> = {
  value: T;
  label: T;
}

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

