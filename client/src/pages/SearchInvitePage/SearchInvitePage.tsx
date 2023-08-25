import { useContext, useEffect, useState } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';

import { InviteCard, Loader, NothingFound } from 'components';
import { SearchInviteForm } from 'forms';
import { AnotherUsersInvitesStore } from 'stores';
import { UserContext } from 'common/contexts';
import { createOption } from 'types';
import { getAge, isAgeSuitable } from 'common/helpers';

import styles from './SearchInvitePage.module.scss';

export const SearchInvitePage = observer(() => {
  const { user, loadResponses } = useContext(UserContext);
  const [suitableOnly, setSuitableOnly] = useState(false);

  if (!user) {
    return null;
  }

  const { isLoading, anotherUsersInvites, getAnotherUsersInvites } =
    useLocalObservable(() => new AnotherUsersInvitesStore({ city: user.city }));

  const renderInvites = () => {
    let invitesToShow = anotherUsersInvites;

    if (suitableOnly) {
      invitesToShow = invitesToShow.filter(
        (i) =>
          i.companionGender.includes(user.gender) &&
          (i.companionAge
            ? isAgeSuitable(getAge(new Date(user.birthday)), i.companionAge)
            : true),
      );
    }

    if (invitesToShow.length === 0) return <NothingFound />;

    return invitesToShow.map((invite) => (
      <InviteCard
        key={invite._id}
        invite={invite}
        onInviteAction={loadResponses}
      />
    ));
  };

  return (
    <section className={styles.section}>
      <div className={styles.searchForm}>
        <div className={styles.headingBtnWrapper}>
          <h1 className="heading-H1">Чем хотите заняться?</h1>
          {suitableOnly ? (
            <button
              className={styles.btn}
              onClick={() => setSuitableOnly(false)}
            >
              Показать все
            </button>
          ) : (
            <button
              className={styles.btn}
              onClick={() => setSuitableOnly(true)}
            >
              Показать только подходящие
            </button>
          )}
        </div>
        <SearchInviteForm
          initialFilters={{
            city: createOption(user.city),
          }}
          onSubmit={(filters) => getAnotherUsersInvites(filters)}
        />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <ul className={styles.userCards}>{renderInvites()}</ul>
      )}
    </section>
  );
});
