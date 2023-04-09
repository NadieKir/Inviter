import { getEnumMembers } from "common/helpers/getEnumMembers";
import { SelectOption } from "types/other";

import { FamilyStatus, Gender, Orientation } from "./user.model";


const createOption = (o: string): SelectOption => ({ value: o, label: o });

export const GENDERS = getEnumMembers(Gender);
export const GENDERS_OPTIONS = GENDERS.map(createOption);

export const ORIENTATIONS = getEnumMembers(Orientation);
export const ORIENTATIONS_OPTIONS = ORIENTATIONS.map(createOption);

export const FAMILY_STATUSES = getEnumMembers(FamilyStatus);
export const FAMILY_STATUSES_OPTIONS = FAMILY_STATUSES.map(createOption);
