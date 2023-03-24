import { Center, Html, OrbitControls, Stage, useGLTF } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import gsap, { Power1, Power2 } from 'gsap';
import Head from 'next/head';
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Group, Mesh } from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { degToRad, lerp } from 'three/src/math/MathUtils';

import Arrow from '@components/Icons/Arrow';
import GithubIcon from '@components/Icons/Github';
import LinkedInIcon from '@components/Icons/LinkedinIcon';
import SuspenseFallback from '@components/SuspenseFallback';

import styles from '@styles/Home.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>santco.site</title>
      </Head>
      <Suspense fallback={<SuspenseFallback />}>
        <Canvas
          style={{ width: '100vw', height: '100vh' }}
          flat
          camera={{ position: [0, 15, 100], fov: 60 }}
          shadows
        >
          <color attach="background" args={['#f5f3e6']} />

          <Stage intensity={0.7} adjustCamera={false} shadows="contact">
            <Model />
          </Stage>
        </Canvas>
      </Suspense>
    </>
  );
}

type GLTFResult = GLTF & {
  nodes: {
    Frame_ComputerFrame_0: THREE.Mesh;
    Screen_ComputerScreen_0: THREE.Mesh;
  };
  materials: {
    ComputerFrame: THREE.MeshStandardMaterial;
    ComputerScreen: THREE.MeshStandardMaterial;
  };
};

function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(
    '/laptop/laptop-transformed.glb'
  ) as GLTFResult;
  const modelRef = useRef<Group>(null!);
  const tl = useRef<GSAPTimeline>();
  const htmlTl = useRef<GSAPTimeline>();
  const htmlRef = useRef<Group>(null);
  const playBtnRef = useRef<HTMLButtonElement>(null);
  const reverseBtnRef = useRef<HTMLButtonElement>(null);
  const screenModelRef = useRef<Mesh>(null!);
  const landingTextRef = useRef<HTMLDivElement>(null);
  const socialHtmlRef = useRef<HTMLDivElement>(null);
  const { viewport, camera } = useThree();

  useEffect(() => {
    tl.current = gsap.timeline({ paused: true });
    htmlTl.current = gsap.timeline({ paused: true });
    modelRef.current?.position.set(0, 5, 0);
    modelRef.current?.rotation.set(0, 0, 0);
    screenModelRef.current?.rotation.set(degToRad(270), 0, Math.PI);

    tl.current
      ?.to(screenModelRef.current?.rotation, {
        duration: 0.5,
        x: Math.PI,
        ease: Power2.easeInOut,
        delay: 0.5,
      })
      .to(modelRef.current?.rotation, {
        duration: 0.7,
        y: Math.PI * 2,
        x: 0.1,
        ease: Power2.easeInOut,
      })
      .to(camera.position, {
        duration: 0.7,
        z: 50,
        ease: Power1.easeInOut,
      });

    camera.lookAt(modelRef.current?.position);
  }, []);

  const handlePlay = () => {
    if (reverseBtnRef && playBtnRef && landingTextRef) {
      htmlTl.current
        ?.to(landingTextRef && landingTextRef.current, {
          duration: 0.5,
          autoAlpha: 0,
          css: {
            display: 'none',
            opacity: 0,
          },
          ease: Power2.easeInOut,
        })
        .to(reverseBtnRef.current, {
          autoAlpha: 0,
          css: {
            opacity: 0,
          },
        })
        .to(playBtnRef && playBtnRef.current, {
          duration: 0.5,
          autoAlpha: 0,
          css: {
            opacity: 0,
            pointerEvents: 'none',
          },
        })
        .to(reverseBtnRef.current, {
          autoAlpha: 1,
          css: {
            opacity: 1,
            pointerEvents: 'all',
          },
          duration: 0.5,
        })
        .to(socialHtmlRef.current, {
          css: {
            display: 'flex',
            opacity: 1,
          },
          autoAlpha: 1,
          duration: 0.5,
          ease: Power2.easeInOut,
        });
    }
    tl.current?.play();
    htmlTl.current?.play();
  };

  const handleReverse = () => {
    tl.current?.reverse();
    htmlTl.current?.reverse();
  };

  //TODO: NO SCROLL - BUTTONS - ICONS INSIDE PC SCREEN - COPY  https://codesandbox.io/s/mixing-html-and-webgl-w-occlusion-9keg6
  return (
    <group>
      <group ref={htmlRef}>
        <Html fullscreen position={[0, 0, -20]}>
          <div className={styles.modelControls}>
            <button
              ref={reverseBtnRef}
              className={styles.reverseBtn}
              onClick={handleReverse}
            >
              <Arrow size={'22px'} />
            </button>
            <div ref={landingTextRef} className={styles.landingText}>
              <h1>Hi! Im Santiago</h1>
              <h2>Web Developer from Argentina</h2>
            </div>
            <div
              ref={socialHtmlRef}
              className={`${styles.landingText} ${styles.socials}`}
            >
              <a
                href={'https://www.github.com/santjc'}
                rel={'noreferrer'}
                target={'_blank'}
              >
                <GithubIcon />
              </a>
              <a
                href={'https://www.linkedin.com/in/santco'}
                rel={'noreferrer'}
                target={'_blank'}
              >
                <LinkedInIcon />
              </a>
            </div>
            <button
              ref={playBtnRef}
              className={styles.playBtn}
              onClick={handlePlay}
            >
              <Arrow size={'22px'} />
            </button>
          </div>
        </Html>
      </group>
      <group {...props} ref={modelRef} dispose={null}>
        <mesh
          castShadow
          geometry={nodes.Frame_ComputerFrame_0.geometry}
          material={materials.ComputerFrame}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          ref={screenModelRef}
          geometry={nodes.Screen_ComputerScreen_0.geometry}
          material={materials.ComputerScreen}
          position={[0, 0, -10.3]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={[100, 100, 88.24]}
        />
        <mesh castShadow receiveShadow position={[0, -3.5, 0]}>
          <cylinderGeometry args={[25, 25, 5, 64]} />
          <meshPhysicalMaterial roughness={0.2} color={'#000'} />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload('/laptop/laptop-transformed.glb');
