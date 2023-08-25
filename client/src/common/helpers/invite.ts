import { Gender, Invite } from "models"

const genderInfoString: Record<Gender, string> = {
  [Gender.MALE]: 'мужчиной',
  [Gender.FEMALE]: 'девушкой',
}

export const getInviteCompanionsInfoString = (invite: Invite) => {
  const infoElements: string[] = [];
  const genders = invite.companionGender;
  const ageRange = invite.companionAge;

  if (genders.length === 1) {
    infoElements.push(`C ${genders.map(g => genderInfoString[g]).join('/')}`);
  } else {
    infoElements.push('С кем-нибудь');
  }

  if (ageRange) {
    infoElements.push(`${ageRange} лет`);
  }

  return infoElements.join(', ');
}

