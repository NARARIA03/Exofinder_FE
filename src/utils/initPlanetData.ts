import { PlanetData, StarData } from "@@types/dataTypes";
import { planets as planetsData } from "@data/data";
import { getPlanetOrbit } from "./getPlanetOrbit";

export const initPlanetData = (starDatas: StarData[]) => {
  const planetsTmp: PlanetData[] = [];

  starDatas.map((starData) => {
    const { starName, coordinate, planets } = starData;

    planets.map((planetName: string) => {
      const {
        semiMajorAxis,
        eccentricity,
        planetRadius,
        starRadius,
        distance,
        discoveryMethod,
        discYear,
        discFacility,
        ra,
        dec,
        orbitalPeriod,
      } = planetsData[planetName];

      const orbitPath = getPlanetOrbit(
        semiMajorAxis,
        eccentricity,
        coordinate,
        30000
      );

      planetsTmp.push({
        planetName: planetName,
        hostName: starName,
        planetRadius: planetRadius,
        starRadius: starRadius,
        distance: distance,
        semiMajorAxis: semiMajorAxis,
        eccentricity: eccentricity,
        points: orbitPath,
        discoveryMethod: discoveryMethod,
        discYear: discYear,
        discFacility: discFacility,
        ra: ra,
        dec: dec,
        orbitalPeriod: orbitalPeriod,
      });
    });
  });
  return planetsTmp;
};
