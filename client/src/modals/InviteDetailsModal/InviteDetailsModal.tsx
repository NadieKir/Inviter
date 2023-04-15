import { useState } from 'react';
import classNames from 'classnames';
import { Form, Formik, FormikHelpers } from 'formik';

import { Modal, ModalProps } from 'modals';
import { Invite } from 'models';
import { Button, TextField } from 'components';

import styles from './InviteDetailsModal.module.scss';
import mockUser from 'assets/images/mock-user-photo.jpg';
import calendar from './assets/calendar.svg';
import geo from './assets/geo.svg';
import info from './assets/info.svg';

interface ViewInviteModalProps extends ModalProps {
  invite?: Invite;
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

  const handleSubmit = (
    values: { respondMessage: string },
    actions: FormikHelpers<{ respondMessage: string }>,
  ) => {
    alert(JSON.stringify(values));
    onModalClose();
  };

  return (
    <Modal isShowing={isShowing} onClose={onModalClose}>
      <section
        className={classNames(styles.modal, {
          [styles.hide]: currentStep !== 0,
        })}
      >
        <div className={styles.mainWrapper}>
          <div className={styles.userInfo}>
            <img
              className={styles.userPhoto}
              src={mockUser}
              alt="Фото пользователя"
            />
            <span>Ирина, 28</span>
          </div>
          <div className={styles.inviteInfo}>
            <h1 className={styles.heading}>
              Хочет <span className="blue">выпить кофе</span>
            </h1>
            <p className={styles.whoWithDescription}>С девушкой, 20-25 лет</p>
            <p className={styles.description}>
              Ищу девушку, с которой можем сходить на “Вишнёвый сад” в театре
              музкомедии 21 числа в 18:30. Билеты с меня :) thr gvrijsgvoi iudgj
              idg iug etdigjoed r gorijs erf jrpso pt
            </p>
            <div className={styles.details}>
              <div className={styles.detail}>
                <img src={calendar} alt="Дата и время" />
                21 ноября в 18:30
              </div>
              <div className={styles.detail}>
                <img src={geo} alt="Локация" />
                Санкт-Петербург, ул. Иванова д.23
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

        <Formik initialValues={{ respondMessage: '' }} onSubmit={handleSubmit}>
          {(props) => (
            <Form className={styles.form}>
              <TextField
                name="respondMessage"
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
