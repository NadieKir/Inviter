export const isAgeSuitable = (age: number, ageRange: string) => {
  const ageRangeArr = ageRange.split('-');

  return (age >= +ageRangeArr[0]) && (age <= +ageRangeArr[1]);
}