import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import styles from '@styles/Home.module.css';

import BasicBox from '@components/BasicBox';
import Floor from '@components/Floor';
import FullScreenCanvas from '@components/FullScreenCanvas';
import LightBulb from '@components/LightBulb';

export default function Home() {
  return (
    <div className={styles.scene}>
      <FullScreenCanvas>
        <LightBulb position={[-25, -5, 0]} />
        <LightBulb position={[25, 5, 0]} />
        <OrbitControls
          dampingFactor={1}
          minDistance={20}
          enablePan={false}
          enableRotate={false}
          enableZoom={false}
          autoRotate
        />
        <ambientLight color="white" intensity={0.2} />
        <BasicBox
          args={[10, 10, 10]}
          position={[0, 10, 0]}
          color={'#e5f4ff'}
        />
        <Floor />
      </FullScreenCanvas>
    </div>
  );
}
