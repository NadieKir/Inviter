import nothingFound from './nothingFound.svg';
import styles from './NothingFound.module.scss';

export const NothingFound = () => {
  return (
    <div className={styles.wrapper}>
      <img className={styles.image} src={nothingFound} alt="" />
    </div>
  );
};
