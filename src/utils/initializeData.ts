import { PlanetData, StarData } from "@@types/dataTypes";
import { initStarData } from "./initStarData";
import { initPlanetData } from "./initPlanetData";

export const initializeData = (): [StarData[], PlanetData[]] => {
  const starDatas = initStarData();
  const planetDatas = initPlanetData(starDatas);

  return [starDatas, planetDatas];
};
