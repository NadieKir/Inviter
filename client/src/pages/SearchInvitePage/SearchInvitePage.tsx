import { observer, useLocalObservable } from 'mobx-react-lite';

import { InviteCard } from 'components';
import { SearchInviteForm } from 'forms';
import { AnotherUsersInvitesStore } from 'stores';

import styles from './SearchInvitePage.module.scss';

export const SearchInvitePage = observer(() => {
  const { isLoading, anotherUsersInvites } = useLocalObservable(
    () => new AnotherUsersInvitesStore(),
  );

  return (
    <section className={styles.section}>
      <div className={styles.searchForm}>
        <h1 className="heading-H1">Чем хотите заняться?</h1>
        <SearchInviteForm />
      </div>
      {isLoading ? (
        <div>Загрузка</div>
      ) : (
        <ul className={styles.userCards}>
          {anotherUsersInvites.map((invite) => (
            <InviteCard key={invite.id} invite={invite} />
          ))}
        </ul>
      )}
    </section>
  );
});
