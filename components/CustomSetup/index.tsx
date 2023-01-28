import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { Vector3 } from 'three';

interface Props {
  lookAt?: Vector3;
  enableFullScreen?: boolean;
}
const defaultProps = {
  lookAt: new Vector3(0, 0, 0),
};
export default function CustomSetup({ lookAt }: Props & typeof defaultProps) {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  useEffect(() => {
    window.addEventListener('mousemove', (event) => {
      setCursor({
        x: event.clientX / 800 - 0.5,
        y: -(event.clientY / 600 - 0.5),
      });
    });
  });

  useThree(({ gl }) => {
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  useFrame(({ camera }) => {
    camera.position.x = Math.sin(cursor.x * Math.PI) * 3;
    camera.position.z = Math.cos(cursor.x * Math.PI) * 3;
    camera.position.y = 2;
    camera.lookAt(lookAt);
  });
  return <></>;
}

CustomSetup.defaultProps = defaultProps;
