import { PlanetData } from "@@types/dataTypes";
import { Line } from "@react-three/drei";
import { clickExoplanetNameAtom } from "@store/jotai";
import { useAtomValue } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import { Line2 } from "three/examples/jsm/Addons.js";

interface Props {
  planetData: PlanetData;
  color?: string;
}

function Orbit({ planetData, color = "white" }: Props) {
  const clickExoplanetName = useAtomValue(clickExoplanetNameAtom);
  const [isDiameterPlus1Obj, setIsDiameterPlus1Obj] = useState<boolean>(false);
  const lineRef = useRef<Line2>(null);

  useEffect(() => {
    if (color === "red") {
      setIsDiameterPlus1Obj(true);
    } else {
      setIsDiameterPlus1Obj(false);
    }
  }, [color]);

  useEffect(() => {
    if (isDiameterPlus1Obj) {
      if (lineRef.current) {
        lineRef.current.userData = { diameterPlus1Obj: true };
      }
    }
  }, [isDiameterPlus1Obj]);

  return (
    <Line
      ref={lineRef}
      visible={clickExoplanetName === ""}
      points={planetData.points}
      color={color}
      linewidth={1}
    />
  );
}

export default React.memo(Orbit);
