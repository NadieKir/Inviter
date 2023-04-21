export const getAge = (birthday: Date) => {
  let today = new Date();
  let birthDate = new Date(birthday);
  let age = today.getFullYear() - birthDate.getFullYear();
  let month = today.getMonth() - birthDate.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

export const isDateValueEquals = (first: Date, second: Date) =>
  first.getDay() === second.getDay() &&
  first.getMonth() === second.getMonth() &&
  first.getFullYear() === second.getFullYear();


export const formatInviteDate = (date: Date, time?: string) => {
  const resultDate = new Date(date);
  let formatOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
  };

  console.log()

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