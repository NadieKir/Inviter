import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import { Form, Formik } from 'formik';

import { IconButton, IconButtonColor, Loader, TextField } from 'components';
import { UserContext } from 'common/contexts';
import { concatUserNameAndAge } from 'common/helpers';

import styles from './ContactsPage.module.scss';
import search from 'assets/images/search.svg';
import cross from 'assets/images/redCross.svg';

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
                  src={contact.image}
                  alt=""
                />
                <div className={styles.contactInfoText}>
                  <h3 className={styles.name}>
                    {concatUserNameAndAge(contact)}
                  </h3>
                  <p className="paragraph">{contact.connectionMethods}</p>
                </div>
              </div>
              <div className={styles.invites}>
                <h4 className={styles.invitesHeading}>Ваши инвайты</h4>
                <div className={styles.invitesWrapper}>
                  {contactToInvites.get(contact).map((i: any) => (
                    <div className={styles.invite}>
                      <span>{i.subject}</span>
                      {i.date && <span className={styles.date}>{i.date}</span>}
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
