import { Button, ButtonWidth } from 'components';

import styles from './ErrorFallback.module.scss';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) => (
  <section className={styles.wrapper} role="alert">
    <h1 className={styles.heading}>Что-то пошло не так</h1>
    <p className={styles.message}>{error.message}</p>
    <Button width={ButtonWidth.Small} onClick={resetErrorBoundary}>
      Попробовать снова
    </Button>
  </section>
);
