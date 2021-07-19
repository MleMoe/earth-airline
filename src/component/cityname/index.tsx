import React, { useMemo } from 'react';
import { CanvasTexture, Vector3, DoubleSide } from 'three';

function CityName({ name = '', position = new Vector3() }) {
  const spriteMap = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#000';
      ctx.font = '12px Yahei';
      // ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      // 可对文字位置进行微调
      ctx.fillText(name, 20, 40, 80);
    }
    return new CanvasTexture(canvas);
  }, []);

  return (
    <sprite scale={[30, 30, 1]} position={position.multiplyScalar(1.01)}>
      side={DoubleSide}
      <spriteMaterial map={spriteMap} />
    </sprite>
  );
}

export default CityName;
