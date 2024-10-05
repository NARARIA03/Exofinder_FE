import { PlanetData } from "@@types/dataTypes";
import { Line } from "@react-three/drei";
import { clickExoplanetNameAtom } from "@store/jotai";
import { useAtomValue } from "jotai";
import React from "react";

interface Props {
  planetData: PlanetData;
  color?: string;
}

function Orbit({ planetData, color = "white" }: Props) {
  const clickExoplanetName = useAtomValue(clickExoplanetNameAtom);
  return (
    <Line
      visible={clickExoplanetName === ""}
      points={planetData.points}
      color={color}
      linewidth={1}
    />
  );
}

export default React.memo(Orbit);
