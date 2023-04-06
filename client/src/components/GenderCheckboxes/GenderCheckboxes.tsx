import {
  IconCheckbox,
  InputField,
  InputFieldExternalProps,
  InputRenderProps,
} from 'components';

import styles from './GenderCheckboxes.module.scss';
import man from './assets/man.svg';
import woman from './assets/woman.svg';

// name: string;
// labelText?: string;
// successText?: string;
// hintText?: string;
// noVerify?: boolean;

export const GenderCheckboxes = ({
  ...inputFieldProps
}: InputFieldExternalProps) => {
  return (
    <InputField {...inputFieldProps}>
      {({ field, className }: InputRenderProps): JSX.Element => (
        <div className={styles.genders}>
          <IconCheckbox icon={man} name="gender" value="Мужской" />
          <IconCheckbox icon={woman} name="gender" value="Женский" />
        </div>
      )}
    </InputField>
  );
};
