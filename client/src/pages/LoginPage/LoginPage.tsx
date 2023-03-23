import { ErrorFallback } from "components";
import { ErrorBoundary } from "react-error-boundary";

import styles from "./LoginPage.module.scss";

export const LoginPage = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <section className={styles.loginSection}>логин</section>
    </ErrorBoundary>
  );
};
