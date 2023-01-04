import { Vector3Props } from '@react-three/fiber';

interface Props {
  position: any;
}

export default function LightBulb({ position }: Props): JSX.Element {
  return (
    <mesh position={position}>
      <pointLight castShadow />
      <meshPhongMaterial color={'red'} emissive={'yellow'} />
    </mesh>
  );
}
