import { InviteCard } from 'components';
import { SearchInviteForm } from 'forms';
import { MockedUser } from 'models';

import styles from './SearchInvitePage.module.scss';

export const SearchInvitePage = () => {
  const users: MockedUser[] = [
    { name: 'Ирина', id: '1' },
    { name: 'Владимир', id: '2' },
    { name: 'Полина', id: '3' },
    { name: 'Ангелина', id: '4' },
    { name: 'Павел', id: '5' },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.searchForm}>
        <h1 className="heading-H1">Чем хотите заняться?</h1>
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
