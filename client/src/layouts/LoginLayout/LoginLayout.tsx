import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import { Button, ButtonHeight, ButtonWidth } from 'components';
import { ErrorFallback } from 'pages';

import styles from './LoginLayout.module.scss';
import youtube from './assets/youtube.svg';
import logo from './assets/white-logo.svg';
import promoImage1 from './assets/promo-image-1.jpg';
import promoImage2 from './assets/promo-image-2.jpg';
import promoImage3 from './assets/promo-image-3.jpg';

interface PageContent {
  buttonName: string;
  heading: string;
  buttonLink: string;
}

interface PathToPageContent {
  [key: string]: PageContent;
}

const pageContentByPathDescriptor: PathToPageContent = {
  '/login': {
    buttonName: 'Зарегистрироваться',
    heading: 'Войти',
    buttonLink: '/registration',
  },
  '/registration': {
    buttonName: 'Войти',
    heading: 'Регистрация',
    buttonLink: '/login',
  },
};

export const LoginLayout = () => {
  const location = useLocation();

  const getCurrentPathContent = () =>
    pageContentByPathDescriptor[location.pathname];

  const [currentPageContent, setCurrentPageContent] = useState(
    getCurrentPathContent,
  );

  useEffect(() => {
    setCurrentPageContent(getCurrentPathContent());
  }, [location]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <section className={styles.loginSection}>
        <header className={styles.header}>
          <div className={styles.logoWrapper}>
            <img src={logo} alt="Логотип" />
            <p>Пора найти, с кем провести этот вечер</p>
          </div>

          <div className={styles.promoImages}>
            <div className={styles.promoImage}>
              <img src={promoImage1} alt="Промо изображение" />
              <span>
                #<span className="blue">сходить_на_шоппинг</span>
              </span>
            </div>
            <div className={styles.promoImage}>
              <img src={promoImage2} alt="Промо изображение" />
              <span>
                #<span className="blue">попробовоть_дессерт</span>
              </span>
            </div>
            <div className={styles.promoImage}>
              <img src={promoImage3} alt="Промо изображение" />
              <span>
                #<span className="blue">посмотреть_фильм</span>
              </span>
            </div>
          </div>

          <Link
            to="https://www.tiktok.com/@me.nadie/video/7174027533573213445"
            className={styles.promoButton}
          >
            <img src={youtube} alt="Youtube" />
            Смотреть промо ролик
          </Link>
        </header>
        <section className={styles.formSection}>
          <div className={styles.actions}>
            <div className={styles.links}>
              <Link to="#">О нас</Link>
              <Link to="#">Правовая информация</Link>
            </div>
            <Link to={currentPageContent.buttonLink}>
              <Button width={ButtonWidth.Small} height={ButtonHeight.Small}>
                {currentPageContent.buttonName}
              </Button>
            </Link>
          </div>

          <div className={styles.formWrapper}>
            <h1 className={styles.heading}>{currentPageContent.heading}</h1>
            <Outlet />
          </div>
          <div></div>
        </section>
      </section>
    </ErrorBoundary>
  );
};
