import {
  Center,
  Html,
  OrbitControls,
  Scroll,
  ScrollControls,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Head from 'next/head';
import { Suspense } from 'react';

import AboutSection from '@components/AboutSection';
import Footer from '@components/Footer';
import LightBulb from '@components/LightBulb';
import Model from '@components/Model';
import OrbitObject from '@components/OrbitObject';
import Overlay from '@components/Overlay';
import SuspenseFallback from '@components/SuspenseFallback';

export default function Home() {
  return (
    <>
      <Head>
        <title>santco.site</title>
      </Head>
      <div style={{ width: '100vw', height: '100vh' }}>
        <Suspense fallback={<SuspenseFallback />}>
          <Overlay />
          <Canvas
            id="c"
            camera={{ fov: 100, position: [0, 0, 50] }}
            gl={{
              alpha: false,
              antialias: false,
              stencil: false,
              depth: false,
            }}
            dpr={[1, 1.5]}
          >
            <Center />
            <Html fullscreen>
              <AboutSection />
            </Html>
          </Canvas>
        </Suspense>
      </div>
    </>
  );
}
