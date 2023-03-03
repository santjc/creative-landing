import { Center, Html } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Head from 'next/head';
import { Suspense } from 'react';

import Overlay from '@components/Overlay';
import SuspenseFallback from '@components/SuspenseFallback';
import Dots from '@components/ThreeJS/Dots';

import styles from '@styles/Home.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>santco.site</title>
      </Head>
      <Suspense fallback={<SuspenseFallback />}>
        <Canvas
          style={{ width: '100vw', height: '100vh' }}
          flat
          orthographic
          camera={{ zoom: 20 }}
        >
          <Dots />
          <Center />
          <Html fullscreen>
            <Overlay>
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
        </Canvas>
      </Suspense>
    </>
  );
}
