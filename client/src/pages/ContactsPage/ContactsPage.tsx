import { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import { Form, Formik } from 'formik';

import {
  Button,
  ButtonHeight,
  ButtonType,
  ButtonVariant,
  ButtonWidth,
  IconButton,
  IconButtonColor,
  Loader,
  NothingFound,
  TextField,
} from 'components';
import { UserContext } from 'common/contexts';
import {
  concatUserNameAndAge,
  parseNewLine,
  wordFormatDate,
} from 'common/helpers';
import { SERVER_URL } from 'common/constants';
import { Invite } from 'models';
import { deleteContact } from 'api';
import { usePushNotification, useContactsInvites } from 'common/hooks';

import styles from './ContactsPage.module.scss';
import search from 'assets/images/search.svg';
import cross from 'assets/images/redCross.svg';
import at from 'assets/images/at.svg';
import geo from 'assets/images/geo.svg';

export const ContactsPage = observer(() => {
  const { pushSuccess, pushError } = usePushNotification();

  const { user, isLoading, error, userContacts } = useContext(UserContext);

  const [filter, setFilter] = useState<string>();

  const {
    contactsInvites,
    isLoading: isContactInvitesLoading,
    loadContactInvites,
  } = useContactsInvites(filter);

  if (isLoading) return <Loader />;
  if (!user) throw error;

  const handleSearch = (values: { query: string }) => {
    setFilter(values.query);
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    userId: string,
    shouldDeleteFromAll = 'false',
  ) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await deleteContact(userId, shouldDeleteFromAll);
      await loadContactInvites();
      pushSuccess('Контакт успешно удален');
    } catch (e) {
      console.log(e);
      pushError('Не удалось удалить контакт');
    }
  };

  const renderContacts = () => {
    if (isLoading || isContactInvitesLoading) {
      return <Loader />;
    }

    if (!contactsInvites) {
      return null;
    }

    const contactsToShow = [...contactsInvites];

    if (contactsToShow.length === 0) {
      return <NothingFound />;
    }

    return contactsToShow.map((entry) => (
      <NavLink to={`/user/${entry[0].login}`} className={styles.contactCard}>
        <div className={styles.userInfo}>
          <div className={styles.contactInfo}>
            <img
              className={styles.contactPhoto}
              src={SERVER_URL + entry[0].image}
              alt=""
            />
            <div className={styles.contactInfoText}>
              <div className={styles.nameDataWrapper}>
                <h3 className={styles.name}>
                  {concatUserNameAndAge(entry[0])}
                </h3>
                <div className={styles.nicknameCity}>
                  <div className={styles.nicknameCityWrapper}>
                    <img src={at} alt="Никнейм" height="13px" />
                    {entry[0].login}
                  </div>
                  <div className={styles.nicknameCityWrapper}>
                    <img src={geo} alt="Город" height="13px" />
                    {entry[0].city}
                  </div>
                </div>
              </div>
              <p className="paragraph">
                {parseNewLine(entry[0].connectionMethods)}
              </p>
            </div>
          </div>
          <div className={styles.invites}>
            <h4 className={styles.invitesHeading}>Ваши инвайты</h4>
            <div className={styles.invitesWrapper}>
              {entry[1].map((i: Invite) => (
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
        <div className={styles.a}>
          <Button
            width={ButtonWidth.Small}
            variant={ButtonVariant.Secondary}
            buttonType={ButtonType.Danger}
            height={ButtonHeight.Small}
            onClick={(e) => handleDelete(e, entry[0]._id)}
          >
            Удалить у меня
          </Button>
          <Button
            width={ButtonWidth.Small}
            variant={ButtonVariant.Secondary}
            buttonType={ButtonType.Danger}
            height={ButtonHeight.Small}
            onClick={(e) => handleDelete(e, entry[0]._id, 'true')}
          >
            Удалить у всех
          </Button>
        </div>
      </NavLink>
    ));
  };

  return (
    <section className={styles.contactsSection}>
      <div className={styles.header}>
        <h1 className="heading-H1">
          Контакты <span className="amount"> ({userContacts.length})</span>
        </h1>
        <Formik initialValues={{ query: '' }} onSubmit={handleSearch}>
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
      <div className={styles.contactsWrapper}>{renderContacts()}</div>
    </section>
  );
});
