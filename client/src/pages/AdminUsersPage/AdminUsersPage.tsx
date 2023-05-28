import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { Form, Formik } from 'formik';

import { IconButton, IconButtonColor, Loader, TextField } from 'components';
import { concatUserNameAndAge, wordFormatDate } from 'common/helpers';
import { SERVER_URL } from 'common/constants';
import { AnotherUsersInvitesStore, UserListStore } from 'stores';
import { deleteUser } from 'api';
import { usePushNotification } from 'common/hooks';
import { Invite } from 'models';

import styles from './AdminUsersPage.module.scss';
import search from 'assets/images/search.svg';
import cross from 'assets/images/redCross.svg';
import at from 'assets/images/at.svg';
import geo from 'assets/images/geo.svg';

export const AdminUsersPage = observer(() => {
  const { pushSuccess, pushError } = usePushNotification();

  const { isLoading, usersWithoutAdmins, getUsers } = useLocalObservable(
    () => new UserListStore(),
  );

  const { isLoading: isInvitesLoading, usersToInvites } = useLocalObservable(
    () => new AnotherUsersInvitesStore(),
  );

  if (isLoading || isInvitesLoading) return <Loader />;

  const handleSearch = () => {};

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    userId: string,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await deleteUser(userId);
      getUsers();
      pushSuccess('Пользователь успешно удален');
    } catch (e) {
      console.log(e);
      pushError('Не удалось удалить пользователя');
    }
  };

  return (
    <section className={styles.contactsSection}>
      <div className={styles.header}>
        <h1 className="heading-H1">
          Пользователи{' '}
          <span className="amount"> ({usersWithoutAdmins.length})</span>
        </h1>
        <Formik initialValues={{}} onSubmit={handleSearch}>
          {(props) => (
            <Form className={styles.searchForm}>
              <TextField
                name="query"
                multiline={false}
                placeholderText="Введите имя или логин"
              />
              <IconButton type="submit" icon={search} />
            </Form>
          )}
        </Formik>
      </div>
      <div className={styles.contactsWrapper}>
        {usersWithoutAdmins.map((user) => (
          <NavLink
            to={`/admin/user/${user.login}`}
            className={styles.contactCard}
            key={user.login}
          >
            <div className={styles.userInfo}>
              <div className={styles.contactInfo}>
                <img
                  className={styles.contactPhoto}
                  src={SERVER_URL + user.image}
                  alt=""
                />
                <div className={styles.contactInfoText}>
                  <div className={styles.nameDataWrapper}>
                    <h3 className={styles.name}>
                      {concatUserNameAndAge(user)}
                    </h3>
                    <div className={styles.nicknameCity}>
                      <div className={styles.nicknameCityWrapper}>
                        <img src={at} alt="Никнейм" height="13px" />
                        {user.login}
                      </div>
                      <div className={styles.nicknameCityWrapper}>
                        <img src={geo} alt="Город" height="13px" />
                        {user.city}
                      </div>
                    </div>
                  </div>
                  <p className={classNames('paragraph', styles.desc)}>
                    {user.welcomeMessage}
                  </p>
                </div>
              </div>
              <div className={styles.invites}>
                {usersToInvites.get(user._id) && (
                  <>
                    <h4 className={styles.invitesHeading}>Текущие инвайты</h4>
                    <div className={styles.invitesWrapper}>
                      {usersToInvites.get(user._id).map((i: Invite) => (
                        <div className={styles.invite} key={i._id}>
                          {i.date && (
                            <span className={styles.date}>
                              {wordFormatDate(i.date, i.time)}
                            </span>
                          )}
                          <span>{i.subject}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            <IconButton
              icon={cross}
              buttonColor={IconButtonColor.Red}
              onClick={(e) => handleDelete(e, user._id)}
            />
          </NavLink>
        ))}
      </div>
    </section>
  );
});
