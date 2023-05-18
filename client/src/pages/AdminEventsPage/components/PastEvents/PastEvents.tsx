import { mockedEvents } from 'models';
import { EventCard } from 'components';

import styles from './PastEvents.module.scss';

export const PastEvents = () => {
  return (
    <ul className={styles.сards}>
      {mockedEvents.map((event) => (
        <EventCard key={event._id} event={event} isAdmin />
      ))}
    </ul>
  );
};
