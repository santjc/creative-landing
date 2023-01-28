import { useFrame } from '@react-three/fiber';
import { Ref, useRef } from 'react';
import { Mesh } from 'three';

interface Props {
  position: [number, number, number];
  size: [number, number, number];
  color?: number;
  children: JSX.Element;
  rotateY?: boolean;
  wireframe?: boolean;
}

export default function PhongMeshConstructor({
  position,
  size,
  color,
  children,
  wireframe,
  rotateY = false,
}: Props): JSX.Element {
  const ref = useRef<Mesh>(null!);
  useFrame((state) => {
    if (rotateY) {
      const time = state.clock.getElapsedTime();
      ref.current.rotation.y = Math.tan(time);
    }
  });
  return (
    <mesh scale={size} position={position} ref={ref} receiveShadow>
      {children}
      <meshPhongMaterial wireframe={wireframe} color={color || 0xcecece} />
    </mesh>
  );
}
