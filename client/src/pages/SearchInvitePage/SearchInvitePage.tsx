import { InviteCard } from 'components';
import { SearchInviteForm } from 'forms';

import styles from './SearchInvitePage.module.scss';

export const SearchInvitePage = () => {
  const users = [
    { name: 'ss', surname: 'dd', id: '1' },
    { name: 'ss', surname: 'dd', id: '2' },
    { name: 'ss', surname: 'dd', id: '3' },
    { name: 'ss', surname: 'dd', id: '4' },
    { name: 'ss', surname: 'dd', id: '5' },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.searchForm}>
        <h1 className={styles.heading}>Чем хотите заняться?</h1>
        <SearchInviteForm />
      </div>
      <ul className={styles.userCards}>
        {users.map((user) => (
          <InviteCard key={user.id} user={user} />
        ))}
      </ul>
    </section>
  );
};
