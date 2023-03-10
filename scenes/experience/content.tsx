import { Html } from '@react-three/drei';

import Overlay from '@components/Overlay';

import styles from './Experience.module.scss';

export default function ExperienceContent() {
  return (
    <Html
      fullscreen
      style={{ transform: 'translateY(100%)' }}
      className={styles.container}
    >
      <Overlay menu={false}>
        <div className={styles.headlineContent}>
          <h1 className={styles.headline}>
            Ex <br></br>pe <br></br>ri <br></br>ence
          </h1>
          <span className={styles.verticalLine}></span>
          <h3 className={styles.brief}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          </h3>
        </div>
      </Overlay>
    </Html>
  );
}
