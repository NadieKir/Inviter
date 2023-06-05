import { useState } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';

import { SearchInviteForm } from 'forms';
import { AnotherUsersInvitesStore } from 'stores';
import { InviteCard, Loader, NothingFound } from 'components';
import { SearchInviteFilters } from 'types';

import styles from './AdminInvitesPage.module.scss';

export const AdminInvitesPage = observer(() => {
  const { isLoading, anotherUsersInvites, getAnotherUsersInvites } =
    useLocalObservable(() => new AnotherUsersInvitesStore());
  const [currentFilters, setCurrentFilters] = useState<SearchInviteFilters>();

  return (
    <section className={styles.section}>
      <div className={styles.searchForm}>
        <h1 className="heading-H1">
          Инвайты <span className="amount">({anotherUsersInvites.length})</span>{' '}
        </h1>
        <SearchInviteForm
          onSubmit={(filters) => {
            setCurrentFilters(filters);
            getAnotherUsersInvites(filters);
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
                onInviteAction={() => getAnotherUsersInvites(currentFilters)}
              />
            ))
          )}
        </ul>
      )}
    </section>
  );
});
