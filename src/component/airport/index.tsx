import React from 'react';
import { Vector3 } from 'three';
import snowflake from './textures/snowflake.png';
import plane from './textures/airplane.png';

import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

function Airport(props: { pos: Vector3 }) {
  const { pos } = props;
  const [snowflakeMap] = useLoader(TextureLoader, [plane]);

  return (
    <sprite scale={5} position={pos.multiplyScalar(1.001)}>
      <spriteMaterial map={snowflakeMap} />
    </sprite>
  );
}

export default Airport;
