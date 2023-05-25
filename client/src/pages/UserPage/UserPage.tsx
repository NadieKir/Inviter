import { useContext } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import {
  Button,
  ButtonVariant,
  InviteCard,
  InviteCardVariant,
  Loader,
} from 'components';
import {
  concatUserNameAndAge,
  formatDate,
  getOverlapPercent,
} from 'common/helpers';
import { UserContext } from 'common/contexts';
import { UserStore } from 'stores';
import { Invite } from 'models';
import { addFollowing, removeFollowing } from 'api';

import styles from './UserPage.module.scss';
import at from 'assets/images/at.svg';
import geo from 'assets/images/geo.svg';
import { SERVER_URL } from 'common/constants';

export const UserPage = observer(() => {
  const { login } = useParams();

  const currentUserStore = useContext(UserContext);

  const {
    user,
    userInvites,
    error,
    isLoading,
    userFollowings,
    userFollowers,
    userContacts,
  } = useLocalObservable(() => new UserStore(login!));

  const { userFollowings: currentUserFollowings, loadFollowings } =
    useContext(UserContext);

  const currentUserFollowingsIds = currentUserFollowings.map((c) => c._id);

  if (isLoading) return <Loader />;
  if (!user) throw error;

  return (
    <section className={styles.userPageSection}>
      <section className={styles.userInfo}>
        <div className={styles.briefWrapper}>
          <img
            src={SERVER_URL + user.image}
            alt="Фото пользователя"
            className={styles.userPhoto}
          />
          <div className={styles.brief}>
            <h1 className="heading-H1">{concatUserNameAndAge(user)}</h1>
            <div className={styles.nicknameCity}>
              <div className={styles.nicknameCityWrapper}>
                <img src={at} alt="Никнейм" height="14px" />
                {user.login}
              </div>
              <div className={styles.nicknameCityWrapper}>
                <img src={geo} alt="Город" height="14px" />
                {user.city}
              </div>
            </div>
            <p className={styles.welcomeMessage}>{user.welcomeMessage}</p>
          </div>
          {currentUserFollowingsIds.includes(user._id) ? (
            <Button
              variant={ButtonVariant.Secondary}
              onClick={async () => {
                await removeFollowing(user._id);
                await loadFollowings();
              }}
            >
              Отписаться
            </Button>
          ) : (
            <Button
              onClick={async () => {
                await addFollowing(user._id);
                await loadFollowings();
              }}
            >
              Подписаться
            </Button>
          )}
        </div>

        <div className={styles.questionnaireInterestsWrapper}>
          <div className={styles.questionnaireSection}>
            <h2 className="heading-H2">Анкета</h2>
            <div className={styles.questionnairesWrapper}>
              <div className={styles.questionnaire}>
                <div className={styles.questionnaireRow}>
                  <span className={styles.subject}>День рождения</span>
                  <span className={styles.description}>
                    {formatDate(new Date(user.birthday))}
                  </span>
                </div>
                <div className={styles.questionnaireRow}>
                  <span className={styles.subject}>Ориентация</span>
                  <span className={styles.description}>{user.orientation}</span>
                </div>
                <div className={styles.questionnaireRow}>
                  <span className={styles.subject}>Отношения</span>
                  <span className={styles.description}>
                    {user.familyStatus}
                  </span>
                </div>
                <div className={styles.questionnaireRow}>
                  <span className={styles.subject}>Языки</span>
                  <span className={styles.description}>
                    {user.languages.join(', ')}
                  </span>
                </div>
                <div className={styles.questionnaireRow}>
                  <span className={styles.subject}>Курение</span>
                  <span className={styles.description}>
                    {user.smokingAttitude}
                  </span>
                </div>
                <div className={styles.questionnaireRow}>
                  <span className={styles.subject}>Алкоголь</span>
                  <span className={styles.description}>
                    {user.alcoholAttitude}
                  </span>
                </div>
                <div className={styles.questionnaireRow}>
                  <span className={styles.subject}>Возраст компаньонов</span>
                  <span className={styles.description}>
                    {user.preferredAge}
                  </span>
                </div>
              </div>
              <div className={styles.questionnaire}>
                <div className={styles.questionnaireRow}>
                  <span className={styles.subject}>Контакты</span>
                  <span className={styles.description}>
                    {userContacts.length}
                  </span>
                </div>
                <div className={styles.questionnaireRow}>
                  <span className={styles.subject}>Подписчики</span>
                  <span className={styles.description}>
                    {userFollowers.length}
                  </span>
                </div>
                <div className={styles.questionnaireRow}>
                  <span className={styles.subject}>Подписки</span>
                  <span className={styles.description}>
                    {userFollowings.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.interestsSection}>
            <h2
              className={classNames('heading-H2', styles.questionnaireHeading)}
            >
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
        </div>
      </section>

      <section className={styles.userInvitesSection}>
        <h2 className={styles.currentInvitesHeading}>
          Текущие инвайты <span className="amount">({userInvites.length})</span>
        </h2>
        <ul className={styles.userInvites}>
          {userInvites.map((invite: Invite) => (
            <InviteCard
              key={invite._id}
              invite={invite}
              variant={InviteCardVariant.NO_USER}
            />
          ))}
        </ul>
      </section>
    </section>
  );
});
