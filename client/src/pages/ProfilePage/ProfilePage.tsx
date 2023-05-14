import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';

import {
  Button,
  ButtonHeight,
  ButtonVariant,
  Loader,
  PasswordField,
} from 'components';
import { UserContext } from 'common/contexts';
import { concatUserNameAndAge, formatDate } from 'common/helpers';
import { ChangePasswordFields, ChangePasswordFormData } from 'types';

import styles from './ProfilePage.module.scss';
import at from 'assets/images/at.svg';
import geo from 'assets/images/geo.svg';
import { updateUserPassword } from 'api';
import { useModal, usePushNotification } from 'common/hooks';
import { AxiosError } from 'axios';
import { EditProfileModal } from 'modals/EditProfileModal/EditProfileModal';


const changePasswordInitialValues = {
  [ChangePasswordFields.OldPassword]: '',
  [ChangePasswordFields.NewPassword]: '',
  [ChangePasswordFields.ConfirmNewPassword]: '',
};

const changePasswordSchema = Yup.object().shape({
  [ChangePasswordFields.OldPassword]: Yup.string().min(6, 'Введите минимум 6 символа')
    .required('Введите старый пароль'),
  [ChangePasswordFields.NewPassword]: Yup.string().min(6, 'Введите минимум 6 символа')
    .required('Введите новый пароль'),
  [ChangePasswordFields.ConfirmNewPassword]: Yup.string()
    .oneOf(
      [Yup.ref("newPassword"), null],
      'Пароли должны совпадать',
    )
    .required('Подтвердите пароль'),
});

export const ProfilePage = () => {
  const navigate = useNavigate();

  const { user, logout, isLoading, error } = useContext(UserContext);

  const { pushSuccess, pushError } = usePushNotification();

  const [isEditProfileModalOpen, toggleEditProfileModal] = useModal();

  if (isLoading) return <Loader />;
  if (!user) throw error;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handlePasswordChange = async (values: ChangePasswordFormData, action: FormikHelpers<ChangePasswordFormData>) => {
    const payload = {
      userId: user._id,
      formData: values,
    };

    try {
      await updateUserPassword(payload);
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      console.log(error);

      pushError("Ошибка. Пароль не был изменен", error.response?.data?.message ?? '')

      return;
    }

    pushSuccess("Пароль успешно обновлен");
    action.resetForm();
  };

  return (
    <>
      <section className={styles.userPageSection}>
        <section className={styles.userInfo}>
          <div className={styles.briefWrapper}>
            <img
              src={user.image}
              alt="Фото пользователя"
              className={styles.userPhoto}
            />
            <div className={styles.brief}>
              <h1 className="heading-H1">{concatUserNameAndAge(user)}</h1>
              <div className={styles.nicknameCity}>
                <div className={styles.nicknameCityWrapper}>
                  <img src={at} alt="Никнейм" height="14px" />
                  {user.login}
                </div>
                <div className={styles.nicknameCityWrapper}>
                  <img src={geo} alt="Город" height="14px" />
                  {user.city}
                </div>
              </div>
              <p className={styles.welcomeMessage}>{user.welcomeMessage}</p>
            </div>
            {/* todo onclick */}
            <Button
              variant={ButtonVariant.Secondary}
              height={ButtonHeight.Small}
              onClick={() => toggleEditProfileModal()}
            >
              Изменить анкету
            </Button>
          </div>

          <div className={styles.questionnaireInterestsWrapper}>
            <div className={styles.questionnaireSection}>
              <h2 className="heading-H2">Анкета</h2>
              <div className={styles.questionnairesWrapper}>
                <div className={styles.questionnaire}>
                  <div className={styles.questionnaireRow}>
                    <span className={styles.subject}>День рождения</span>
                    <span className={styles.description}>
                      {formatDate(new Date(user.birthday))}
                    </span>
                  </div>
                  <div className={styles.questionnaireRow}>
                    <span className={styles.subject}>Ориентация</span>
                    <span className={styles.description}>{user.orientation}</span>
                  </div>
                  <div className={styles.questionnaireRow}>
                    <span className={styles.subject}>Отношения</span>
                    <span className={styles.description}>
                      {user.familyStatus}
                    </span>
                  </div>
                  <div className={styles.questionnaireRow}>
                    <span className={styles.subject}>Языки</span>
                    <span className={styles.description}>
                      {user.languages.join(', ')}
                    </span>
                  </div>
                  <div className={styles.questionnaireRow}>
                    <span className={styles.subject}>Курение</span>
                    <span className={styles.description}>
                      {user.smokingAttitude}
                    </span>
                  </div>
                  <div className={styles.questionnaireRow}>
                    <span className={styles.subject}>Алкоголь</span>
                    <span className={styles.description}>
                      {user.alcoholAttitude}
                    </span>
                  </div>
                  <div className={styles.questionnaireRow}>
                    <span className={styles.subject}>Возраст компаньонов</span>
                    <span className={styles.description}>
                      {user.preferredAge}
                    </span>
                  </div>
                </div>
                <div className={styles.questionnaire}>
                  <div className={styles.questionnaireRow}>
                    <span className={styles.subject}>Контакты</span>
                    <span className={styles.description}>25</span>
                  </div>
                  <div className={styles.questionnaireRow}>
                    <span className={styles.subject}>Подписчики</span>
                    <span className={styles.description}>44</span>
                  </div>
                  <div className={styles.questionnaireRow}>
                    <span className={styles.subject}>Подписки</span>
                    <span className={styles.description}>215</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.interestsSection}>
              <h2
                className={classNames('heading-H2', styles.questionnaireHeading)}
              >
                Интересы
              </h2>
              <div className={styles.interestsTags}>
                {user.interests.map((interest) => {
                  return <div className={styles.interestTag}>{interest}</div>;
                })}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.passwordLogoutSection}>
          <div className={styles.passwordFormSection}>
            <h2 className={styles.passwordFormHeading}>Изменить пароль</h2>
            <Formik
              initialValues={changePasswordInitialValues}
              validationSchema={changePasswordSchema}
              onSubmit={handlePasswordChange}
            >
              {(props) => (
                <Form className={styles.form}>
                  <PasswordField name="oldPassword" placeholderText='Старый пароль' />
                  <PasswordField name="newPassword" placeholderText='Новый пароль' />
                  <PasswordField name="confirmNewPassword" placeholderText='Повтор нового пароля' />

                  <Button
                    type="submit"
                    variant={ButtonVariant.Secondary}
                    disabled={!props.isValid || !props.dirty}
                  >
                    Изменить
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
          <Button onClick={handleLogout}>Выйти</Button>
        </section>
      </section>

      <EditProfileModal
        isShowing={isEditProfileModalOpen}
        onClose={toggleEditProfileModal}
      />
    </>
  );
};
