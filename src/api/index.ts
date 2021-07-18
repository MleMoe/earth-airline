import axios from 'axios';
export function getCityLocation(city: string) {
  return axios.get('https://restapi.amap.com/v3/geocode/geo', {
    params: {
      key: import.meta.env.VITE_KEY,
      address: city,
      city,
    },
  });
}
