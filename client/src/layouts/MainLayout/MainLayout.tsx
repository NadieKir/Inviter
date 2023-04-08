import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

import { Navbar } from 'components';
import { ErrorFallback } from 'pages';

import styles from './MainLayout.module.scss';

export const MainLayout = () => (
  <section className={styles.appWrapper}>
    <Navbar />
    <main className={styles.main}>
      <div className={styles.mainAppContainer}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Outlet />
        </ErrorBoundary>
      </div>
    </main>
  </section>
);
