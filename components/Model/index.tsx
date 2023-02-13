import { useFrame, useLoader } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { degToRad, lerp } from 'three/src/math/MathUtils';

import { clamp } from '@App/utils';

interface Props {
  path: string;
}
export default function Model({ path }: Props) {
  const gltf = useLoader(GLTFLoader, path);
  const ref = useRef<any>();

  useFrame((state) => {
    const xFactor = 0.5;
    const factor = 1;
    const yFactor = 0.1;
    const smoothing = 0.1;

    const t = state.clock.elapsedTime * (2.4 / 2);
    ref.current.rotation.x +=
      (clamp(Math.cos(t) + Math.sin(t * 1), -0.1, 0.1) -
        ref.current.rotation.x) *
      smoothing;
    ref.current.rotation.y +=
      (degToRad(90) +
        clamp(Math.sin(t * factor) + Math.cos(t * yFactor), -0.7, 0.7) -
        ref.current.rotation.y) *
      smoothing;
    ref.current.rotation.z +=
      (degToRad(
        -45 * clamp(Math.sin(t * factor) + Math.cos(t * 2 * xFactor), -1, 1)
      ) -
        ref.current.rotation.z) *
      smoothing;

    ref.current.position.set(
      Math.cos(t) +
        Math.sin(t * 1) / 10 +
        xFactor +
        Math.cos((t / 10) * factor) +
        (Math.sin(t * 1) * factor) / 10,
      Math.sin(t) +
        Math.cos(t * 2) / 10 +
        yFactor +
        Math.sin((t / 10) * factor) +
        (Math.cos(t * 2) * factor) / 10,
      Math.sin(t) +
        Math.cos(t * 2) / 10 +
        xFactor * yFactor +
        Math.cos((t / 10) * factor) +
        (Math.sin(t * 3) * factor) / 10
    );
  });

  return (
    <mesh position={[0, 0, 0]} ref={ref}>
      <primitive object={gltf.scene} scale={[5, 5, 5]} />
    </mesh>
  );
}
