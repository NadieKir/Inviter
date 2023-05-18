import { mockedEvents } from 'models';
import { EventCard } from 'components';

import styles from './CurrentEvents.module.scss';

export const CurrentEvents = () => {
  return (
    <ul className={styles.сards}>
      {mockedEvents.map((event) => (
        <EventCard key={event._id} event={event} isAdmin />
      ))}
    </ul>
  );
};
