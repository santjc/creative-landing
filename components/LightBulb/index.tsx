const LightBulb = (props: any) => {
  return (
    <mesh {...props}>
      <pointLight castShadow />
      <meshPhongMaterial color={'red'} emissive={'yellow'} />
    </mesh>
  );
};

export default LightBulb;
