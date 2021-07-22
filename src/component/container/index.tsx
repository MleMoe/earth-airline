import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export default function Container(props: any) {
  const { children } = props;
  return (
    <Canvas camera={{ position: [0, 100, 350] }}>
      <ambientLight color='#666' />
      <directionalLight position={[-100, 500, 200]} color='#aaa' />
      <pointLight position={[180, 180, 180]} color='#999' />
      <OrbitControls
        autoRotate={true}
        // minDistance={-1}
        // enablePan={false}
        // enableZoom={false}
        // maxPolarAngle={Math.PI / 2}
        // minPolarAngle={Math.PI / 2}
      />
      {children}
    </Canvas>
  );
}
