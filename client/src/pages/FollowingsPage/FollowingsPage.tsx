import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Form, Formik } from 'formik';

import {
  IconButton,
  InviteCard,
  InviteCardVariant,
  Loader,
  TextField,
} from 'components';
import { UserContext } from 'common/contexts';
import { concatUserNameAndAge } from 'common/helpers';
import { useFollowingsInvites, useUsers } from 'common/hooks';
import { SERVER_URL } from 'common/constants';

import styles from './FollowingsPage.module.scss';
import search from 'assets/images/search.svg';
import at from 'assets/images/at.svg';

export const FollowingsPage = () => {
  const { user, isLoading, error, userFollowings } = useContext(UserContext);
  const { followingInvites, isFollowingsLoading } = useFollowingsInvites();

  const [filter, setFilter] = useState<string | undefined>(undefined);
  const { users, isUsersLoading } = useUsers(filter);

  if (!user) throw error;

  const renderFollowingsAndUsers = () => {
    if (isUsersLoading) {
      return <Loader />;
    }

    const userFollowingsToShow = userFollowings.filter((u) => {
      const filterToUse = filter?.toLowerCase() ?? '';

      return (
        u.name.toLowerCase().includes(filterToUse) ||
        u.login.toLowerCase().includes(filterToUse)
      );
    });

    const userFollowingsIds = userFollowingsToShow.map((u) => u._id);

    const usersToShow = users.filter((u) => !userFollowingsIds.includes(u._id));

    if (userFollowingsToShow.length === 0 && usersToShow.length === 0) {
      return <span>Пользователи не найдены</span>;
    }

    return (
      <>
        {userFollowingsToShow.map((f) => (
          <NavLink to={`/user/${f.login}`} className={styles.following}>
            <img
              className={styles.followingPhoto}
              src={SERVER_URL + f.image}
              alt=""
            />
            <div className={styles.followingInfo}>
              <h3 className={styles.followingName}>
                {concatUserNameAndAge(f)}
              </h3>
              <div className={styles.loginWrapper}>
                <img src={at} alt="" height={'10px'} />
                <span>{f.login}</span>
              </div>
            </div>
          </NavLink>
        ))}
        {usersToShow.filter((u) => u._id !== user._id).length === 0 || (
          <span className={styles.otherUsersLabel}>Другие пользователи:</span>
        )}
        {usersToShow
          ?.filter((u) => u._id !== user._id)
          .map((u) => (
            <NavLink to={`/user/${u.login}`} className={styles.following}>
              <img
                className={styles.followingPhoto}
                src={SERVER_URL + u.image}
                alt=""
              />
              <div className={styles.followingInfo}>
                <h3 className={styles.followingName}>
                  {concatUserNameAndAge(u)}
                </h3>
                <div className={styles.loginWrapper}>
                  <img src={at} alt="" height={'10px'} />
                  <span>{u.login}</span>
                </div>
              </div>
            </NavLink>
          ))}
      </>
    );
  };

  return (
    <section className={styles.followingsSection}>
      <div className={styles.header}>
        <h1 className="heading-H1">
          Подписки <span className="amount">({userFollowings.length})</span>
        </h1>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.mainWrapper}>
          <div className={styles.followingsWrapper}>
            <Formik
              initialValues={{
                nameOrFilter: '',
              }}
              onSubmit={(values) => setFilter(values.nameOrFilter)}
            >
              {(props) => (
                <Form className={styles.searchForm}>
                  <TextField
                    name="nameOrFilter"
                    multiline={false}
                    placeholderText="Введите имя или логин"
                  />
                  <IconButton type="submit" icon={search} />
                </Form>
              )}
            </Formik>
            <div className={styles.followings}>
              {renderFollowingsAndUsers()}
            </div>
          </div>

          <div className={styles.invitesWrapper}>
            {isFollowingsLoading ? (
              <Loader />
            ) : (
              followingInvites?.map((i) => (
                <InviteCard invite={i} variant={InviteCardVariant.SMALL_USER} />
              ))
            )}
          </div>
        </div>
      )}
    </section>
  );
};
