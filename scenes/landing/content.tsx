import { Html } from '@react-three/drei';

import Overlay from '@components/Overlay';

import styles from '@styles/Home.module.scss';

export default function LandingContent() {
  return (
    <Html fullscreen>
      <Overlay background={'rgba(0,0,0,0.75)'}>
        <div className={styles.container}>
          <div className={styles.presentation}>
            <p className={styles.jobTitle}>web developer</p>
            <h1 className={styles.nameTitle}>
              SANTIAGO <br />
              COLOMBATTO
            </h1>
            <p className={styles.basedIn}>based in Argentina.</p>
          </div>
        </div>
        <footer className={styles.footer}>
          <a
            className={styles.getInTouch}
            href={'mailto:sjcolombatto@gmail.com'}
          >
            get in touch
          </a>
          -
          <a
            className={styles.getInTouch}
            href={'https://github.com/santjc'}
            rel={'noreferrer'}
            target="_blank"
          >
            GitHub
          </a>
          -
          <a
            href={'https://linkedin.com/in/santco'}
            rel={'noreferrer'}
            target="_blank"
            className={styles.linkedin}
          >
            LinkedIn
          </a>
        </footer>
      </Overlay>
    </Html>
  );
}
