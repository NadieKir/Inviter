const toFixedIfAny = (num: number, maxDecimalPlaces: number): string =>
  +num.toFixed(maxDecimalPlaces) + '';

export const convertBytesToMb = (bytes: number): number => {
  const BYTES_IN_MEGABYTE = 1_048_576;
  return bytes / BYTES_IN_MEGABYTE;
};

export const convertBytesToKb = (bytes: number): number => {
  const BYTES_IN_KILOBYTE = 1_024;

  return bytes / BYTES_IN_KILOBYTE;
};

export const getFileSizeString = (
  bytes: number,
  maxDecimalPlaces: number = 0,
): string => {  
  // start from most aggregating conversion
  let result = toFixedIfAny(convertBytesToMb(bytes), maxDecimalPlaces);

  if (+result > 0) {
    return `${result} Mb`;
  }

  // take less aggregating conversion
  result = toFixedIfAny(convertBytesToKb(bytes), maxDecimalPlaces);

  if (+result > 0) {
    return `${result} Kb`;
  }

  // return without aggregation
  result = toFixedIfAny(bytes, maxDecimalPlaces);

  return `${result} bytes`;
};

export const clamp = (value: number, min: number, max: number) => (Math.min(Math.max(value, min), max))