import { NavLink } from 'react-router-dom';

import { Event } from 'models';
import { isInThePast, wordFormatDate } from 'common/helpers';

import styles from './EventCard.module.scss';
import calendar from 'assets/images/calendar.svg';
import classNames from 'classnames';
import { deleteEvent } from 'api';
import { useLocalObservable } from 'mobx-react-lite';
import { EventListStore } from 'stores';

interface EventCardProps {
  event: Event;
  isAdmin?: boolean;
  onDelete?: (eventId: string) => void;
}

export const EventCard = ({ event, isAdmin = false, onDelete }: EventCardProps) => {
  const handleEdit = () => { };

  return (
    <li>
      <NavLink to={`/admin/events/${event._id}`}>
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
                {!isInThePast(event.date, event.time) && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      handleEdit();
                    }}
                    className={classNames(styles.button, styles.buttonBlue)}
                  >
                    Редактировать
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    onDelete?.(event._id);
                  }}
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
