import { PlanetData, StarData } from "@@types/dataTypes";
import Exoplanet from "@components/objects/Exoplanet";
import Star from "@components/objects/Star";
import { Fragment } from "react/jsx-runtime";

interface Props {
  starDatas: StarData[];
  planetDatas: PlanetData[];
}

export default function MainRenderer({ starDatas, planetDatas }: Props) {
  return (
    <>
      {starDatas.map((starData) => (
        <Star starData={starData} />
      ))}
      {planetDatas.map((planetData) => {
        return (
          <Fragment key={planetData.planetName}>
            <Exoplanet planetData={planetData} />
          </Fragment>
        );
      })}
    </>
  );
}
