import { useNavigate } from 'react-router';

import { Button, ButtonWidth } from 'components';

import styles from './ForbiddenPage.module.scss';

export const ForbiddenPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => navigate(-1);

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <span className={styles.numbers}>403</span>
        <div className={styles.info}>
          <h1 className="heading-H1">
            Вы не имеете прав для доступа к этой странице
            <span className={styles.blink}>_</span>
          </h1>
          <Button width={ButtonWidth.Small} onClick={handleGoBack}>
            Вернуться назад
          </Button>
        </div>
      </div>
    </section>
  );
};
