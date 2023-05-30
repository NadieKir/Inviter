import { useContext } from 'react';

import { InviteStatus, mockedInvites } from 'models';
import { UserContext } from 'common/contexts';

import { ClosedInviteCard } from './components/ClosedInviteCard/ClosedInviteCard';

import styles from './ClosedInvites.module.scss';
import { observer } from 'mobx-react-lite';


export const ClosedInvites = observer(() => {
  const { user, userInvites, loadInvites } = useContext(UserContext);

  let invites = userInvites.filter(i => i.status === InviteStatus.CLOSED || i.companions.map(c => c._id).includes(user?._id!));

  return (
    <ul className={styles.closedInvites}>
      {invites.map((i) => (
        <ClosedInviteCard
          invite={i}
          onAction={async () => {
            await loadInvites();
          }}
        />
      ))}
    </ul>
  );
});
