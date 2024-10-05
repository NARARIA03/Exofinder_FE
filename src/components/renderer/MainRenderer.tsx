import { PlanetData, StarData } from "@@types/dataTypes";
import Star from "@components/objects/Star";

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
    </>
  );
}
