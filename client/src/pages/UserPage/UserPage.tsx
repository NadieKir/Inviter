import { useContext } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { Button, InviteCard, Loader } from 'components';
import { concatUserNameAndAge, formatDate, getOverlapPercent } from 'common/helpers';
import { UserContext } from 'common/contexts';
import { UserStore } from 'stores';

import styles from './UserPage.module.scss';
import at from './assets/at.svg';
import geo from './assets/geo.svg';
import { Invite } from 'models';

export const UserPage = observer(() => {
  const { login } = useParams();

  const currentUserStore = useContext(UserContext);

  const { user, userInvites, error, isLoading } = useLocalObservable(
    () => new UserStore(login!),
  );

  if (isLoading) return <Loader />;
  if (!user) throw error;

  return (
    <section className={styles.userPageSection}>
      <div className={styles.userInfo}>
        <div className={styles.questionnairePhotoWrapper}>
          <img
            src={user.image}
            alt="Фото пользователя"
            className={styles.userPhoto}
          />
          <Button>Подписаться</Button>
          <h2 className={classNames('heading-H2', styles.questionnaireHeading)}>
            Интересы
          </h2>
          <div className={styles.interestsTags}>
            {user.interests.map((interest) => {
              return <div className={styles.interestTag}>{interest}</div>;
            })}
          </div>
          <p className={styles.matchRate}>
            Совпадение интересов:{' '}
            <span className="blue">
              {getOverlapPercent(
                user.interests,
                currentUserStore.user!.interests,
              )}
            </span>
          </p>
        </div>
        <div className={styles.briefInterestsWrapper}>
          <div className={styles.brief}>
            <h1 className="heading-H1">{concatUserNameAndAge(user)}</h1>
            <div className={styles.nicknameCity}>
              <div className={styles.nicknameCityWrapper}>
                <img src={at} alt="Никнейм" />
                {user.login}
              </div>
              <div className={styles.nicknameCityWrapper}>
                <img src={geo} alt="Город" />
                {user.city}
              </div>
            </div>
            <p className={styles.welcomeMessage}>{user.welcomeMessage}</p>
          </div>
          <div className={styles.interests}>
            <h2 className="heading-H2">Анкета</h2>
            <div className={styles.questionnairesWrapper}>
              <div className={styles.questionnaire}>
                <div className={styles.questionnaireRow}>
                  <span className={styles.subject}>День рождения</span>
                  <span className={styles.description}>{formatDate(new Date(user.birthday))}</span>
                </div>
                <div className={styles.questionnaireRow}>
                  <span className={styles.subject}>Ориентация</span>
                  <span className={styles.description}>{user.orientation}</span>
                </div>
                <div className={styles.questionnaireRow}>
                  <span className={styles.subject}>Отношения</span>
                  <span className={styles.description}>{user.familyStatus}</span>
                </div>
                <div className={styles.questionnaireRow}>
                  <span className={styles.subject}>Языки</span>
                  <span className={styles.description}>{user.languages.join(', ')}</span>
                </div>
                <div className={styles.questionnaireRow}>
                  <span className={styles.subject}>Курение</span>
                  <span className={styles.description}>{user.smokingAttitude}</span>
                </div>
                <div className={styles.questionnaireRow}>
                  <span className={styles.subject}>Алкоголь</span>
                  <span className={styles.description}>{user.alcoholAttitude}</span>
                </div>
                <div className={styles.questionnaireRow}>
                  <span className={styles.subject}>Возраст компаньонов</span>
                  <span className={styles.description}>{user.preferredAge}</span>
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
          {userInvites.map((invite: Invite) => (
            <InviteCard key={invite.id} invite={invite} noUserVariant />
          ))}
        </ul>
      </section>
    </section>
  );
});
