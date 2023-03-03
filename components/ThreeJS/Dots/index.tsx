import { useFrame } from '@react-three/fiber';
import { useLayoutEffect, useMemo, useRef } from 'react';
import { CircleGeometry, Color, Material, Matrix4, Vector3 } from 'three';

const roundedSquareWave = (t: number, delta: number, a: number, f: number) => {
  return ((2 * a) / Math.PI) * Math.atan(Math.sin(2 * Math.PI * t * f) / delta);
};
export default function Dots() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const defaultMaterial = Material;
  const { vec, transform, positions, distances, colors } = useMemo(() => {
    const vec = new Vector3();
    const transform = new Matrix4();
    const positions = [...Array(5000)].map((_, i) => {
      const position = new Vector3();
      const radius = 50;
      const angle = (i / 2000) * Math.PI;
      const x = Math.cos(angle) * radius * Math.random() * 2;
      const y = Math.sin(angle) * radius * Math.random() * 2;
      const z = Math.sin(i / 50) * 100 * Math.cos(i / 100) * Math.random() * 2;
      position.set(x, y, z);
      return position;
    });
    const distances = positions.map((pos) => pos.length());
    const colors = [...Array(5000)].map(() => {
      const color = new Color();
      color.setHSL(Math.random(), 1, 0.7);
      return color;
    });

    return { vec, transform, positions, distances, colors };
  }, []);

  useFrame(({ clock }) => {
    for (let i = 0; i < 5000; ++i) {
      const t = clock.elapsedTime - distances[i] / 80;
      const wave = roundedSquareWave(t, 0.7, 7, 0.1);
      const scale = 1 + wave * 0.2;
      const timeScale = 0.005;

      // Calculate new position based on time
      const newPos = positions[i].clone().multiplyScalar(scale);
      newPos.x += Math.sin(clock.elapsedTime * timeScale + i) * 5;
      newPos.y += Math.cos(clock.elapsedTime * timeScale + i) * 5;

      // Set new position in instance matrix
      transform.setPosition(newPos);
      ref.current?.setMatrixAt(i, transform);

      if (scale > 1) {
        ref.current?.setColorAt(i, colors[i]);
      } else {
        ref.current?.setColorAt(5000 - i, new Color('#fff'));
      }
    }

    ref.current && (ref.current.instanceMatrix.needsUpdate = true);
    ref.current?.instanceColor &&
      (ref.current.instanceColor.needsUpdate = true);
  });
  const material = new defaultMaterial();
  const geometry = new CircleGeometry(0.1);
  return (
    <instancedMesh ref={ref} args={[geometry, material, 10000]}>
      <circleGeometry args={[0.1]} />
      <meshBasicMaterial transparent />
    </instancedMesh>
  );
}
