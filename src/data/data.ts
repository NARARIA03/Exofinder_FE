import planetsData from "@data/planets.json";
import systemData from "@data/systems.json";

export const planets: {
  [key: string]: {
    hostName: string;
    discoveryMethod: string;
    ra: number;
    dec: number;
    distance: number;
    orbitalPeriod: number;
    semiMajorAxis: number;
    eccentricity: number;
    planetRadius: number;
    starRadius: number;
    discYear: string;
    discFacility: string;
  };
} = planetsData;

export const systems: {
  [key: string]: {
    planets: string[];
    ra: number;
    dec: number;
    distance: number;
    starRadius: number;
  };
} = systemData;
