import { Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import BasicBox from '@components/BasicBox';

export default function Class() {
  const sizes = {
    width: 800,
    height: 600,
  };

  return (
    <>
      <Canvas
        className="canvas"
        camera={{
          position: [0, 5, 5],
          fov: 75,
          aspect: sizes.width / sizes.height,
        }}
      >
        <axesHelper />
        <Environment preset={'city'} />
        <ambientLight intensity={0.5} />
        <BasicBox color={0xff0000} position={[0, 0, 0]} />
      </Canvas>
    </>
  );
}
//Video 005 - min 23
