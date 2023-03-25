import styles from './ForbiddenPage.module.scss';

export const ForbiddenPage = () => (
  <section className={styles.wrapper}>
    <span className={styles.numbers}>403</span>
    <h1 className={styles.heading}>
      Вы не имеете прав для доступа к этой странице
      <span className={styles.blink}>_</span>
    </h1>
  </section>
);
