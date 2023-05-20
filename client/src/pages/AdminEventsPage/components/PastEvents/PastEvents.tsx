import { observer, useLocalObservable } from 'mobx-react-lite';

import { EventCard, Loader } from 'components';

import styles from './PastEvents.module.scss';
import { EventListStore } from 'stores';
import { deleteEvent } from 'api';

export const PastEvents = observer(() => {
  const { isLoading, events, setEvents } = useLocalObservable(
    () => new EventListStore({ tabType: 'past' }),
  );

  if (isLoading) return <Loader />;

  const onEventDeleted = async (id: string) => {
    await deleteEvent(id);

    const eventsWithoutDeleted = events.filter(e => e._id !== id);
    setEvents(eventsWithoutDeleted);
  }

  return (
    <ul className={styles.сards}>
      {events.map((event) => (
        <EventCard
          key={event._id}
          event={event}
          isAdmin
          onDelete={onEventDeleted}
        />
      ))}
    </ul>
  );
});
