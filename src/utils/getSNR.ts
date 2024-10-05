import { PlanetData } from "@@types/dataTypes";
import { SNR0 } from "@constants/unit";

export const getSNR = (planetData: PlanetData, diameter: number) => {
  const snr =
    SNR0 *
    ((planetData.starRadius * planetData.planetRadius * (diameter / 6)) /
      ((planetData.distance / 10) * planetData.semiMajorAxis)) **
      2;
  if (snr > 5) {
    return true;
  } else {
    return false;
  }
};
