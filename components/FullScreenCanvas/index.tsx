import { Canvas } from '@react-three/fiber';
import React, { useEffect, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

export default function FullScreenCanvas({ children }: Props): JSX.Element {
  const [innerWidth, setInnerWidth] = useState<number>();
  const [innerHeight, setInnerHeight] = useState<number>();
  useEffect(() => {
    window.addEventListener('resize', () => {
      setInnerWidth(window.innerWidth);
      setInnerHeight(window.innerHeight);
    });
  }, []);
  return (
    <Canvas
      shadows={true}
      camera={{
        position: [45, 45, 45],
      }}
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      {children}
    </Canvas>
  );
}
