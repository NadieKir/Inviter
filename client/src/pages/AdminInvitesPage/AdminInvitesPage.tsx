import { useState } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';

import { SearchInviteForm } from 'forms';
import { AnotherUsersInvitesStore } from 'stores';
import { InviteCard, Loader, NothingFound } from 'components';
import { City } from 'models';
import { SearchInviteFilters } from 'types';

import styles from './AdminInvitesPage.module.scss';


const defaultFilter: SearchInviteFilters = { city: City.MINSK };

export const AdminInvitesPage = observer(() => {
  const { isLoading, anotherUsersInvites, getAnotherUsersInvites } =
    useLocalObservable(
      () => new AnotherUsersInvitesStore(defaultFilter),
    );
  const [currentFilters, setCurrentFilters] = useState<SearchInviteFilters>(defaultFilter);

  return (
    <section className={styles.section}>
      <div className={styles.searchForm}>
        <h1 className="heading-H1">
          Инвайты <span className="amount">({anotherUsersInvites.length})</span>{' '}
        </h1>
        <SearchInviteForm
          onSubmit={(filters) => {
            setCurrentFilters(filters);
            getAnotherUsersInvites(filters)
          }}
        />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <ul className={styles.userCards}>
          {anotherUsersInvites.length === 0 ? (
            <NothingFound />
          ) : (
            anotherUsersInvites.map((invite) => (
              <InviteCard
                key={invite._id}
                invite={invite}
                isAdmin
                onInviteAction={() => getAnotherUsersInvites(currentFilters)}
              />
            ))
          )}
        </ul>
      )}
    </section>
  );
});