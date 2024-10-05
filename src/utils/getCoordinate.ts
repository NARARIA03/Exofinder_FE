import { PC_TO_AU } from "@constants/unit";

const degToRad = (deg: number) => deg * (Math.PI / 180);

/**
 * @description 적경, 적위, 거리 토대로 데카르트 좌표계로 변환한 x, y, z값
 */
export const getCoordinate = (ra: number, dec: number, distance: number) => {
  const decRadian = degToRad(dec);
  const raRadian = degToRad(ra);
  const scaledDistance = distance * PC_TO_AU;

  const x = scaledDistance * Math.cos(decRadian) * Math.cos(raRadian);
  const y = scaledDistance * Math.cos(decRadian) * Math.sin(raRadian);
  const z = scaledDistance * Math.sin(decRadian);

  return { x, y, z };
};
