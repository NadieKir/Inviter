import { NavLink } from 'react-router-dom';
import { Event, MockedEvent } from 'models';

import styles from './EventCard.module.scss';
import mockEvent from 'assets/images/mockEvent.jpg';
import mockUser from 'assets/images/mock-user-photo.jpg';
import calendar from 'assets/images/calendar.svg';
import { formatDate, wordFormatDate } from 'common/helpers';

interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
  return (
    <li>
      <NavLink to="#">
        <article className={styles.card}>
          <div className={styles.infoWrapper}>
            <div className={styles.date}>
              <img src={calendar} alt="Дата" height={'16px'} />
              {wordFormatDate(event.date, event.time)}
            </div>
            <div className={styles.headingDescription}>
              <h2 className={styles.heading}>
                {event.name}
              </h2>
              <p className={styles.description}>
                {event.description}
              </p>
            </div>
            <div className={styles.users}>
              <img src={mockUser} alt="Фото пользователя" />
              <img src={mockEvent} alt="Фото пользователя" />
              <img src={mockUser} alt="Фото пользователя" />
              <img src={mockEvent} alt="Фото пользователя" />
              <div className={styles.restCounter}>+44</div>
            </div>
          </div>
          <div className={styles.imageWrapper}>
            <div className={styles.imageHolder}>
              <img className={styles.eventImage} src={event.image} alt={event.name} />
            </div>
          </div>
        </article>
      </NavLink>
    </li>
  );
};
