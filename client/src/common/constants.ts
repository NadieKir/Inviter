import * as Yup from 'yup';

export const selectOptionValidationSchema = Yup.object().shape({
    value: Yup.string().required(),
    label: Yup.string().required(),
});

export const ageRangeValidationSchema = Yup.string()
    .test(
        'not-empty-test',
        'Введите возраст или диапазон возрастов',
        value => {
            if (!value) {
                return true;
            }

            return /^(1[8-9]|[2-9][0-9])-?(1[9]|[2-9][0-9])?$/gm.test(value);
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