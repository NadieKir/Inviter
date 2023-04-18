import { Gender, Invite } from "models"

const genderInfoString: Record<Gender, string> = {
    [Gender.MALE]: 'мужчиной',
    [Gender.FEMALE]: 'девушкой',
}

export const getInviteCompanionsInfoString = (invite: Invite) => {
    const infoElements: string[] = [];

    const genders = invite.companionGender;
    if (genders) {
        infoElements.push(`C ${genders.map(g => genderInfoString[g]).join('/')}`);
    }

    const ageRange = invite.companionAge;
    if (ageRange) {
        infoElements.push(`${ageRange} лет`);
    }

    return infoElements.join(', ');
}