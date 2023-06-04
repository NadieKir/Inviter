import { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { UserContext } from 'common/contexts';

import { CreatedInviteCard } from './components/CreatedInviteCard/CreatedInviteCard';
import { InviteStatus } from 'models';

import styles from './CreatedInvites.module.scss';

export const CreatedInvites = observer(() => {
  const { user, userInvites, loadInvites } = useContext(UserContext);

  const createdInvites = userInvites.filter(i => {
    if (i.date) {
      return i.creator._id === user?._id && i.status === InviteStatus.CREATED && new Date(i.date) > new Date()
    }

    return i.creator._id === user?._id && i.status === InviteStatus.CREATED
  });

  return (
    <ul className={styles.createdInvites}>
      {createdInvites.map((i) => (
        <CreatedInviteCard
          key={i._id}
          invite={i}
          onAction={loadInvites}
        />
      ))}
    </ul>
  );
});
