import { mockedInvites } from 'models';
import { CurrentInviteCard } from './components/CurrentInviteCard/CurrentInviteCard';

import styles from './CurrentInvites.module.scss';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { InviteListStore } from 'stores';

export const CurrentInvites = observer(() => {
  const { currentUserInvites } = useLocalObservable(
    () => new InviteListStore(),
  );

  return (
    <ul className={styles.currentInvites}>
      {[...currentUserInvites, ...mockedInvites].map((i) => (
        <CurrentInviteCard invite={i} />
      ))}
    </ul>
  );
});
