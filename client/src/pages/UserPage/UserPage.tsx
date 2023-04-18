import classNames from 'classnames';
import { Button, InviteCard } from 'components';

import styles from './UserPage.module.scss';
import mockUser from 'assets/images/mock-user-photo.jpg';
import at from './assets/at.svg';
import geo from './assets/geo.svg';

export const UserPage = () => {
  return (
    <section className={styles.userPageSection}>
      <div className={styles.userInfo}>
        <div className={styles.questionnairePhotoWrapper}>
          <img
            src={mockUser}
            alt="Фото пользователя"
            className={styles.userPhoto}
          />
          <Button>Подписаться</Button>
          <h2 className={classNames('heading-H2', styles.questionnaireHeading)}>
            Интересы
          </h2>
          <div className={styles.interestsTags}>
            <div className={styles.interestTag}>Спорт</div>
            <div className={styles.interestTag}>Вышивание</div>
            <div className={styles.interestTag}>Чтение</div>
            <div className={styles.interestTag}>Настольные игры</div>
          </div>
          <p className={styles.matchRate}>
            Совпадение интересов: <span className="blue">33%</span>
          </p>
        </div>
        <div className={styles.briefInterestsWrapper}>
          <div className={styles.brief}>
            <h1 className="heading-H1">Ангелина, 22</h1>
            <div className={styles.nicknameCity}>
              <div className={styles.nicknameCityWrapper}>
                <img src={at} alt="Никнейм" />
                me.nadie
              </div>
              <div className={styles.nicknameCityWrapper}>
                <img src={geo} alt="Город" />
                Минск
              </div>
            </div>
            <p className={styles.welcomeMessage}>
              Привет! Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Ut quis dui vitae lacus ultrices ullamcorper et at velit. In id
              erat pellentesque nunc tempor faucibus vel sed neque.
            </p>
          </div>
          <div className={styles.interests}>
            <h2 className="heading-H2">Анкета</h2>
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
                  <span className={styles.subject}>Контакты</span>
                  <span className={styles.description}>25</span>
                </div>
                <div className={styles.questionnaireRow}>
                  <span className={styles.subject}>Подписчики</span>
                  <span className={styles.description}>44</span>
                </div>
                <div className={styles.questionnaireRow}>
                  <span className={styles.subject}>Подписки</span>
                  <span className={styles.description}>215</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className={styles.userInvitesSection}>
        <h2 className="heading-H2">Текущие инвайты</h2>
        <ul className={styles.userInvites}>
          {/* <InviteCard invite={{ name: 'ss', id: '1' }} noUserVariant />
          <InviteCard user={{ name: 'ss', id: '1' }} noUserVariant /> */}
        </ul>
      </section>
    </section>
  );
};
