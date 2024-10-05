import { PlanetData } from "@@types/dataTypes";

export const getESMAX = (planetData: PlanetData, diameter: number) => {
  const esMAX = (15 * (diameter / 6)) / planetData.semiMajorAxis;

  if (esMAX > planetData.distance) {
    return true;
  } else {
    return false;
  }
};
