import { NavLink } from 'react-router-dom';
import { MockedEvent } from 'models';

import styles from './EventCard.module.scss';
import mockEvent from 'assets/images/mockEvent.jpg';
import mockUser from 'assets/images/mock-user-photo.jpg';
import calendar from 'assets/images/calendar.svg';

interface EventCardProps {
  event: MockedEvent;
}

export const EventCard = ({ event }: EventCardProps) => {
  return (
    <li>
      <NavLink to="#">
        <article className={styles.card}>
          <div className={styles.infoWrapper}>
            <div className={styles.date}>
              <img src={calendar} alt="Дата" height={'16px'} />
              21 ноября в 18:30
            </div>
            <div className={styles.headingDescription}>
              <h2 className={styles.heading}>{event.name}</h2>
              <p className={styles.description}>
                Есть много вариантов Lorem Ipsum, но большинство из них имеет не
                всегда приемлемые модификации, например, юмористические вставки
                или слова, которые даже отдалённо не напоминают латынь.
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
          <img className={styles.eventImage} src={mockEvent} alt={event.name} />
        </article>
      </NavLink>
    </li>
  );
};
