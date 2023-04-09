import { Button } from 'components';

import styles from './UserPage.module.scss';
import mockUser from 'assets/images/mock-user-photo.jpg';
import classNames from 'classnames';

export const UserPage = () => {
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
          <h2
            className={classNames(
              styles.headingH2,
              styles.questionnaireHeading,
            )}
          >
            Анкета
          </h2>

          <div className={styles.questionnairesWrapper}>
            <div className={styles.questionnaire}>
              <div className={styles.questionnaireRow}>
                <span className={styles.subject}>День рождения</span>
                <span className={styles.description}>21.08.2000</span>
              </div>
              <div className={styles.questionnaireRow}>
                <span className={styles.subject}>День рождения</span>
                <span className={styles.description}>21.08.2000</span>
              </div>
              <div className={styles.questionnaireRow}>
                <span className={styles.subject}>День рождения</span>
                <span className={styles.description}>21.08.2000</span>
              </div>
              <div className={styles.questionnaireRow}>
                <span className={styles.subject}>День рождения</span>
                <span className={styles.description}>21.08.2000</span>
              </div>
              <div className={styles.questionnaireRow}>
                <span className={styles.subject}>День рождения</span>
                <span className={styles.description}>21.08.2000</span>
              </div>
              <div className={styles.questionnaireRow}>
                <span className={styles.subject}>День рождения</span>
                <span className={styles.description}>21.08.2000</span>
              </div>
              <div className={styles.questionnaireRow}>
                <span className={styles.subject}>День рождения</span>
                <span className={styles.description}>21.08.2000</span>
              </div>
              <div className={styles.questionnaireRow}>
                <span className={styles.subject}>День рождения</span>
                <span className={styles.description}>21.08.2000</span>
              </div>
            </div>
            <div className={styles.questionnaire}>
              <div className={styles.questionnaireRow}>
                <span className={styles.subject}>День рождения</span>
                <span className={styles.description}>21.08.2000</span>
              </div>
              <div className={styles.questionnaireRow}>
                <span className={styles.subject}>День рождения</span>
                <span className={styles.description}>21.08.2000</span>
              </div>
              <div className={styles.questionnaireRow}>
                <span className={styles.subject}>День рождения</span>
                <span className={styles.description}>21.08.2000</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.briefInterestsWrapper}>
          <div className={styles.brief}>
            <h1 className={styles.headingH1}>Ангелина, 22</h1>
            <div className={styles.nicknameCityWrapper}></div>
            <p className={styles.description}></p>
          </div>
          <div className={styles.interests}>
            <h2 className={styles.headingH2}>Интересы</h2>
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
