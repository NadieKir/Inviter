import {
  IconField,
  InputField,
  InputFieldExternalProps,
  InputRenderProps,
} from 'components';
import { Gender } from 'models';

import styles from './GenderPicker.module.scss';
import man from './assets/man.svg';
import woman from './assets/woman.svg';


type GenderPickerProps = InputFieldExternalProps & {
  className?: string;
  inputType: 'checkbox' | 'radio',
}

export const GenderPicker = ({
  className,
  inputType,
  ...inputFieldProps
}: GenderPickerProps) => {
  return (
    <InputField containerAttributes={{ className: className }} {...inputFieldProps}>
      {({ field, className }: InputRenderProps): JSX.Element => (
        <div className={styles.genders}>
          <IconField icon={man} name={inputFieldProps.name} value={Gender.MALE} type={inputType} />
          <IconField icon={woman} name={inputFieldProps.name} value={Gender.FEMALE} type={inputType} />
        </div>
      )}
    </InputField>
  );
};
