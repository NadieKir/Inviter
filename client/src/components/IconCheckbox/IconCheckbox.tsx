import { Field } from 'formik';

import styles from './IconCheckbox.module.scss';

interface IconCheckboxProps {
  icon: string;
  name: string;
  value: string;
}

export const IconCheckbox = ({ name, icon, value }: IconCheckboxProps) => (
  <label className={styles.wrapper}>
    <Field type="checkbox" name={name} value={value} />
    <div className={styles.checkboxCustom}>
      <img src={icon} alt={value} className={styles.icon} />
    </div>
  </label>
);
