import {
  Center,
  Environment,
  Html,
  OrbitControls,
  ScrollControls,
  useGLTF,
  useScroll,
} from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import gsap, { Power1 } from 'gsap';
import Head from 'next/head';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Group } from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { degToRad, lerp } from 'three/src/math/MathUtils';

import Overlay from '@components/Overlay';
import SuspenseFallback from '@components/SuspenseFallback';

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
          camera={{ position: [0, 50, 100], fov: 60 }}
        >
          <directionalLight intensity={0.7} position={[0, 50, 10]} />
          <pointLight color={'red'} intensity={1} position={[0, 10, -30]} />

          <ScrollControls pages={1}>
            <Model />

            <Html fullscreen>
              <div className={styles.container}>
                <h1>Sample Text One</h1>
                <h3>Scroll down!</h3>
              </div>
              <ModelHtml />
            </Html>
          </ScrollControls>
        </Canvas>
      </Suspense>
    </>
  );
}

type GLTFResult = GLTF & {
  nodes: {
    Frame_ComputerFrame_0: THREE.Mesh;
    Screen_ComputerScreen_0: THREE.Mesh;
  };
  materials: {
    ComputerFrame: THREE.MeshStandardMaterial;
    ComputerScreen: THREE.MeshStandardMaterial;
  };
};
function ModelHtml() {
  const htmlRef = useRef<HTMLDivElement>(null!);
  const tl = useRef<GSAPTimeline>();
  const scroll = useScroll();
  return (
    <div
      ref={htmlRef}
      style={{ transform: 'translateY(100vh)' }}
      className={styles.modelHtml}
    >
      <h1>Sample Text Two</h1>
      <h3>Sample Text Three</h3>
    </div>
  );
}
function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(
    '/laptop/laptop-transformed.glb'
  ) as GLTFResult;
  const modelRef = useRef<Group>(null!);
  const tl = useRef<GSAPTimeline>();
  const scroll = useScroll();
  const [startAnimation, setStartAnimation] = useState<GSAPTimeline>();
  const [endAnimation, setEndAnimation] = useState<GSAPTimeline>();

  useEffect(() => {
    tl.current = gsap.timeline({ paused: true });
    modelRef.current?.position.set(0, 20, 0);
    modelRef.current?.rotation.set(0, 0, 0);
    const _start = tl.current
      ?.add('start')
      .to(
        modelRef.current?.position,
        {
          duration: 1,
          y: lerp(0, 50, 0.7),
          z: lerp(modelRef.current?.position.z, 125, 0.75),
          ease: Power1.easeInOut,
          delay: 0.5,
        },
        'start'
      )
      .to(
        modelRef.current?.rotation,
        {
          duration: 1,
          y: lerp(modelRef.current?.rotation.y, 8.98, 0.7),
          x: lerp(modelRef.current?.rotation.x, -0.7, 0.7),
          ease: Power1.easeInOut,
          delay: 1,
        },
        'start'
      );
    setStartAnimation(_start);
  }, []);

  useFrame(({ camera }) => {
    if (scroll.offset > 0.5) {
      startAnimation?.play();
    }
    if (scroll.offset < 0.3) {
      startAnimation?.reverse();
    }
  });

  return (
    <>
      <group {...props} ref={modelRef} dispose={null}>
        <mesh
          geometry={nodes.Frame_ComputerFrame_0.geometry}
          material={materials.ComputerFrame}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          geometry={nodes.Screen_ComputerScreen_0.geometry}
          material={materials.ComputerScreen}
          position={[0, 0.65, -10.3]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={[100, 100, 88.24]}
        />
      </group>
    </>
  );
}

useGLTF.preload('/laptop/laptop-transformed.glb');
