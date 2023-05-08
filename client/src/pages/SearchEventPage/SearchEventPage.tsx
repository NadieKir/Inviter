import { useContext } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';

import { EventCard, Loader } from 'components';
import { SearchEventForm } from 'forms';
import { EventListStore } from 'stores';
import { UserContext } from 'common/contexts';
import { createOption } from 'types';

import styles from './SearchEventPage.module.scss';

export const SearchEventPage = observer(() => {
  const { user } = useContext(UserContext);

  console.log(user);

  if (!user) {
    return null;
  }

  const { isLoading, events, getEvents } = useLocalObservable(
    () => new EventListStore({ city: user.city })
  );

  return (
    <section className={styles.section}>
      <div className={styles.searchForm}>
        <h1 className="heading-H1">События в городе Минск</h1>
        <SearchEventForm
          initialFilters={{
            city: createOption(user.city)
          }}
          onSubmit={getEvents}
        />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        events?.length === 0
          ? (
            <span>События с указанными фильтрами не найдены</span>
          )
          : (
            <ul className={styles.сards}>
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </ul>
          )
      )}
    </section>
  );
});
