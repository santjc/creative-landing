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
      style={{
        width: 'calc(100vw - 48px)',
        height: 'calc(100vh - 66px)',
      }}
    >
      {children}
    </Canvas>
  );
}
