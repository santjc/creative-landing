import { MeshProps, useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import { Mesh } from 'three';

interface Props {
  color: number;
  position: [number, number, number];
}

export default function BasicBox({ color, position }: Props): JSX.Element {
  const ref = useRef<Mesh>(null!);
  return (
    <mesh ref={ref} position={position}>
      <boxGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
