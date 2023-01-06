import { useFrame, useLoader } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { degToRad } from 'three/src/math/MathUtils';

import { clamp } from '@App/utils';

interface Props {
  path: string;
  position?: number[];
}
export default function Model({ path, position = [0, 0, 0] }: Props) {
  const vec = new Vector3();
  const gltf = useLoader(GLTFLoader, path);
  const ref = useRef<any>();

  useFrame((state) => {
    const xFactor = 1;
    const factor = 1;
    const yFactor = 1;
    const zFactor = 1;
    vec.set(
      state.mouse.x * 2,
      state.mouse.y * 2,
      state.mouse.x * state.mouse.y * 2
    );

    const t = state.clock.elapsedTime * (3 / 2);
    ref.current.rotation.set(
      clamp(
        Math.cos(t) +
          Math.sin(t * 1) / 10 +
          xFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 1) * factor) / 10,
        -0.1,
        0.1
      ),
      degToRad(90) +
        clamp(
          Math.sin(t) +
            Math.cos(t * 2) / 10 +
            yFactor +
            Math.sin((t / 10) * factor) +
            (Math.cos(t * 2) * factor) / 10,
          -0.5,
          0.5
        ),
      degToRad(
        -45 *
          clamp(
            Math.sin(t) +
              Math.cos(t * 2) / 10 +
              zFactor +
              Math.cos((t / 10) * factor) +
              (Math.sin(t * 3) * factor) / 10,
            -3,
           1
          )
      )
    );

    //ref.current.rotation.set(0, 0, 0);
    console.log(ref.current.rotation);

    //ref.current.position.lerp(vec, 0.5);
    // ref.current.rotation.y = degToRad(90) + state.mouse.x;
    // ref.current.rotation.z = degToRad(-45 * state.mouse.y);
  });

  return (
    <Suspense fallback={null}>
      <mesh position={new Vector3(...position) || [0, 0, 0]} ref={ref}>
        <primitive object={gltf.scene} scale={[5, 5, 5]} />
      </mesh>
    </Suspense>
  );
}
