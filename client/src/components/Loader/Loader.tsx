import classNames from 'classnames';
import styles from './Loader.module.scss';

export enum LoaderSize {
  SMALL = 'small',
  BIG = 'big',
}

interface LoaderProps {
  variant?: LoaderSize;
}
export const Loader = ({ variant = LoaderSize.BIG }: LoaderProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={classNames(styles.spinner, styles[variant])}></div>
    </div>
  );
};
