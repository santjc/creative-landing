import { Vector3, Vector3Props, useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import { Mesh } from 'three';

import LightBulb from '@components/LightBulb';

interface Props {
  children?: React.ReactNode;
  orbitRadius: number;
  speed?: number;
}
export default function OrbitObject({
  children,
  orbitRadius,
  speed = 1,
}: Props) {
  const ref = useRef<any>();
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    ref.current.position.set(
      t * Math.sin(t) * orbitRadius,
      0,
      t * Math.cos(t) * orbitRadius
    );
  });
  return <mesh ref={ref}>{children}</mesh>;
}
