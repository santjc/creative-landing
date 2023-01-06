import styles from './Overlay.module.scss';

export default function Overlay() {
  const todayDate = new Date().toJSON().slice(0, 10);
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.date}>
          <p>{todayDate}</p>
          <a>
            santiago.colombatto
            <br />
            web developer
          </a>
        </div>

        <p className={styles.mantenimiento}>Under construction</p>
      </div>
    </div>
  );
}
