export default function Floor(): JSX.Element {
  return (
    <mesh receiveShadow={true}>
      <boxBufferGeometry args={[20, 5, 20]} />
      <meshPhysicalMaterial color={'#CCFFCC'} />
    </mesh>
  );
}
