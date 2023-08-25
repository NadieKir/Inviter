import { useContext } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';

import { EventCard, Loader, NothingFound } from 'components';
import { SearchEventForm } from 'forms';
import { EventListStore } from 'stores';
import { UserContext } from 'common/contexts';
import { createOption } from 'types';

import styles from './SearchEventPage.module.scss';

export const SearchEventPage = observer(() => {
  const { user } = useContext(UserContext);

  if (!user) {
    return null;
  }

  const { isLoading, events, getEvents } = useLocalObservable(
    () => new EventListStore({ city: user.city, tabType: 'current' }),
  );

  return (
    <section className={styles.section}>
      <div className={styles.searchForm}>
        <h1 className="heading-H1">События</h1>
        <SearchEventForm
          initialFilters={{
            city: createOption(user.city),
          }}
          onSubmit={(filters) => getEvents({
            ...filters,
            tabType: 'current',
          })}
        />
      </div>
      {isLoading ? (
        <Loader />
      ) : events?.length === 0 ? (
        <NothingFound />
      ) : (
        <ul className={styles.сards}>
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </ul>
      )}
    </section>
  );
});
