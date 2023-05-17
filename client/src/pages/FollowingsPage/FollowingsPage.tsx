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
import { mockedInvites } from 'models';
import { UserContext } from 'common/contexts';
import { concatUserNameAndAge } from 'common/helpers';
import { useFollowingsInvites } from 'common/hooks/useFollowingsInvites';

import styles from './FollowingsPage.module.scss';
import search from 'assets/images/search.svg';
import at from 'assets/images/at.svg';

export const FollowingsPage = () => {
  const { user, isLoading, error, userFollowings } = useContext(UserContext);
  const { followingInvites, isFollowingsLoading } = useFollowingsInvites();

  if (isLoading || isFollowingsLoading) return <Loader />;
  if (!user) throw error;

  const handleSearch = () => { };

  return (
    <section className={styles.followingsSection}>
      <div className={styles.header}>
        <h1 className="heading-H1">
          Подписки <span className="amount">({userFollowings.length})</span>
        </h1>
      </div>
      <div className={styles.mainWrapper}>
        <div className={styles.followingsWrapper}>
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
          <div className={styles.followings}>
            {userFollowings.map(f => (
              <NavLink to={`/user/${f.login}`} className={styles.following}>
                <img className={styles.followingPhoto} src={f.image} alt="" />
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
          </div>
        </div>
        <div className={styles.invitesWrapper}>
          {followingInvites?.map((i) => (
            <InviteCard invite={i} variant={InviteCardVariant.SMALL_USER} />
          ))}
        </div>
      </div>
    </section>
  );
};
