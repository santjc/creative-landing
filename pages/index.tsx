import {
  Center,
  Html,
  OrbitControls,
  Scroll,
  ScrollControls,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import Footer from '@components/Footer';
import Model from '@components/Model';
import Overlay from '@components/Overlay';

export default function Home() {
  return (
    <>
      <div style={{ width: '100%', height: '100vh' }}>
        <Overlay />
        <Canvas
          camera={{ fov: 100, position: [0, 0, 50] }}
          gl={{ alpha: false, antialias: false, stencil: false, depth: false }}
          dpr={[1, 1.5]}
        >
          {/* <ScrollControls damping={6} pages={1}>
            <Scroll> */}
          <directionalLight position={[0, -10, 10]} intensity={0.2} />
          <directionalLight position={[0, 50, 10]} intensity={0.04} />
          <Center />
          <Model path={'/eye/eye.glb'} />
          {/* </Scroll>
          </ScrollControls> */}
        </Canvas>
        <Footer />
      </div>
    </>
  );
}
