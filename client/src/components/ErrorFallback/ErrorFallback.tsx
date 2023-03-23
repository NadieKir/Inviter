import styles from "./ErrorFallback.module.scss";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => (
  <div className={styles.wrapper} role="alert">
    <h1>Что-то пошло не так</h1>
    <h2>{error.message}</h2>
    <button onClick={resetErrorBoundary}>Попробовать снова</button>
  </div>
);
