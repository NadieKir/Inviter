import { useState } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { Button } from 'components';
import { Modal, ModalProps } from 'modals';
import { Invite } from 'models';
import { InviteResponseForm } from 'forms';
import {
  concatUserNameAndAge,
  formatInviteDate,
  getInviteCompanionsInfoString,
} from 'common/helpers';

import styles from './InviteDetailsModal.module.scss';
import calendar from './assets/calendar.svg';
import geo from './assets/geo.svg';

interface ViewInviteModalProps extends ModalProps {
  invite: Invite;
}

export const InviteDetailsModal = ({
  isShowing,
  onClose,
  invite,
}: ViewInviteModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const onModalClose = () => {
    onClose();
    setCurrentStep(0);
  };

  const handleInviteRespond = () => {
    setCurrentStep(1);
  };

  return (
    <Modal isShowing={isShowing} onClose={onModalClose}>
      <section
        className={classNames(styles.modal, {
          [styles.hide]: currentStep !== 0,
        })}
      >
        <div className={styles.mainWrapper}>
          <NavLink
            to={`/user/${invite.creator.login}`}
            className={styles.userInfo}
          >
            <img
              className={styles.userPhoto}
              src={invite.creator.image}
              alt="Фото пользователя"
            />
            <span>{concatUserNameAndAge(invite.creator)}</span>
          </NavLink>
          <div className={styles.inviteInfo}>
            <h1 className={styles.heading}>
              Хочет <span className="blue">{invite.subject}</span>
            </h1>
            <p className={styles.whoWithDescription}>
              {getInviteCompanionsInfoString(invite)}
            </p>
            <p className={styles.description}>{invite.description}</p>
            <div className={styles.details}>
              <div className={styles.detail}>
                <img src={calendar} alt="Дата и время" />
                {formatInviteDate(invite.date, invite.time)}
              </div>
              <div className={styles.detail}>
                <img src={geo} alt="Локация" />
                {invite.city} {invite.address && `, ${invite.address}`}
              </div>
            </div>
          </div>
        </div>
        <Button onClick={handleInviteRespond}>Откликнуться</Button>
      </section>

      <section
        className={classNames(styles.secondStepModal, {
          [styles.hide]: currentStep !== 1,
        })}
      >
        <h1 className={styles.heading}>Добавьте сообщение</h1>
        <p className={styles.description}>
          Заявки с прикреплённым сообщением имеют больший шанс быть выбранными
        </p>

        <InviteResponseForm inviteId={invite._id} onModalClose={onModalClose} />
      </section>
    </Modal>
  );
};
