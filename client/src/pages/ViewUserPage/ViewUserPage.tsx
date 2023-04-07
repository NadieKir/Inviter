import { Button } from 'components';

import styles from './ViewUserPage.module.scss';
import mockUser from 'assets/images/mock-user-photo.jpg';

export const ViewUserPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.userInfo}>
        <div className={styles.questionnairePhotoWrapper}>
          <img
            src={mockUser}
            alt="Фото пользователя"
            className={styles.userPhoto}
          />
          <Button>Подписаться</Button>
          <h2>Анкета</h2>
          <div className={styles.questionnaire}>
            <div className={styles.questionnaireRow}></div>
            <div className={styles.questionnaireRow}></div>
            <div className={styles.questionnaireRow}></div>
            <div className={styles.questionnaireRow}></div>
            <div className={styles.questionnaireRow}></div>
          </div>
        </div>
        <div className={styles.briefInterestsWrapper}>
          <div className={styles.brief}>
            <h1>Ангелина, 22</h1>
            <div className={styles.nicknameCityWrapper}></div>
            <p className={styles.description}></p>
          </div>
          <div className={styles.interests}>
            <h2>Интересы</h2>
            <div className={styles.interestsTags}></div>
            <p className={styles.matchRate}>
              Совпадение интересов: <span className="blue">33%</span>
            </p>
          </div>
        </div>
      </div>
      <div className={styles.userInvites}></div>
    </div>
  );
};
