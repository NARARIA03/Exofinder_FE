import { Vector3 } from "three";

export type PlanetData = {
  planetName: string;
  hostName: string;
  planetRadius: number;
  starRadius: number;
  distance: number;
  semiMajorAxis: number;
  eccentricity: number;
  points: Vector3[];
  discoveryMethod: string;
  discYear: string;
  discFacility: string;
  ra: number;
  dec: number;
  orbitalPeriod: number;
};

export type StarData = {
  starName: string;
  coordinate: [number, number, number];
  planets: string[];
  ra: number;
  dec: number;
  distance: number;
  starRadius: number;
};
