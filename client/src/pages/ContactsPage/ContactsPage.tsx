import { useContext } from 'react';
import { Form, Formik } from 'formik';

import { IconButton, IconButtonColor, Loader, TextField } from 'components';
import { UserContext } from 'common/contexts';
import { concatUserNameAndAge } from 'common/helpers';

import styles from './ContactsPage.module.scss';
import search from 'assets/images/search.svg';
import cross from 'assets/images/redCross.svg';

export const ContactsPage = () => {
  const { user, isLoading, error } = useContext(UserContext);

  if (isLoading) return <Loader />;
  if (!user) throw error;

  const handleSearch = () => {};

  return (
    <section className={styles.contactsSection}>
      <div className={styles.header}>
        <h1 className="heading-H1">
          Контакты <span className="amount"> ()</span>
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
        <div className={styles.contactCard}>
          <div className={styles.userInfo}>
            <div className={styles.contactInfo}>
              <img className={styles.contactPhoto} src={user.image} alt="" />
              <div className={styles.contactInfoText}>
                <h3 className={styles.name}>{concatUserNameAndAge(user)}</h3>
                <p className="paragraph">{user.connectionMethods}</p>
              </div>
            </div>
            <div className={styles.invites}>
              <h4 className={styles.invitesHeading}>Ваши инвайты</h4>
              <div className={styles.invitesWrapper}>
                <div className={styles.invite}>
                  <span className={styles.date}>21.08.2022</span>
                  <span>Сходить в кин rtvk ir joes kidо</span>
                </div>
              </div>
            </div>
          </div>
          <IconButton icon={cross} buttonColor={IconButtonColor.Red} />
        </div>
      </div>
    </section>
  );
};
