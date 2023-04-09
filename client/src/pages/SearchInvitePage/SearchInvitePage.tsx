import { InviteCard } from 'components';
import { SearchInviteForm } from 'forms';
import { MockedUser, User } from 'models';

import styles from './SearchInvitePage.module.scss';

export const SearchInvitePage = () => {
  const users: MockedUser[] = [
    { name: 'ss', id: '1' },
    { name: 'ss', id: '2' },
    { name: 'ss', id: '3' },
    { name: 'ss', id: '4' },
    { name: 'ss', id: '5' },
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
