import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import { Form, Formik } from 'formik';

import { IconButton, IconButtonColor, Loader, TextField } from 'components';
import { UserContext } from 'common/contexts';
import { concatUserNameAndAge, wordFormatDate } from 'common/helpers';
import { SERVER_URL } from 'common/constants';

import styles from './ContactsPage.module.scss';
import search from 'assets/images/search.svg';
import cross from 'assets/images/redCross.svg';
import at from 'assets/images/at.svg';
import geo from 'assets/images/geo.svg';
import { Invite } from 'models';

export const ContactsPage = observer(() => {
  const { user, isLoading, error, userContacts, contactToInvites } =
    useContext(UserContext);

  if (isLoading) return <Loader />;
  if (!user) throw error;

  const handleSearch = () => {};

  const handleDelete = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <section className={styles.contactsSection}>
      <div className={styles.header}>
        <h1 className="heading-H1">
          Контакты <span className="amount"> ({userContacts.length})</span>
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
        {userContacts.map((contact) => (
          <NavLink to={`/user/${contact.login}`} className={styles.contactCard}>
            <div className={styles.userInfo}>
              <div className={styles.contactInfo}>
                <img
                  className={styles.contactPhoto}
                  src={SERVER_URL + contact.image}
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
                  <p className="paragraph">{contact.connectionMethods}</p>
                </div>
              </div>
              <div className={styles.invites}>
                <h4 className={styles.invitesHeading}>Ваши инвайты</h4>
                <div className={styles.invitesWrapper}>
                  {contactToInvites.get(contact).map((i: Invite) => (
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
              </div>
            </div>
            <IconButton
              icon={cross}
              buttonColor={IconButtonColor.Red}
              onClick={(e) => handleDelete}
            />
          </NavLink>
        ))}
      </div>
    </section>
  );
});
