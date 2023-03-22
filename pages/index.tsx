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
          <Model />
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

function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(
    '/laptop/laptop-transformed.glb'
  ) as GLTFResult;
  const modelRef = useRef<Group>(null!);
  const tl = useRef<GSAPTimeline>();
  const scroll = useScroll();
  const htmlRef = useRef<HTMLDivElement>(null!);
  const [startAnimation, setStartAnimation] = useState<GSAPTimeline>();

  useEffect(() => {
    tl.current = gsap.timeline({ paused: true });
    modelRef.current?.position.set(0, 20, 0);
    modelRef.current?.rotation.set(0, 0, 0);
    gsap.set(htmlRef.current, { opacity: 0 });
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
      )
      .to(
        htmlRef.current,
        {
          duration: 1,
          opacity: 1,
          ease: Power1.easeInOut,
          delay: 1,
        },
        'start'
      );
    setStartAnimation(_start);
  }, []);

  //TODO: NO SCROLL - BUTTONS - ICONS INSIDE PC SCREEN - COPY  https://codesandbox.io/s/mixing-html-and-webgl-w-occlusion-9keg6
  return (
    <>
      <Html fullscreen position={[0, 0, 0]}>
        <div ref={htmlRef} className={styles.modelControls}>
          <button
            className={styles.reverseBtn}
            onClick={() => startAnimation?.reverse()}
          >
            Reverse
          </button>
          <button
            className={styles.playBtn}
            onClick={() => startAnimation?.play()}
          >
            Play
          </button>
        </div>
      </Html>
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
        ></mesh>
      </group>
    </>
  );
}

useGLTF.preload('/laptop/laptop-transformed.glb');
