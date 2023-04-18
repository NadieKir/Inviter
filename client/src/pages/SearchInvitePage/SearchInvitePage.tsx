import { InviteCard } from 'components';
import { SearchInviteForm } from 'forms';

import styles from './SearchInvitePage.module.scss';

import { observer, useLocalObservable } from 'mobx-react-lite';
import { InviteListStore } from 'stores';

export const SearchInvitePage = observer(() => {
  const { isLoading, invites } = useLocalObservable(
    () => new InviteListStore(),
  );

  if (isLoading) return <div>Загрузка</div>;

  return (
    <section className={styles.section}>
      <div className={styles.searchForm}>
        <h1 className="heading-H1">Чем хотите заняться?</h1>
        <SearchInviteForm />
      </div>
      <ul className={styles.userCards}>
        {invites.map((invite) => (
          <InviteCard key={invite.id} invite={invite} />
        ))}
      </ul>
    </section>
  );
});
