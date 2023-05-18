import { useLocalObservable } from 'mobx-react-lite';

import { SearchInviteForm } from 'forms';
import { AnotherUsersInvitesStore } from 'stores';
import { InviteCard, Loader, NothingFound } from 'components';

import styles from './AdminInvitesPage.module.scss';

export const AdminInvitesPage = () => {
  const { isLoading, anotherUsersInvites, getAnotherUsersInvites } =
    useLocalObservable(() => new AnotherUsersInvitesStore());

  return (
    <section className={styles.section}>
      <div className={styles.searchForm}>
        <h1 className="heading-H1">
          Инвайты <span className="amount">()</span>{' '}
        </h1>
        <SearchInviteForm
          // initialFilters={{
          //   city: createOption(user.city),
          // }}
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
};
