import { Vector3 } from 'three';

interface Props {
  position: Vector3 | [number, number, number];
}

export default function LightBulb({ position }: Props): JSX.Element {
  return (
    <mesh position={position}>
      <pointLight intensity={2} castShadow />
      <meshPhongMaterial color={'red'} emissive={'yellow'} />
    </mesh>
  );
}
