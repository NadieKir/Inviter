import { Field } from 'formik';

import styles from './IconField.module.scss';

interface IconFieldProps {
  icon: string;
  name: string;
  value: string;
  type: HTMLInputElement['type']
}

export const IconField = ({
  name,
  icon,
  value,
  type
}: IconFieldProps) => (
  <label className={styles.wrapper}>
    <Field type={type} name={name} value={value} />
    <div className={styles.fieldCustom}>
      <img src={icon} alt={value} className={styles.icon} />
    </div>
  </label>
);
