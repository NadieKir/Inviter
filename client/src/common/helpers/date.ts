export const getAge = (birthday: Date) => {
    var today = new Date();
    var birthDate = new Date(birthday);
    var age = today.getFullYear() - birthDate.getFullYear();
    var month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

export const isDateValueEquals = (first: Date, second: Date) =>
    first.getDay() === second.getDay() &&
    first.getMonth() === second.getMonth() &&
    first.getFullYear() === second.getFullYear();


export const formatInviteDate = (date: Date) => {
    const formatter = new Intl.DateTimeFormat('ru', { day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric' });

    return formatter.format(date);
}