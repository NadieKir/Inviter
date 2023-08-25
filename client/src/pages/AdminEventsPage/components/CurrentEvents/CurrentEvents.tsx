import { useState } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';

import { EventCard, Loader } from 'components';
import { EventListStore } from 'stores';
import { Event } from 'models';

import { CreateEventModal } from 'modals';
import { deleteEvent } from 'api';
import { SearchEventFilters } from 'types';
import { useModal, usePushNotification } from 'common/hooks';

import styles from './CurrentEvents.module.scss';

const defaultFilter: SearchEventFilters = { tabType: 'current' };

export const CurrentEvents = observer(() => {
  const { isLoading, events, setEvents, getEvents } = useLocalObservable(
    () => new EventListStore(defaultFilter),
  );
  const { pushSuccess, pushError } = usePushNotification();

  const [isEditEventModalOpen, toggleEditEventModal] = useModal();
  const [eventToEdit, setEventToEdit] = useState<Event | null>(null);

  if (isLoading) return <Loader />;

  const onEventEdit = (event: Event) => {
    setEventToEdit(event);
    toggleEditEventModal();
  };

  const onEventDelete = async (id: string) => {
    try {
      await deleteEvent(id);

      const eventsWithoutDeleted = events.filter((e) => e._id !== id);
      setEvents(eventsWithoutDeleted);
      pushSuccess('Событие успешно удалено');
    } catch (e) {
      console.log(e);
      pushError('Событие не было удалено');
    }
  };

  return (
    <>
      <ul className={styles.сards}>
        {events.map((event) => (
          <EventCard
            key={event._id}
            event={event}
            isAdmin
            onDelete={onEventDelete}
            onEdit={onEventEdit}
          />
        ))}
      </ul>
      {eventToEdit && (
        <CreateEventModal
          isShowing={isEditEventModalOpen}
          onClose={() => {
            toggleEditEventModal();
          }}
          onSubmit={async () => {
            await getEvents(defaultFilter);
            toggleEditEventModal();
          }}
          event={eventToEdit}
          isEdit
        />
      )}
    </>
  );
});
