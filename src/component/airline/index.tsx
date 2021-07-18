import React, { useState, useMemo, useCallback, useEffect } from 'react';

import { Vector3, CatmullRomCurve3 } from 'three';
import { cityToXyz } from '../../utils/cityToXyz';
import CityName from '../cityname';

function AirLine(props: any) {
  const { depPos, arrPos, radius } = props;
  // const [depPos, setDepPos] = useState<Vector3>(null!);
  // const [arrPos, setArrPos] = useState<Vector3>(null!);

  // useEffect(() => {
  //   cityToXyz(depCity, radius).then((res) => {
  //     setDepPos(res);
  //   });
  //   cityToXyz(arrCity, radius).then((res) => {
  //     setArrPos(res);
  //   });
  // }, []);

  const points = useMemo(() => {
    if (!depPos || !arrPos) {
      return [];
    }
    const positions: Vector3[] = [];

    // console.log(depCity, depPos);
    // console.log(arrCity, arrPos);

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
          color={'red'}
          linewidth={100}
          linecap={'round'}
          linejoin={'round'}
        />
      </line>
      {/* <CityName name={depCity} position={depPos} /> */}
      {/* <CityName name={arrCity} position={arrPos} /> */}
    </>
  ) : null;
}

export default AirLine;
