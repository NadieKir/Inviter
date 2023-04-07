import {
  IconCheckbox,
  InputField,
  InputFieldExternalProps,
  InputRenderProps,
} from 'components';
import { Gender } from 'models';

import styles from './GenderCheckboxes.module.scss';
import man from './assets/man.svg';
import woman from './assets/woman.svg';

export const GenderCheckboxes = ({
  ...inputFieldProps
}: InputFieldExternalProps) => {
  return (
    <InputField {...inputFieldProps}>
      {({ field, className }: InputRenderProps): JSX.Element => (
        <div className={styles.genders}>
          <IconCheckbox icon={man} name={inputFieldProps.name} value={Gender.MALE} />
          <IconCheckbox icon={woman} name={inputFieldProps.name} value={Gender.FEMALE} />
        </div>
      )}
    </InputField>
  );
};
