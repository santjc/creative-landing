import MenuButton from './MenuButton';
import styles from './Overlay.module.scss';

interface Props {
  maintenance?: boolean;
}
export default function Overlay({ maintenance = false }: Props) {
  const todayDate = new Date().toJSON().slice(0, 10);
  return (
    <div className={styles.overlay}>
      <div
        className={styles[maintenance === true ? 'container' : 'menuContainer']}
      >
        {maintenance === true && (
          <>
            <div className={styles.date}>
              <p>{todayDate}</p>
              <a>
                santiago.colombatto
                <br />
                web developer
              </a>
            </div>

            <p className={styles.mantenimiento}>Under construction</p>
          </>
        )}
        {maintenance === false && (
          <>
            <div className={styles.logo}>
              <a>SC</a>
            </div>
            <div className={styles.menuOpt}>
              <MenuButton text={'about.'} />
              <MenuButton text={'contact.'} />
              <MenuButton text={'extra.'} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
