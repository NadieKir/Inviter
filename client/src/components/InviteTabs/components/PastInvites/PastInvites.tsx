import { useContext } from 'react';

import { InviteStatus } from 'models';
import { UserContext } from 'common/contexts';

import { ClosedInviteCard } from '../ClosedInvites/components/ClosedInviteCard/ClosedInviteCard';

import styles from './PastInvites.module.scss';

export function PastInvites() {
  const { user, userInvites, loadInvites } = useContext(UserContext);

  const invites = userInvites.filter((i) => {
    if (i.date) {
      return (
        (new Date(i.date) < new Date() && i.companions.map((c) => c._id).includes(user?._id!)) ||
        (new Date(i.date) < new Date() && i.creator._id === user?._id && i.companions.length > 0)
      );
    }

    return (
      (i.status === InviteStatus.PAST && i.companions.map((c) => c._id).includes(user?._id!)) ||
      (i.status === InviteStatus.PAST && i.creator._id === user?._id && i.companions.length > 0)
    );
  });

  return (
    <ul className={styles.pastInvites}>
      {invites.map((i) => (
        <ClosedInviteCard invite={i} />
      ))}
    </ul>
  );
}
