import { Spherical, Vector3 } from 'three';
export function lglt2xyz(lng: number, lat: number, radius: number) {
  const theta = (270 + 180 + lng) * (Math.PI / 180);

  const phi = (90 - lat) * (Math.PI / 180);
  // return {
  //   x: -radius * Math.sin(theta) * Math.cos(phi),
  //   y: radius * Math.cos(theta),
  //   z: radius * Math.sin(theta) * Math.sin(phi),
  // };
  return new Vector3().setFromSpherical(new Spherical(radius, phi, theta));
}
