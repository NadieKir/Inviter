import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

import { Navbar } from 'components';
import { ErrorFallback } from 'pages';
import { Role } from 'models';

import styles from './MainLayout.module.scss';
import { observer } from 'mobx-react-lite';

interface MainLayoutProps {
  variant?: Role;
}

export const MainLayout = observer(
  ({ variant = Role.USER }: MainLayoutProps) => (
    <section className={styles.appWrapper}>
      <Navbar variant={variant} />
      <main className={styles.main}>
        <div className={styles.mainAppContainer}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Outlet />
          </ErrorBoundary>
        </div>
      </main>
    </section>
  ),
);
