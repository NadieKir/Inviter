import { Form, Formik } from 'formik';
import styles from './FollowingsPage.module.scss';
import search from 'assets/images/search.svg';
import at from 'assets/images/at.svg';
import {
  IconButton,
  InviteCard,
  InviteCardVariant,
  Loader,
  TextField,
} from 'components';
import { mockedInvites } from 'models';
import { useContext } from 'react';
import { UserContext } from 'common/contexts';
import { concatUserNameAndAge } from 'common/helpers';
import { NavLink } from 'react-router-dom';

export const FollowingsPage = () => {
  const { user, isLoading, error } = useContext(UserContext);

  if (isLoading) return <Loader />;
  if (!user) throw error;

  const handleSearch = () => {};

  return (
    <section className={styles.followingsSection}>
      <div className={styles.header}>
        <h1 className="heading-H1">
          Подписки <span className="amount">()</span>
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
            <NavLink to={`/user/${user.login}`} className={styles.following}>
              <img className={styles.followingPhoto} src={user.image} alt="" />
              <div className={styles.followingInfo}>
                <h3 className={styles.followingName}>
                  {concatUserNameAndAge(user)}
                </h3>
                <div className={styles.loginWrapper}>
                  <img src={at} alt="" height={'10px'} />
                  <span>{user.login}</span>
                </div>
              </div>
            </NavLink>
          </div>
        </div>
        <div className={styles.invitesWrapper}>
          {mockedInvites.map((i) => (
            <InviteCard invite={i} variant={InviteCardVariant.SMALL_USER} />
          ))}
        </div>
      </div>
    </section>
  );
};
