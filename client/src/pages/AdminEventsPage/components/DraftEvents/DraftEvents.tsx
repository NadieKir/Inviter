import { mockedEvents } from 'models';
import { EventCard } from 'components';

import styles from './DraftEvents.module.scss';

export const DraftEvents = () => {
  return (
    <ul className={styles.сards}>
      {mockedEvents.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </ul>
  );
};
