import * as Yup from 'yup';

export const selectOptionValidationSchema = Yup.object().shape({
  value: Yup.string(),
  label: Yup.string(),
});

export const ageRangeValidationSchema = Yup.string()
  .test(
    'ages-more-than-eighteen',
    'Вводимые возраста должны быть больше 16',
    value => {
      if (!value) {
          return true;
      }

      const ages = value?.split('-');
      return ages.every(a => +a >= 16);
    }
  ).test(
    'not-empty-test',
    'Введите возраст или диапазон возрастов',
    value => {
      if (!value) {
          return true;
      }

      return /^(1[6-9]|[2-9][0-9])-?(1[7]|[2-9][0-9])?$/gm.test(value);
    },
  ).test(
    'first-age-less-than-second',
    'Первый возраст должен быть меньше второго',
    value => {
      if (!value) {
          return true;
      }

      const ages = value?.split('-');
      if (ages.length !== 2) {
          return true;
      }

      return ages[0] < ages[1];
    }
  );