import { useContext } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import { Button, InviteCard, InviteCardVariant, Loader } from 'components';
import { EventStore } from 'stores';
import { CreateEventInviteModal } from 'modals';
import { useModal } from 'common/hooks';
import { getOverlapPercent, wordFormatDate } from 'common/helpers';
import { UserContext } from 'common/contexts';

import styles from './EventPage.module.scss';
import geo from 'assets/images/geo.svg';
import calendar from 'assets/images/calendar.svg';
import { sortBy } from 'lodash';


export const EventPage = observer(() => {
  const { id } = useParams();

  const { user } = useContext(UserContext);

  const { event, eventInvites, error, isLoading } = useLocalObservable(
    () => new EventStore(id!),
  );

  const [isCreateModalOpen, toggleCreateModal] = useModal();

  if (isLoading) return <Loader />;
  if (!event || !eventInvites || !user) throw error;

  const invitesWithOverlapPercent = eventInvites.map(i => ({ invite: i, overlapPercent: getOverlapPercent(user.interests, i.creator.interests) }));
  const sortedInvites = sortBy(invitesWithOverlapPercent, (i) => i.overlapPercent).reverse().map(i => i.invite);

  console.log(sortedInvites);

  return (
    <>
      <section className={styles.eventSection}>
        <div className={styles.eventInfoSection}>
          <div className={styles.photoButtonWrapper}>
            <img
              src={event.image}
              alt="Фото события"
              className={styles.eventPhoto}
            />
            <Button onClick={() => toggleCreateModal()}>Создать инвайт</Button>
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

        <div className={styles.invitersSection}>
          <h2 className={styles.invitersHeading}>
            Вас приглашают <span className="amount">({isLoading ? '...' : eventInvites.length})</span>
          </h2>
          <div className={styles.invitersCards}>
            {eventInvites.length !== 0
              ? sortedInvites.map((i) => (
                <InviteCard
                  key={i._id}
                  invite={i}
                  variant={InviteCardVariant.SMALL_USER}
                />
              ))
              : <span>Инвайтов события не найдено</span>}
          </div>
        </div>
      </section>

      <CreateEventInviteModal
        event={event}
        isShowing={isCreateModalOpen}
        onClose={toggleCreateModal}
      />
    </>
  );
});
