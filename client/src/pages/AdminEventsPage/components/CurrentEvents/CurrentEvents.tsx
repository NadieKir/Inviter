import { observer, useLocalObservable } from 'mobx-react-lite';

import { EventCard, Loader } from 'components';
import { EventListStore } from 'stores';

import styles from './CurrentEvents.module.scss';

export const CurrentEvents = observer(() => {
  const { isLoading, events } = useLocalObservable(
    () => new EventListStore({ tabType: 'current' }),
  );

  if (isLoading) return <Loader />;

  return (
    <ul className={styles.сards}>
      {events.map((event) => (
        <EventCard key={event._id} event={event} isAdmin />
      ))}
    </ul>
  );
});
