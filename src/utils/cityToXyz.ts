import { CityItem } from './index';
import { getCityLocation } from '../api';
import { lglt2xyz } from './lglt2xyz';

export async function cityToXyz(
  city: string,
  radius: number
): Promise<CityItem> {
  const [lng, lat] = await getCityLocation(city).then((res) => {
    const geocodes = res.data.geocodes;
    return (geocodes[0].location as string)
      .split(',')
      .map((item) => parseFloat(item));
  });
  const position = lglt2xyz(lng, lat, radius || 100);
  return {
    name: city,
    position,
    lng,
    lat,
  };
}
