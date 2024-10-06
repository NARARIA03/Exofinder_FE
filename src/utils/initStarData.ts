import { StarData } from "@@types/dataTypes";
import { systems } from "@data/data";
import { getCoordinate } from "./getCoordinate";

export const initStarData = () => {
  const starsTmp: StarData[] = [];

  Object.keys(systems).map((starName: string) => {
    const { ra, dec, distance, planets, starRadius, hostSpecType } =
      systems[starName];
    const { x, y, z } = getCoordinate(ra, dec, distance);

    starsTmp.push({
      starName: starName,
      hostSpecType: hostSpecType,
      coordinate: [x, y, z],
      planets: planets,
      ra: ra,
      dec: dec,
      distance: distance,
      starRadius: starRadius,
    });
  });

  return starsTmp;
};
