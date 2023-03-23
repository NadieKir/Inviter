import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";

import { ErrorFallback } from "components";

import styles from "./Layout.module.scss";

export const Layout = () => {
  return (
    <>
      <main className={styles.container}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Outlet />
        </ErrorBoundary>
      </main>
    </>
  );
};
