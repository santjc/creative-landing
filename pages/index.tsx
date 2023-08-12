import {
  ContactShadows,
  Environment,
  Html,
  OrbitControls,
  useGLTF,
} from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import Head from 'next/head';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Group, MathUtils, Mesh } from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { degToRad } from 'three/src/math/MathUtils';

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
          camera={{ position: [0, 30, 30] }}
          shadows
        >
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            dampingFactor={0.5}
            enableDamping
            maxAzimuthAngle={degToRad(15)}
            minAzimuthAngle={degToRad(-15)}
            maxPolarAngle={degToRad(45)}
            minPolarAngle={degToRad(65)}
          />

          <Environment path="/hdri/" files="potsdamer_platz_1k.hdr" />
          <Model />
          <ContactShadows
            position={[0, -10, 0]}
            scale={100}
            blur={1.5}
            far={10}
          />
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
type ModelProps = {
  pausedTimeline?: boolean;
};
function Model({ pausedTimeline = true }: ModelProps) {
  const { nodes, materials } = useGLTF(
    '/laptop/laptop-transformed.glb'
  ) as GLTFResult;

  const modelRef = useRef<Group>(null!);
  const tl = useRef<GSAPTimeline>();
  const screenModelRef = useRef<Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    modelRef.current.position.y = MathUtils.lerp(
      modelRef.current.position.y,
      modelRef.current.position.y + Math.sin(t) * 0.01,
      0.7
    );

    modelRef.current.rotation.z = MathUtils.lerp(
      modelRef.current.rotation.z,
      Math.sin(t) * 0.03,
      0.5
    );
  });

  useEffect(() => {
    if (!pausedTimeline) {
      tl.current?.play();
    }
  }, [pausedTimeline]);

  return (
    <group position={[0, -5, -15]} ref={modelRef}>
      <mesh
        castShadow
        geometry={nodes.Frame_ComputerFrame_0.geometry}
        material={materials.ComputerFrame}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 10.5]}
        scale={100}
      />

      <mesh
        castShadow
        ref={screenModelRef}
        geometry={nodes.Screen_ComputerScreen_0.geometry}
        material={materials.ComputerScreen}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        scale={100}
        renderOrder={1}
      >
        <Html position={[-0.001, 0.1, 0]} scale={0.05} fullscreen transform>
          <div className={styles.screenHtml}>
            <div className={styles.screenWindow}>
              <span className={styles.flag}>
                <span className={styles.flagsun} />
              </span>
              <div className={styles.screenBio}>
                <p>Hey there, I&apos;m Santiago, </p>
                <p>a web developer</p>
                <p>
                  Check out my{' '}
                  <a
                    href={'https://www.linkedin.com/in/santco/'}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.linkedin}
                  >
                    LinkedIn
                  </a>
                  , or{' '}
                  <a
                    href={'https://github.com/santjc'}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.github}
                  >
                    Github
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Html>
      </mesh>
    </group>
  );
}

useGLTF.preload('/laptop/laptop-transformed.glb');
