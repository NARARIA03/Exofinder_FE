import { PlanetData, StarData } from "@@types/dataTypes";
import Exoplanet from "@components/objects/Exoplanet";
import Orbit from "@components/objects/Orbit";
import Star from "@components/objects/Star";
import { useThree } from "@react-three/fiber";
import { camZoomAtom } from "@store/jotai";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { Fragment } from "react/jsx-runtime";
import { PerspectiveCamera } from "three";

interface Props {
  starDatas: StarData[];
  planetDatas: PlanetData[];
}

export default function MainRenderer({ starDatas, planetDatas }: Props) {
  const { camera } = useThree();
  const camZoom = useAtomValue(camZoomAtom);

  useEffect(() => {
    const perspectiveCamera = camera as PerspectiveCamera;
    perspectiveCamera.zoom = camZoom;
    perspectiveCamera.updateProjectionMatrix();
  }, [camera, camZoom]);

  return (
    <>
      {starDatas.map((starData) => (
        <Star starData={starData} />
      ))}
      {planetDatas.map((planetData) => {
        return (
          <Fragment key={planetData.planetName}>
            <Exoplanet planetData={planetData} />
            <Orbit planetData={planetData} />
          </Fragment>
        );
      })}
    </>
  );
}
