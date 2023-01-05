import { Center, OrbitControls } from '@react-three/drei';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import { randInt } from 'three/src/math/MathUtils';

import EyeModel from '@components/EyeModel';
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

const vec = new Vector3();

function Rig() {
  return useFrame(({ camera, mouse }) => {
    vec.set(-100, 2 * mouse.y + 10, 10 * mouse.x);
    camera.position.lerp(vec, 0.025);
    //camera.lookAt(0, 0, 0);
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
        <ambientLight color="white" intensity={0.1} />
        <Center />
        <EyeModel />
        <Rig />
        <HTMLContent />
      </FullScreenCanvas>
    </div>
  );
}
