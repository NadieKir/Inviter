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

export const formatInviteDate = (date: string | undefined, time: string | undefined) => {
  if (!date) return 'В любой день';
  
  const resultDate = new Date(date);

  let formatOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
  };

  if (time) {
    const timeUnits = time.split(":");
    const hours = +timeUnits[0];
    const minutes = +timeUnits[1];

    resultDate.setHours(hours);
    resultDate.setMinutes(minutes)

    formatOptions = {
      ...formatOptions,
      hour: 'numeric',
      minute: 'numeric'
    };
  }

  const formatter = new Intl.DateTimeFormat('ru', formatOptions);

  return formatter.format(resultDate);
}