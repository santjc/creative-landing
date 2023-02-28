import { useFrame } from '@react-three/fiber';
import { useLayoutEffect, useMemo, useRef } from 'react';
import { CircleGeometry, Material, Matrix4, Vector3 } from 'three';

const roundedSquareWave = (t: number, delta: number, a: number, f: number) => {
  return ((2 * a) / Math.PI) * Math.atan(Math.sin(2 * Math.PI * t * f) / delta);
};
export default function Dots() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const defaultMaterial = Material;
  const { vec, transform, positions, distances } = useMemo(() => {
    const vec = new Vector3();
    const transform = new Matrix4();
    const positions = [...Array(10000)].map((_, i) => {
      const position = new Vector3();
      position.x = (i % 100) - 50;
      position.y = Math.floor(i / 100) - 50;
      position.y += (i % 2) * 0.5;
      position.x += Math.random() * 0.3;
      position.y += Math.random() * 0.3;
      return position;
    });
    const distances = positions.map((pos) => pos.length());

    return { vec, transform, positions, distances };
  }, []);

  useFrame(({ clock }) => {
    for (let i = 0; i < 10000; ++i) {
      const t = clock.elapsedTime - distances[i] / 80;
      const wave = roundedSquareWave(t, 0.1, 1, 1 / 4);
      const scale = 1 + wave * 0.2;
      vec.copy(positions[i]).multiplyScalar(scale);
      transform.setPosition(vec);
      ref.current?.setMatrixAt(i, transform);
    }

    ref.current ? (ref.current.instanceMatrix.needsUpdate = true) : null;
  });
  const material = new defaultMaterial();
  const geometry = new CircleGeometry(0.1);
  return (
    <instancedMesh ref={ref} args={[geometry, material, 10000]}>
      <circleGeometry attach="ageometry" args={[0.1]} />
      <meshBasicMaterial attach="material" />
    </instancedMesh>
  );
}
