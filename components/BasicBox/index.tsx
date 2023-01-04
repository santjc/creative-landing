import { Box } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import { Mesh } from 'three';

interface Props {
  color: string;
  args: [number, number, number];
  position: [number, number, number];
}

export default function BasicBox({
  color,
  args,
  position,
}: Props): JSX.Element {
  const mesh = useRef<Mesh>(null!);

  useFrame((state, delta) => {
    mesh.current.rotation.y += 0.01;
  });

  return (
    <Box args={args} position={position} ref={mesh}>
      <meshStandardMaterial color={color} />
    </Box>
  );
}
