import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { Vector3 } from 'three';
import AirLine from '../component/airline';
import Airport from '../component/airport';
import CityName from '../component/cityname';
import Earth from '../component/earth';
import { CityItem } from '../utils';
import { cityToXyz } from '../utils/cityToXyz';

// import { lngLatToMeters } from 'global-mercator';

interface segmentItem {
  depCity: string;
  arrCity: string;
  depPos?: Vector3;
  arrPos?: Vector3;
}

const radius = 150;

// const cities = [{
//   name: '',
//   pos: ;

// }]

const segments: segmentItem[] = [
  {
    depCity: '北京',
    arrCity: '上海',
  },
  {
    depCity: '北京',
    arrCity: '杭州',
  },
  {
    depCity: '北京',
    arrCity: '成都',
  },
  {
    depCity: '北京',
    arrCity: '西安',
  },
  {
    depCity: '北京',
    arrCity: '哈尔滨',
  },
  {
    depCity: '北京',
    arrCity: '拉萨',
  },
  {
    depCity: '北京',
    arrCity: '海口',
  },
  {
    depCity: '北京',
    arrCity: '广州',
  },
];

function EarthAirline() {
  // const store = useMemo(() => createStore('earth_airline'), []);

  // const [linesData, setLinesData] = useState(segments);
  const [citiesData, setCitiesData] = useState<CityItem[]>(null!);

  useEffect(() => {
    const cityList = [
      ...new Set(segments.map((seg) => Object.values(seg)).flat()),
    ];
    const cityPromises = cityList.map((name) => {
      return cityToXyz(name, radius);
    });
    Promise.all(cityPromises).then((res) => {
      setCitiesData(res);
    });
  }, []);
  // console.log(store);

  return citiesData ? (
    <>
      <Earth radius={radius} />
      {segments.map((item, index) => {
        Object.assign(item, {
          depPos: citiesData.find((city) => city.name === item.depCity)
            ?.position,
          arrPos: citiesData.find((city) => city.name === item.arrCity)
            ?.position,
        });

        return <AirLine key={index} radius={radius} {...item} />;
      })}
      {citiesData.map((city, index) => {
        return (
          <Fragment key={index}>
            <Airport pos={city.position} />
            <CityName name={city.name} position={city.position} />
          </Fragment>
        );
      })}
    </>
  ) : null;
}

export default EarthAirline;
