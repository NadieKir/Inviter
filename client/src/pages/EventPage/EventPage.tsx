import { observer, useLocalObservable } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import { Button, InviteCard, InviteCardVariant, Loader } from 'components';
import { EventStore } from 'stores';

import styles from './EventPage.module.scss';
import geo from 'assets/images/geo.svg';
import calendar from 'assets/images/calendar.svg';
import { InviteResponseCard } from 'components/InviteTabs/components';
import { mockedInvites } from 'models';

export const EventPage = observer(() => {
  const { id } = useParams();

  const { event, error, isLoading } = useLocalObservable(
    () => new EventStore(id!),
  );

  if (isLoading) return <Loader />;
  if (!event) throw error;

  return (
    <section className={styles.eventSection}>
      <div className={styles.eventInfoSection}>
        <div className={styles.photoButtonWrapper}>
          <img
            src={event.image}
            alt="Фото события"
            className={styles.eventPhoto}
          />
          {/* todo onclick */}
          <Button>Создать инвайт</Button>
        </div>
        <div className={styles.eventInfo}>
          <div className={styles.titleWrapper}>
            <h1 className="heading-H1">{event.name}</h1>
            <div className={styles.detailsWrapper}>
              <div className={styles.detail}>
                <img src={calendar} alt="" height={'14px'} />
                <span>{'todo'}</span>
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
          Вас приглашают <span className="amount">(4)</span>
        </h2>
        <div className={styles.invitersCards}>
          {mockedInvites.map((i) => (
            <InviteCard
              key={i._id}
              invite={i}
              variant={InviteCardVariant.SMALL_USER}
            />
          ))}
        </div>
      </div>
    </section>
  );
});
