import React from 'react';

import { Invite } from 'models';
import { concatUserNameAndAge } from 'common/helpers';
import { useInviteDetailsModalContext } from 'common/contexts';
import { InviteModalType } from 'modals';

import styles from './InviterItem.module.scss';
import more from 'assets/images/more.svg';
import { NavLink } from 'react-router-dom';

type Props = {
  component?: 'div' | 'li';
  invite: Invite;
};

export function InviterItem({ component = 'div', invite }: Props) {
  const { openModal } = useInviteDetailsModalContext();

  return React.createElement(
    component,
    { className: styles.inviterItem },
    <>
      <NavLink
        to={`/user/${invite.creator.login}`}
        className={styles.inviterItemInfo}
      >
        <img
          className={styles.inviterItemImage}
          src={invite.creator.image}
          alt={invite.creator.name}
        />
        <span className={styles.inviterItemName}>
          {concatUserNameAndAge(invite.creator)}
        </span>
      </NavLink>
      <img
        className={styles.cross}
        onClick={() => openModal(invite, InviteModalType.Delete)}
        src={more}
        alt={''}
      />
    </>,
  );
}
