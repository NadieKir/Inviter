import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { sortBy } from 'lodash';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import {
  Button,
  ButtonVariant,
  InviteCard,
  InviteCardVariant,
  Loader,
} from 'components';
import { EventStore } from 'stores';
import { CreateEventInviteModal } from 'modals';
import { useModal } from 'common/hooks';
import { getOverlapPercent, wordFormatDate } from 'common/helpers';
import { UserContext } from 'common/contexts';
import { SERVER_URL } from 'common/constants';
import { Gender, Invite, Role } from 'models';

import styles from './EventPage.module.scss';
import geo from 'assets/images/geo.svg';
import calendar from 'assets/images/calendar.svg';

export const EventPage = observer(() => {
  const { id } = useParams();
  const [suitableOnly, setSuitableOnly] = useState(false);
  const [sortedInvites, setSortedInvites] = useState<Invite[]>([]);

  const { user, userIsCreatorInvites, loadInvites } = useContext(UserContext);

  const { event, eventInvites, error, isLoading } = useLocalObservable(
    () => new EventStore(id!),
  );

  const [isCreateModalOpen, toggleCreateModal] = useModal();

  useEffect(() => {
    let invitesWithOverlapPercent: {
      invite: Invite;
      overlapPercent: string;
    }[] = [];

    if (eventInvites && user) {
      if (suitableOnly) {
        invitesWithOverlapPercent = eventInvites
          .filter((i) => i.companionGender.includes(Gender.FEMALE))
          .map((i) => ({
            invite: i,
            overlapPercent: getOverlapPercent(
              i.creator.interests,
              user.interests,
            ),
          }));
      } else {
        invitesWithOverlapPercent = eventInvites.map((i) => ({
          invite: i,
          overlapPercent: getOverlapPercent(
            i.creator.interests,
            user.interests,
          ),
        }));
      }
    }

    const invites = sortBy(invitesWithOverlapPercent, (i) => i.overlapPercent)
      .reverse()
      .map((i) => i.invite);

    setSortedInvites(invites);
  }, [suitableOnly, eventInvites]);

  if (isLoading) return <Loader />;
  if (!event || !eventInvites || !user) throw error;

  const renderInvites = () => {
    return (
      <div className={styles.invitersSection}>
        <h2 className={styles.invitersHeading}>
          Вас приглашают{' '}
          <span className="amount">
            ({isLoading ? '...' : eventInvites.length})
          </span>
        </h2>

        {suitableOnly ? (
          <button onClick={() => setSuitableOnly(false)}>Показать все</button>
        ) : (
          <button onClick={() => setSuitableOnly(true)}>
            Показать только подходящие
          </button>
        )}

        <div className={styles.invitersCards}>
          {sortedInvites.map((i) => (
            <InviteCard
              key={i._id}
              invite={i}
              variant={InviteCardVariant.EVENT_INVITE}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <section className={styles.eventSection}>
        <div className={styles.eventInfoSection}>
          <div className={styles.photoButtonWrapper}>
            <img
              src={SERVER_URL + event.image}
              alt="Фото события"
              className={styles.eventPhoto}
            />
            {user.role === Role.USER &&
              (userIsCreatorInvites
                .map((i) => i.event?._id)
                .includes(event._id) ? (
                <Button variant={ButtonVariant.Secondary} disabled>
                  Вы создали инвайт
                </Button>
              ) : (
                <Button onClick={() => toggleCreateModal()}>
                  Создать инвайт
                </Button>
              ))}
          </div>
          <div className={styles.eventInfo}>
            <div className={styles.titleWrapper}>
              <h1 className="heading-H1">{event.name}</h1>
              <div className={styles.detailsWrapper}>
                <div className={styles.detail}>
                  <img src={calendar} alt="" height={'14px'} />
                  <span>{wordFormatDate(event.date, event.time)}</span>
                </div>
                <div className={styles.detail}>
                  <img src={geo} alt="" height={'14px'} />
                  <span>
                    {event.city}, {event.address}
                  </span>
                </div>
              </div>
            </div>
            <p className={styles.paragraph}>{event.description}</p>
          </div>
        </div>

        {user.role === Role.USER &&
          eventInvites.length !== 0 &&
          renderInvites()}
      </section>

      <CreateEventInviteModal
        event={event}
        isShowing={isCreateModalOpen}
        onClose={toggleCreateModal}
        onSubmit={async () => {
          toggleCreateModal();

          await loadInvites();
        }}
      />
    </>
  );
});
