import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";

import { ErrorFallback, Navbar } from "components";

import styles from "./Layout.module.scss";

export const Layout = () => (
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
