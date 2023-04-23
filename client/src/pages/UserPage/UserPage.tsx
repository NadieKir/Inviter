import { useContext, useEffect, useState } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { Button, Loader } from 'components';
import { getUser } from 'api';
import { User } from 'models';
import { getOverlapPercent } from 'common/helpers';
import { UserContext } from 'common/contexts';

import styles from './UserPage.module.scss';
import at from './assets/at.svg';
import geo from './assets/geo.svg';
import UserStore from 'stores/UserStore';

export const UserPage = observer(() => {
  const { login } = useParams();

  const userStore = useContext(UserContext);

  // const { isLoading, anotherUsersInvites } = useLocalObservable(
  //   () => new UserStore(),
  // );

  const [user, setUser] = useState<User>();

  useEffect(() => {
    const r = async () => {
      const a = await getUser(login!);
      setUser(a);
    };

    r();
  }, []);

  if (!user) return <Loader />;

  return (
    <section className={styles.userPageSection}>
      <div className={styles.userInfo}>
        <div className={styles.questionnairePhotoWrapper}>
          <img
            src={user?.image}
            alt="Фото пользователя"
            className={styles.userPhoto}
          />
          <Button>Подписаться</Button>
          <h2 className={classNames('heading-H2', styles.questionnaireHeading)}>
            Интересы
          </h2>
          <div className={styles.interestsTags}>
            {user?.interests.map((interest) => {
              return <div className={styles.interestTag}>{interest}</div>;
            })}
          </div>
          <p className={styles.matchRate}>
            Совпадение интересов:{' '}
            <span className="blue">
              {getOverlapPercent(user.interests, userStore.user!.interests)}
            </span>
          </p>
        </div>
        <div className={styles.briefInterestsWrapper}>
          <div className={styles.brief}>
            <h1 className="heading-H1">{user?.name}, 22</h1>
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
});
