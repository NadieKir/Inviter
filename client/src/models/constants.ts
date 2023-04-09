import { getEnumMembers } from "common/helpers/getEnumMembers";
import { SelectOption } from "types/other";

import { FamilyStatus, Gender, Interests, Language, Orientation } from "./user.model";


function createOption<T extends string>(o: T): SelectOption<T> {
    return ({ value: o, label: o })
};

export const GENDERS = getEnumMembers(Gender);
export const GENDERS_OPTIONS = GENDERS.map(createOption);

export const ORIENTATIONS = getEnumMembers(Orientation);
export const ORIENTATIONS_OPTIONS = ORIENTATIONS.map(createOption);

export const FAMILY_STATUSES = getEnumMembers(FamilyStatus);
export const FAMILY_STATUSES_OPTIONS = FAMILY_STATUSES.map(createOption);

export const LANGUAGES = getEnumMembers(Language);
export const LANGUAGES_OPTIONS = LANGUAGES.map(createOption);

export const INTERESTS = getEnumMembers(Interests);
export const INTERESTS_OPTIONS = INTERESTS.map(createOption);