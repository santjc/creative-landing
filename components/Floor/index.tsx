import { useRef } from 'react';
import { Mesh } from 'three';

interface Props {
  position: [number, number, number];
  size: [number, number, number];
}

export default function Floor({ position, size }: Props): JSX.Element {
  const ref = useRef<Mesh>(null!);

  return (
    <mesh scale={size} position={position} ref={ref} receiveShadow>
      <boxBufferGeometry />
      <meshPhongMaterial color={0xcecece} />
    </mesh>
  );
}
