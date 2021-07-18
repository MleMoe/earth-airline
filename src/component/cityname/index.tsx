import React from 'react';
import { CanvasTexture, Vector3 } from 'three';

function CityName({ name = '', position = new Vector3() }) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#fff';
    ctx.font = '50px Yahei';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // 可对文字位置进行微调
    ctx.fillText(name, 150, 250, 512);
  }

  const spriteMap = new CanvasTexture(canvas);
  spriteMap.needsUpdate = true;

  return (
    <sprite scale={[30, 30, 1]} position={position.multiplyScalar(1.01)}>
      <spriteMaterial map={spriteMap} />
    </sprite>
  );
}

export default CityName;
