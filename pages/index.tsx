import { Scroll, ScrollControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Head from 'next/head';
import { Suspense } from 'react';

import Experience from '@App/scenes/experience';
import Landing from '@App/scenes/landing';

import SuspenseFallback from '@components/SuspenseFallback';

export default function Home() {
  return (
    <>
      <Head>
        <title>santco.site</title>
      </Head>
      <Canvas
        style={{ width: '100vw', height: '100vh' }}
        flat
        orthographic
        camera={{ position: [0, 0, 20], zoom: 20 }}
      >
        <Suspense fallback={<SuspenseFallback />}>
          <ScrollControls pages={1}>
            <Scroll>
              <Landing />
            </Scroll>
            <Scroll>
              <Experience />
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </>
  );
}
