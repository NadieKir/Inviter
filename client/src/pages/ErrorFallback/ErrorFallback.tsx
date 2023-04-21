import { useErrorBoundary } from 'react-error-boundary';

import { Button, ButtonWidth } from 'components';

import styles from './ErrorFallback.module.scss';

interface ErrorFallbackProps {
  error: Error;
}

export const ErrorFallback = ({ error }: ErrorFallbackProps) => {
  const { resetBoundary } = useErrorBoundary();

  return (
    <section className={styles.wrapper} role="alert">
      <h1 className={styles.heading}>Что-то пошло не так</h1>
      <p className={styles.message}>{error.message}</p>
      <Button width={ButtonWidth.Small} onClick={resetBoundary}>
        Попробовать снова
      </Button>
    </section>
  );
};
