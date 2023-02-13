import {
  Center,
  Html,
  OrbitControls,
  Scroll,
  ScrollControls,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Head from 'next/head';
import { Suspense, useMemo, useRef } from 'react';
import { BufferGeometry, Material, Mesh, Vector3 } from 'three';

import Footer from '@components/Footer';
import LightBulb from '@components/LightBulb';
import Model from '@components/Model';
import OrbitObject from '@components/OrbitObject';
import Overlay from '@components/Overlay';
import StackSection from '@components/StacksSection';
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
            <directionalLight
              position={[0, -10, 10]}
              color={'#8ac8c7'}
              intensity={0.05}
            />
            <Html fullscreen>
              <StackSection />
            </Html>
            <OrbitObject orbitRadius={100} speed={1}>
              <LightBulb position={[0, 0, 10]}></LightBulb>
            </OrbitObject>
            <Model path={'eye/eye.glb'} />
          </Canvas>
        </Suspense>
        <Footer />
      </div>
    </>
  );
}
