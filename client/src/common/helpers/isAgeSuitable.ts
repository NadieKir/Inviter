export const isAgeSuitable = (age: number, ageRange: string) => {
  const ageRangeArr = ageRange.split('-');

  if(ageRangeArr.length === 1) return age === +ageRangeArr[0];

  return (age >= +ageRangeArr[0]) && (age <= +ageRangeArr[1]);
}