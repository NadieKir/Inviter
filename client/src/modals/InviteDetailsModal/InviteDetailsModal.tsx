import { useContext, useState } from 'react';
import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';

import { Button, ButtonType, ButtonVariant } from 'components';
import { CreateEventInviteModal, CreateInviteModal, Modal, ModalProps } from 'modals';
import { Invite, Role } from 'models';
import { InviteResponseForm } from 'forms';
import {
  concatUserNameAndAge,
  getInviteCompanionsInfoString,
  lowercaseFirstLetter,
  wordFormatDate,
} from 'common/helpers';

import styles from './InviteDetailsModal.module.scss';
import calendar from './assets/calendar.svg';
import geo from './assets/geo.svg';
import ticket from 'assets/images/navbarIcons/ticket.svg';
import { deleteInvite, deleteInviteResponse } from 'api';
import { useModal, usePushNotification } from 'common/hooks';
import { SERVER_URL } from 'common/constants';
import { UserContext } from 'common/contexts';

export enum InviteModalType {
  Response = 'response',
  Delete = 'Delete',
  DeleteResponse = 'DeleteResponse',
  Edit = 'Edit',
}

interface ViewInviteModalProps extends ModalProps {
  invite: Invite;
  modalType?: InviteModalType;
  onInviteAction?: (inviteId: string) => void;
}

export const InviteDetailsModal = ({
  isShowing,
  onInviteAction,
  onClose,
  invite,
  modalType = InviteModalType.Response,
}: ViewInviteModalProps) => {
  const { user, userIsAdmin, loadResponses, loadInvites } = useContext(UserContext);
  const [currentStep, setCurrentStep] = useState(0);

  const { pushSuccess, pushError } = usePushNotification();

  const [isEditInviteModalOpen, toggleEditInviteModal] = useModal();

  const onModalClose = () => {
    onClose();
    setCurrentStep(0);
  };

  const onInviteDelete = async () => {
    try {
      await deleteInvite(invite._id);
    } catch (e) {
      pushError('Не удалось удалить инвайт');
    }

    pushSuccess('Инвайт успешно удален');
    onInviteAction?.(invite._id);

    await loadInvites();

    onClose();
  };

  const onInviteResponseDelete = async () => {
    try {
      await deleteInviteResponse(invite._id);
    } catch (e) {
      pushError('Не удалось отменить отклик на инвайт');
    }

    pushSuccess('Отклик на инвайт успешно отменен');
    onInviteAction?.(invite._id);

    await loadResponses();
    onClose();
  };

  const renderActions = () => {
    switch (modalType) {
      case InviteModalType.Response:
        return (
          <>
            <Button onClick={() => setCurrentStep(1)}>Откликнуться</Button>
          </>
        );
      case InviteModalType.Delete:
        return (
          <Button
            buttonType={ButtonType.Danger}
            variant={ButtonVariant.Secondary}
            onClick={onInviteDelete}
          >
            Удалить
          </Button>
        );
      case InviteModalType.DeleteResponse:
        return (
          <Button
            buttonType={ButtonType.Danger}
            variant={ButtonVariant.Secondary}
            onClick={onInviteResponseDelete}
          >
            Отменить отклик
          </Button>
        );
      case InviteModalType.Edit:
        return (
          <>
            <Button
              variant={ButtonVariant.Secondary}
              onClick={toggleEditInviteModal}
            >
              Редактировать
            </Button>
            <Button
              buttonType={ButtonType.Danger}
              variant={ButtonVariant.Secondary}
              onClick={onInviteDelete}
            >
              Удалить
            </Button>
          </>
        );
    }
  };

  const renderModal = () => {
    if (!invite) {
      return null;
    }

    if (invite.event) {
      return (
        <CreateEventInviteModal
          invite={invite}
          event={invite.event as string}
          isShowing={isEditInviteModalOpen}
          onClose={toggleEditInviteModal}
          onSubmit={async () => {
            await loadInvites();
            onModalClose();
          }}
          isEdit
        />);
    }

    return (
      <CreateInviteModal
        invite={invite}
        isShowing={isEditInviteModalOpen}
        onClose={toggleEditInviteModal}
        onSubmit={async () => {
          await loadInvites();
          onModalClose();
        }}
        isEdit
      />
    );
  }

  return (
    <>
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
                src={SERVER_URL + invite.creator.image}
                alt="Фото пользователя"
              />
              <span>{concatUserNameAndAge(invite.creator)}</span>
            </NavLink>
            <div className={styles.inviteInfo}>
              <h1 className={styles.heading}>
                {invite.event ? 'Посетить' : 'Хочет'}{' '}
                <span className="blue">
                  {lowercaseFirstLetter(invite.subject)}
                </span>
              </h1>
              <p className={styles.whoWithDescription}>
                {getInviteCompanionsInfoString(invite)}
              </p>
              <p className={styles.description}>{invite.description}</p>
              <div className={styles.details}>
                {invite.event && (
                  <div className={styles.detail}>
                    <img src={ticket} alt="Мероприятие" height={'17px'} />
                    <Link
                      to={`/${user!.role === Role.ADMIN ? 'admin/' : ''}events/${invite.event
                        }`}
                      onClick={onModalClose}
                    >
                      Смотреть мероприятие
                    </Link>
                  </div>
                )}
                <div className={styles.detail}>
                  <img src={calendar} alt="Дата и время" height={'17px'} />
                  {wordFormatDate(invite.date, invite.time)}
                </div>
                <div className={styles.detail}>
                  <img src={geo} alt="Локация" height={'17px'} />
                  {invite.city} {invite.address && `, ${invite.address}`}
                </div>
              </div>
            </div>
          </div>
          {!userIsAdmin && (
            <div className={styles.actions}>{renderActions()}</div>
          )}
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

      {renderModal()}
    </>
  );
};
