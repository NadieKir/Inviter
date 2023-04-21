import { observer, useLocalObservable } from 'mobx-react-lite';

import { EventCard } from 'components';
import { MockedEvent } from 'models';
import { SearchEventForm } from 'forms';
import { EventListStore } from 'stores';

import styles from './SearchEventPage.module.scss';

export const SearchEventPage = observer(() => {
  const { isLoading, events } = useLocalObservable(() => new EventListStore());

  // const events: MockedEvent[] = [
  //   { name: 'Конкурс бардовской песни', id: '1' },
  //   { name: 'Выставка домашних животных', id: '2' },
  //   { name: 'Новогодний марафон 1-5-10 километров', id: '3' },
  // ];

  return (
    <section className={styles.section}>
      <div className={styles.searchForm}>
        <h1 className="heading-H1">События в городе Минск</h1>
        <SearchEventForm />
      </div>
      {isLoading ? (
        <div>Загрузка</div>
      ) : (
        <ul className={styles.сards}>
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </ul>
      )}
    </section>
  );
});
