import { NavLink } from 'react-router-dom';

import { Event } from 'models';
import { wordFormatDate } from 'common/helpers';

import styles from './EventCard.module.scss';
import calendar from 'assets/images/calendar.svg';

interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
  return (
    <li>
      <NavLink to={`/events/${event._id}`}>
        <article className={styles.card}>
          <div className={styles.infoWrapper}>
            <div className={styles.date}>
              <img src={calendar} alt="Дата" height={'15px'} />
              {wordFormatDate(event.date, event.time)}
            </div>
            <div className={styles.headingDescription}>
              <h2 className={styles.heading}>{event.name}</h2>
              <p className={styles.description}>{event.description}</p>
            </div>
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
