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