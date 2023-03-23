import { useNavigate } from "react-router-dom";
import classNames from "classnames";

import styles from "./NotFoundPage.module.scss";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const handleGoHome = () => navigate("/");

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.text}>Страница не найдена</h1>

      <div className={styles.picture}>
        <div className={styles.number}>4</div>
        <div className={styles.illustration}>
          <div className={styles.circle}></div>
          <div className={styles.clip}>
            <div className={styles.paper}>
              <div className={styles.face}>
                <div className={styles.eyes}>
                  <div className={classNames(styles.eye, styles.eyeLeft)}></div>
                  <div className={classNames(styles.eye, styles.eyeRight)}></div>
                </div>
                <div className={classNames(styles.cheeks, styles.cheeksLeft)}></div>
                <div className={classNames(styles.cheeks, styles.cheeksRight)}></div>
                <div className={styles.mouth}></div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.number}>4</div>
      </div>

      <button onClick={handleGoHome}>На главную</button>
    </section>
  );
};
