import { Center, OrbitControls } from '@react-three/drei';
import { Html } from '@react-three/drei';
import { MeshProps, useLoader, useThree } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import lerp from '@App/utils';

import BasicBox from '@components/BasicBox';
import Floor from '@components/Floor';
import FullScreenCanvas from '@components/FullScreenCanvas';
import Header from '@components/Header';
import LightBulb from '@components/LightBulb';
import { Section } from '@components/Section';

import styles from '@styles/Home.module.scss';

const HTMLContent = () => {
  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, 0, 0]}>
        <Html fullscreen>
          <h1>Hi</h1>
        </Html>
      </group>
    </Section>
  );
};

const EyeModel = () => {
  const gltf = useLoader(GLTFLoader, '/eye/eye.glb');
  const ref = useRef<any>();

  useFrame(({ mouse, camera }) => {
    vec.set(mouse.x * 2, mouse.x * 2, mouse.y * 2);
    ref.current.position.lerp(vec, 0.025);
    ref.current.rotation.y = lerp(mouse.x * 1.5, -mouse.x, 0.002);
  });

  return (
    <Suspense fallback={null}>
      <mesh ref={ref}>
        <primitive
          object={gltf.scene}
          position={[0, 10, 0]}
          scale={[5, 5, 5]}
        />
      </mesh>
    </Suspense>
  );
};

const vec = new Vector3();

function Rig() {
  return useFrame(({ camera, mouse }) => {
    vec.set(-100, 2 * mouse.y + 10, 10 * mouse.x);
    camera.position.lerp(vec, 0.025);
    camera.lookAt(0, 0, 0);
  });
}
export default function Home() {
  return (
    <div className={styles.scene}>
      <Header />
      <FullScreenCanvas>
        <LightBulb position={[-25, -5, 0]} />
        <LightBulb position={[25, 5, 0]} />
        <OrbitControls
          dampingFactor={1}
          minDistance={20}
          enablePan={false}
          enableRotate={false}
          enableZoom={false}
        />
        <ambientLight color="white" intensity={0.2} />
        <Center />
        <Rig />
        <EyeModel />

        <HTMLContent />
        {/* <BasicBox args={[10, 10, 10]} position={[0, 10, 0]} color={'#7FFFD4'} /> */}

        <Floor />
      </FullScreenCanvas>
    </div>
  );
}
