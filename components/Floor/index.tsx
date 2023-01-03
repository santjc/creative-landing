const Floor = (props: any) => {
  return (
    <mesh {...props} receiveShadow={true}>
      <boxBufferGeometry args={[20, 1, 10]} />
      <meshPhysicalMaterial color="red" />
    </mesh>
  );
};

export default Floor;
