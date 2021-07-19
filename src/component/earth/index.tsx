import React, { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useSpring, animated, config } from '@react-spring/three';

import { TextureLoader } from 'three/src/loaders/TextureLoader';
import * as THREE from 'three';

import color_map from './textures/no_clouds.jpg';
import bump_map from './textures/bump.jpg';
import alpha_map from './textures/grey.jpg';
import cloud_map from './textures/earth_clouds.png';
import galaxy_map from './textures/galaxy.png';

function Earth({ radius = 100 }) {
  const myMesh = useRef<THREE.Mesh>(null!);

  const [active, setActive] = useState(false);

  // const { scale } = useSpring({
  //   scale: active ? 1.5 : 1,
  //   config: config.wobbly,
  // });

  const [colorMap, bumpMap, alphaMap, cloudMap, galaxyMap] = useLoader(
    TextureLoader,
    [color_map, bump_map, alpha_map, cloud_map, galaxy_map]
  );

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    // myMesh.current.rotation.y = a;
  });
  return (
    <>
      <animated.mesh
        visible
        ref={myMesh}
        // rotation={[0, (Math.PI * 15) / 10, 0]}
        userData={{ hello: 'world' }}
        // scale={1.5}
        onClick={() => setActive(!active)}
      >
        <sphereGeometry args={[radius, 32, 32]} />
        <meshPhongMaterial
          emissiveIntensity={0.1}
          map={colorMap}
          alphaMap={alphaMap}
          bumpMap={bumpMap}
        ></meshPhongMaterial>
      </animated.mesh>

      <animated.mesh visible onClick={() => setActive(!active)}>
        <sphereGeometry args={[radius + 2, 32, 32]} />
        <meshPhongMaterial transparent map={cloudMap}></meshPhongMaterial>
      </animated.mesh>

      <animated.mesh visible>
        <sphereGeometry args={[600, 32, 32]} />
        <meshStandardMaterial
          transparent
          map={galaxyMap}
          side={THREE.DoubleSide}
        ></meshStandardMaterial>
      </animated.mesh>
    </>
  );
}

export default Earth;
