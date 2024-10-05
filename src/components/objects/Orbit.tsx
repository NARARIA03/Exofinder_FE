import { PlanetData } from "@@types/dataTypes";
import { Line } from "@react-three/drei";
import React from "react";

interface Props {
  planetData: PlanetData;
  color?: string;
}

function Orbit({ planetData, color = "white" }: Props) {
  return <Line points={planetData.points} color={color} linewidth={1} />;
}

export default React.memo(Orbit);
