import { Environment } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { DoubleSide, Vector3 } from 'three';

import CustomSetup from '@components/CustomSetup';
import PhongMeshConstructor from '@components/PhongMeshConstructor';

export default function Class() {
  const sizes = {
    width: 800,
    height: 600,
  };
  const vertices = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
  const newVertices = [];
  for (let i = 0; i < 50; i++) {
    for (let j = 0; j < 3; j++) {
      newVertices.push(
        new Vector3(Math.random(), Math.random(), Math.random())
      );
    }
  }

  return (
    <div style={{ width: sizes.width, height: sizes.height }}>
      <Canvas
        shadows
        className="canvas"
        camera={{
          fov: 75,
        }}
      >
        <ambientLight intensity={0.5} />
        <CustomSetup />
        <PhongMeshConstructor
          color={0xff0000}
          wireframe
          size={[1, 0.1, 1]}
          position={[0, 0, 0]}
        >
          <boxBufferGeometry />
        </PhongMeshConstructor>
        <mesh>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={vertices}
              count={vertices.length / 3}
              itemSize={3}
            />
          </bufferGeometry>

          <meshStandardMaterial
            vertexColors
            color={0xff0000}
            wireframe
            side={DoubleSide}
          />
        </mesh>
      </Canvas>
    </div>
  );
}
//001 - 008 done
