import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export default function Floor(): JSX.Element {
  const ref = useRef<any>();

  useFrame(() => {
    ref.current.rotation.y += 0.01;
  });
  return (
    <mesh ref={ref} receiveShadow={true}>
      <boxBufferGeometry args={[10, 5, 10]} />
      <meshPhysicalMaterial color={'#141414'} />
    </mesh>
  );
}
