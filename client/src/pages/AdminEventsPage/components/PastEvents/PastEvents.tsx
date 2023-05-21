import { observer, useLocalObservable } from 'mobx-react-lite';

import { EventCard, Loader } from 'components';
import { EventListStore } from 'stores';
import { deleteEvent } from 'api';
import { CreateEventModal } from 'modals';
import { useModal, usePushNotification } from 'common/hooks';

import styles from './PastEvents.module.scss';

export const PastEvents = observer(() => {
  const { isLoading, events, setEvents } = useLocalObservable(
    () => new EventListStore({ tabType: 'past' }),
  );

  const { pushSuccess } = usePushNotification();

  if (isLoading) return <Loader />;

  const onEventDelete = async (id: string) => {
    await deleteEvent(id);

    const eventsWithoutDeleted = events.filter(e => e._id !== id);
    setEvents(eventsWithoutDeleted);
    pushSuccess("Событие успешно удалено")
  }

  return (
    <ul className={styles.сards}>
      {events.map((event) => (
        <EventCard
          key={event._id}
          event={event}
          isAdmin
          onDelete={onEventDelete}
        />
      ))}
    </ul>
  );
});
