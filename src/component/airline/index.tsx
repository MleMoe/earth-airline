import React, { useMemo, useCallback } from 'react';

import { Vector3, CatmullRomCurve3 } from 'three';

function AirLine(props: any) {
  const { depPos, arrPos, radius } = props;

  const points = useMemo(() => {
    if (!depPos || !arrPos) {
      return [];
    }
    const positions: Vector3[] = [];

    positions.push(depPos);
    // 计算中点
    const midVector = depPos.clone().add(arrPos.clone());
    if (midVector.length() > radius * 1.5) {
      midVector.multiplyScalar(0.55);
    }
    positions.push(midVector);
    positions.push(arrPos);
    const curve = new CatmullRomCurve3(positions); //Create a smooth 3d spline curve from a series of points
    //从曲线中取出 position，细分数为50
    return curve.getPoints(50);
  }, []);

  // 设置形状
  const onUpdate = useCallback((self) => self.setFromPoints(points), [points]);

  return points.length ? (
    <>
      <line>
        <bufferGeometry attach='geometry' onUpdate={onUpdate} />
        <lineBasicMaterial
          attach='material'
          color={'#002FA7'}
          linecap={'round'}
          linejoin={'round'}
        />
      </line>
    </>
  ) : null;
}

export default AirLine;
