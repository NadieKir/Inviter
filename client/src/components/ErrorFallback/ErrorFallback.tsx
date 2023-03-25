import { Button, ButtonSize } from 'components';

import styles from './ErrorFallback.module.scss';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) => (
  <div className={styles.wrapper} role="alert">
    <h1 className={styles.heading}>Что-то пошло не так</h1>
    <p className={styles.message}>{error.message}</p>
    <Button size={ButtonSize.Small} onClick={resetErrorBoundary}>
      Попробовать снова
    </Button>
  </div>
);
