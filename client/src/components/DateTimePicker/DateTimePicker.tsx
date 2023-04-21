import { ComponentProps } from 'react';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';

import {
  InputField,
  InputFieldExternalProps,
  InputRenderProps,
} from 'components';

import 'react-datepicker/dist/react-datepicker.css';
import './DateTimePicker.scss';

type DateTimePickerConstraints = Partial<ComponentProps<typeof DatePicker>>;

type DateTimePickerProps = InputFieldExternalProps & {
  className?: string;
  showTimeSelect?: boolean;
  excludePastDateTime?: boolean;
  placeholderText?: string;
  customHandleChange?: (date: Date | null) => void;
  constraints?: DateTimePickerConstraints;
};

export const DateTimePicker = ({
  className,
  showTimeSelect = true,
  excludePastDateTime = false,
  placeholderText = '',
  customHandleChange,
  constraints = {},
  ...inputFieldProps
}: DateTimePickerProps): JSX.Element => {
  registerLocale('ru-RU', ru);
  return (
    <InputField
      {...inputFieldProps}
      disabled={constraints.disabled}
      containerAttributes={{ className: className }}
    >
      {({
        field: { name, value },
        form: { setFieldValue, setFieldTouched },
        className,
      }: InputRenderProps): JSX.Element => {
        const now = new Date();
        const isSelectedDateToday = now.getDate() === new Date(value).getDate();

        const minTimeHour = isSelectedDateToday ? now.getHours() : 0;
        const minTimeMinutes = isSelectedDateToday ? now.getMinutes() : 0;

        const excludeProps = excludePastDateTime
          ? {
            minDate: now,
            minTime: new Date(
              now.setHours(minTimeHour, minTimeMinutes, 0, 0),
            ),
            maxTime: new Date(now.setHours(23, 59, 0, 0)),
          }
          : undefined;

        const handleChange = (date: Date | null): void => {
          customHandleChange
            ? customHandleChange(date)
            : setFieldValue(name, date);
        };

        const adjustTimeListHeight = () => {
          const dayNamesHeight = document.querySelector<HTMLDivElement>(
            '.react-datepicker__day-names',
          )?.clientHeight;
          const monthHeight = document.querySelector<HTMLDivElement>(
            '.react-datepicker__month',
          )?.clientHeight;
          const timeList = document.querySelector<HTMLDivElement>(
            '.react-datepicker__time-list',
          );

          if (timeList && dayNamesHeight && monthHeight) {
            timeList.style.setProperty(
              '--time-list-height',
              `${dayNamesHeight + monthHeight}px`,
            );
          }
        };

        return (
          <DatePicker
            className={className}
            locale="ru-RU"
            timeCaption="Время"
            name={name}
            selected={value}
            onChange={handleChange}
            onBlur={() => setFieldTouched(name, true, true)}
            showTimeSelect={showTimeSelect}
            dateFormat={showTimeSelect ? 'p' : 'd MMMM'}
            placeholderText={placeholderText}
            onMonthChange={adjustTimeListHeight}
            autoComplete="off"
            closeOnScroll
            {...constraints}
            {...excludeProps}
          />
        );
      }}
    </InputField>
  );
};
