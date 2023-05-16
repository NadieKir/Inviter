import { useContext } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';

import { InviteCard, Loader, NothingFound } from 'components';
import { SearchInviteForm } from 'forms';
import { AnotherUsersInvitesStore } from 'stores';
import { UserContext } from 'common/contexts';
import { createOption } from 'types';

import styles from './SearchInvitePage.module.scss';

export const SearchInvitePage = observer(() => {
  const { user } = useContext(UserContext);

  if (!user) {
    return null;
  }

  const { isLoading, anotherUsersInvites, getAnotherUsersInvites } =
    useLocalObservable(() => new AnotherUsersInvitesStore({ city: user.city }));

  return (
    <section className={styles.section}>
      <div className={styles.searchForm}>
        <h1 className="heading-H1">Чем хотите заняться?</h1>
        <SearchInviteForm
          initialFilters={{
            city: createOption(user.city),
          }}
          onSubmit={(filters) => getAnotherUsersInvites(filters)}
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
              <InviteCard key={invite._id} invite={invite} />
            ))
          )}
        </ul>
      )}
    </section>
  );
});
