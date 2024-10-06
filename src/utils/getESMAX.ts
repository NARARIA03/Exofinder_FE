import { PlanetData } from "@@types/dataTypes";

export const getESMAX = (planetData: PlanetData, diameter: number) => {
  const esMAX = (15 * (diameter / 6)) / planetData.semiMajorAxis;

  return esMAX;
};
