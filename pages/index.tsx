import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import styles from '@styles/Home.module.css';

import Floor from '@components/Floor';
import LightBulb from '@components/LightBulb';

export default function Home() {
  return (
    <div className={styles.scene}>
      <Canvas
        shadows={true}
        className={styles.canvas}
        camera={{
          position: [-20, 5, 0],
        }}
      >
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
        <ambientLight color="white" intensity={0.3} />
        <Floor />
      </Canvas>
    </div>
  );
}
