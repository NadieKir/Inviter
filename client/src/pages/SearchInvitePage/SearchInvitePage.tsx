import { observer, useLocalObservable } from 'mobx-react-lite';

import { InviteCard, Loader } from 'components';
import { SearchInviteForm } from 'forms';
import { AnotherUsersInvitesStore } from 'stores';
import { useContext } from 'react';
import { UserContext } from 'common/contexts'

import styles from './SearchInvitePage.module.scss';
;

export const SearchInvitePage = observer(() => {
  const { user } = useContext(UserContext);

  if (!user) {
    return null;
  }

  const { isLoading, anotherUsersInvites, getAnotherUsersInvites } = useLocalObservable(
    () => new AnotherUsersInvitesStore({ city: user.city }),
  );

  console.log(anotherUsersInvites);

  return (
    <section className={styles.section}>
      <div className={styles.searchForm}>
        <h1 className="heading-H1">Чем хотите заняться?</h1>
        <SearchInviteForm
          initialFilters={{
            city: {
              label: user.city,
              value: user.city
            },
          }}
          onSubmit={(filters) => getAnotherUsersInvites(filters)} />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <ul className={styles.userCards}>
          {anotherUsersInvites.length === 0
            ? (
              <span>
                Инвайты по указанным фильтрам не найдены
              </span>
            )
            : anotherUsersInvites.map((invite) => (
              <InviteCard key={invite._id} invite={invite} />
            ))}
        </ul>
      )}
    </section>
  );
});
