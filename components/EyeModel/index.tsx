import { useFrame, useLoader } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


export default function EyeModel() {
  const vec = new Vector3();
  const gltf = useLoader(GLTFLoader, '/eye/eye.glb');
  const ref = useRef<any>();

  useFrame(({ mouse }) => {
    vec.set(mouse.x * 2, mouse.x * 2, mouse.y * 2);
    ref.current.position.lerp(vec, 0.25);
    ref.current.rotation.y = mouse.x;
    ref.current.rotation.z = mouse.y;
  });

  return (
    <Suspense fallback={null}>
      <mesh ref={ref}>
        <primitive object={gltf.scene} scale={[5, 5, 5]} />
      </mesh>
    </Suspense>
  );
}
