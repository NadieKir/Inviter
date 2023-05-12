import { groupBy } from 'lodash';

import { InviteEventResponse, mockedInviteResponses } from 'models';

import { InviteResponseCard } from './components/InviteResponseCard/InviteResponseCard';
import { InviteEventResponseCard } from './components/InviteEventResponseCard/InviteEventResponseCard';

import styles from './UserResponses.module.scss';

export function UserResponses() {
  const eventResponses = mockedInviteResponses.filter((r) => r.invite.event);

  const groupedEventResponses = groupBy(
    eventResponses,
    (r) => r.invite.event!._id,
  );
  const inviteEventResponses: InviteEventResponse[] = Object.values(
    groupedEventResponses,
  ).map((gr) => ({
    event: gr[0].invite.event!,
    inviters: gr.flatMap((r) => r.invite),
  }));

  const responses = [...mockedInviteResponses, ...inviteEventResponses].sort(
    (a, b) => {
      let aDate: string | number;
      let bDate: string | number;

      if ('inviters' in a) {
        aDate = a.event.date;
      } else {
        aDate = a.invite.date ?? 0;
      }

      if ('inviters' in b) {
        bDate = b.event.date;
      } else {
        bDate = b.invite.date ?? 0;
      }

      return new Date(aDate).getTime() - new Date(bDate).getTime();
    },
  );

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
}
