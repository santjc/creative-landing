import { Canvas } from '@react-three/fiber';

import CustomCursor from '@components/CustomCursor';
import PhongMeshConstructor from '@components/PhongMeshConstructor';

export default function Class() {
  const sizes = {
    width: 800,
    height: 600,
  };

  return (
    <div style={{ width: sizes.width, height: sizes.height }}>
      <Canvas
        flat
        linear
        shadows
        className="canvas"
        camera={{
          fov: 75,
          aspect: sizes.width / sizes.height,
        }}
      >
        <directionalLight position={[0, 10, 10]} intensity={1} />
        <CustomCursor />
        <PhongMeshConstructor
          color={0xff0000}
          size={[1, 1, 1]}
          position={[0, 0, 0]}
        >
          <boxBufferGeometry />
        </PhongMeshConstructor>

        <PhongMeshConstructor size={[5, 1, 5]} position={[0, -1, 0]}>
          <boxBufferGeometry />
        </PhongMeshConstructor>
      </Canvas>
    </div>
  );
}
//gsap.to(mesh.position, {duration: 1, delay: 2, x: 2})
