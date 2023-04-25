import { useContext, useState } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Form, Formik, FormikHelpers } from 'formik';

import { Button, TextField } from 'components';
import { Modal, ModalProps } from 'modals';
import { Invite } from 'models';
import {
  concatUserNameAndAge,
  formatInviteDate,
  getInviteCompanionsInfoString,
} from 'common/helpers';
import { respondInvite } from 'api';
import { InviteRespondFormData, InviteRespondFormFields } from 'types';
import { UserContext } from 'common/contexts';

import styles from './InviteDetailsModal.module.scss';
import calendar from './assets/calendar.svg';
import geo from './assets/geo.svg';
import info from './assets/info.svg';

interface ViewInviteModalProps extends ModalProps {
  invite: Invite;
}

export const InviteDetailsModal = ({
  isShowing,
  onClose,
  invite,
}: ViewInviteModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { loadUserResponses } = useContext(UserContext);

  const onModalClose = () => {
    onClose();
    setCurrentStep(0);
  };

  const handleInviteRespond = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (
    values: InviteRespondFormData,
    actions: FormikHelpers<InviteRespondFormData>,
  ) => {
    try {
      await respondInvite(invite._id, values);
      loadUserResponses();
      onModalClose();
    } catch (error) {
      console.log(error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  const initialValues: InviteRespondFormData = {
    [InviteRespondFormFields.Message]: '',
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

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {(props) => (
            <Form className={styles.form}>
              <TextField
                name="message"
                placeholderText="Ваше сообщение"
                multiline={true}
                maxLetterCount={300}
              />
              <div className={styles.infoWrapper}>
                <img src={info} alt="Информация" />
                Пожалуйста, не используйте фраз, способных обидеть собеседника
              </div>
              <Button className={styles.submitButton} type="submit">
                Отправить заявку
              </Button>
            </Form>
          )}
        </Formik>
      </section>
    </Modal>
  );
};
