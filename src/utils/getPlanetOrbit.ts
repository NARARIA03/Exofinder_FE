import { Vector3 } from "three";

export const getPlanetOrbit = (
  semiMajorAxis: number,
  eccentricity: number,
  starPos: [number, number, number],
  scale: number,
  steps = 1000
) => {
  const points: Vector3[] = [];
  for (let i = 0; i <= steps; i++) {
    const theta = (i / steps) * 2 * Math.PI; // deg
    const r =
      (scale * (semiMajorAxis * (1 - eccentricity ** 2))) /
      (1 + eccentricity * Math.cos(theta)); // calc orbit distance
    const x = starPos[0] + r * Math.cos(theta);
    const z = starPos[2] + r * Math.sin(theta);
    points.push(new Vector3(x, starPos[1], z));
  }
  return points;
};
