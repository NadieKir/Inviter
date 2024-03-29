import { groupBy } from 'lodash';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { InviteEventResponse } from 'models';
import { UserContext } from 'common/contexts';

import { InviteResponseCard } from './components/InviteResponseCard/InviteResponseCard';
import { InviteEventResponseCard } from './components/InviteEventResponseCard/InviteEventResponseCard';

import styles from './UserResponses.module.scss';

export const UserResponses = observer(() => {
  const { userResponses } = useContext(UserContext);

  const eventResponses = userResponses.filter((r) => r.invite.event);

  console.log(eventResponses);

  const groupedEventResponses = groupBy(
    eventResponses,
    (r) => r.invite.event?._id,
  );

  const inviteEventResponses: InviteEventResponse[] = Object.values(
    groupedEventResponses,
  ).map((gr) => ({
    event: gr[0].invite.event!,
    inviters: gr.flatMap((r) => r.invite),
  }));

  const inviteEventIds = inviteEventResponses
    .flatMap((i) => i.inviters)
    .map((i) => i._id);

  const filteredResponses = userResponses.filter(
    (r) => !inviteEventIds.includes(r.invite._id),
  );

  const responses = [...filteredResponses, ...inviteEventResponses].sort(
    (a, b) => {
      let aDate: string | number;
      let bDate: string | number;

      if ('inviters' in a) {
        aDate = a.event.date!;
      } else {
        aDate = a.invite.date ?? 0;
      }

      if ('inviters' in b) {
        bDate = b.event.date!;
      } else {
        bDate = b.invite.date ?? 0;
      }

      return new Date(aDate).getTime() - new Date(bDate).getTime();
    },
  );

  if (!responses.length) return <div>Здесь пока ничего нет</div>;

  return (
    <div className={styles.userResponses}>
      {responses.map((r) =>
        'inviters' in r ? (
          <InviteEventResponseCard key={r.event._id} inviteEventResponse={r} />
        ) : (
          <InviteResponseCard key={r.invite._id} invite={r.invite} />
        ),
      )}
    </div>
  );
});
