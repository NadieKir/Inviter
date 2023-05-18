import { NavLink } from 'react-router-dom';

import { Event } from 'models';
import { isInThePast, wordFormatDate } from 'common/helpers';

import styles from './EventCard.module.scss';
import calendar from 'assets/images/calendar.svg';
import classNames from 'classnames';

interface EventCardProps {
  event: Event;
  isAdmin?: boolean;
}

export const EventCard = ({ event, isAdmin = false }: EventCardProps) => {
  const handleEdit = () => {};

  const handleDelete = () => {};

  return (
    <li>
      <NavLink to={`/events/${event._id}`}>
        <article className={styles.card}>
          <div className={styles.infoWrapper}>
            <div className={styles.wrapper}>
              <div className={styles.date}>
                <img src={calendar} alt="Дата" height={'15px'} />
                <span>{wordFormatDate(event.date, event.time)}</span>
              </div>
              <div className={styles.headingDescription}>
                <h2 className={styles.heading}>{event.name}</h2>
                <p
                  className={classNames(styles.description, {
                    [styles.long]: !isAdmin,
                  })}
                >
                  {event.description}
                </p>
              </div>
            </div>

            {isAdmin && (
              <div className={styles.buttonsWrapper}>
                {/* TODO onclick and event.date change */}
                {isInThePast(event.date) && (
                  <button
                    onClick={handleEdit}
                    className={classNames(styles.button, styles.buttonBlue)}
                  >
                    Редактировать
                  </button>
                )}
                <button
                  onClick={handleDelete}
                  className={classNames(styles.button, styles.buttonRed)}
                >
                  Удалить
                </button>
              </div>
            )}
          </div>
          <img
            className={styles.eventImage}
            src={event.image}
            alt={event.name}
          />
        </article>
      </NavLink>
    </li>
  );
};
