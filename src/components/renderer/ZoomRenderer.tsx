import { PlanetData, StarData } from "@@types/dataTypes";
import ClickedExoplanet from "@components/objects/ClickedExoplanet";
import { useThree } from "@react-three/fiber";
import {
  camZoomAtom,
  clickExoplanetNameAtom,
  hoverExoplanetNameAtom,
} from "@store/jotai";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useMemo } from "react";
import * as THREE from "three";

interface Props {
  starDatas: StarData[];
  planetDatas: PlanetData[];
  controlRef: React.MutableRefObject<any>;
}

export default function ZoomRenderer({
  starDatas,
  planetDatas,
  controlRef,
}: Props) {
  const zoomedStarGeo = useMemo(
    () => new THREE.SphereGeometry(3000, 16, 16),
    []
  );
  const zoomedStarMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ff0",
        emissive: "#ff0",
      }),
    []
  );

  const { camera } = useThree();
  const clickExoplanetName = useAtomValue(clickExoplanetNameAtom);
  const setCamZoom = useSetAtom(camZoomAtom);
  const setHoverExoplanetName = useSetAtom(hoverExoplanetNameAtom);

  // get hostData, systemPlanetDatas and maxSemiMajorAxis
  const { hostData, systemPlanetDatas, maxSemiMajorAxis } = useMemo(() => {
    if (!clickExoplanetName)
      return { hostData: null, systemPlanetDatas: [], maxSemiMajorAxis: 0 };

    const planetData = planetDatas.find(
      (planet) => planet.planetName === clickExoplanetName
    );
    const hostData = starDatas.find(
      (star) => star.starName === planetData?.hostName
    );
    const systemPlanetDatas = hostData?.planets
      .map((planetName) =>
        planetDatas.find((planet) => planet.planetName === planetName)
      )
      .filter(Boolean) as PlanetData[];

    let maxSemiMajorAxis = 0;
    systemPlanetDatas.forEach((planet) => {
      if (planet?.semiMajorAxis) {
        maxSemiMajorAxis = Math.max(planet.semiMajorAxis, maxSemiMajorAxis);
      }
    });

    return { hostData, systemPlanetDatas, maxSemiMajorAxis };
  }, [clickExoplanetName, planetDatas, starDatas]);

  // click, go to hwo camera moving logic
  useEffect(() => {
    if (!clickExoplanetName) {
      setCamZoom(1);
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);
      if (controlRef.current) controlRef.current.target.set(0, 0, 0);
      return;
    }
    setCamZoom(1);
    setHoverExoplanetName("");

    if (hostData) {
      const { coordinate } = hostData;
      camera.position.set(
        coordinate[0],
        coordinate[1] + maxSemiMajorAxis * 200000 + 30000,
        coordinate[2] + maxSemiMajorAxis * 200000 + 70000
      );
      camera.lookAt(coordinate[0], coordinate[1], coordinate[2]);
      if (controlRef.current) {
        controlRef.current.target.set(
          coordinate[0],
          coordinate[1],
          coordinate[2]
        );
      }
    }
  }, [
    clickExoplanetName,
    hostData,
    camera,
    controlRef,
    setCamZoom,
    setHoverExoplanetName,
    maxSemiMajorAxis,
  ]);

  if (!clickExoplanetName) return null;
  else if (!hostData) return null;

  return (
    <mesh>
      <mesh
        position={hostData.coordinate}
        geometry={zoomedStarGeo}
        material={zoomedStarMat}
      />
      {systemPlanetDatas.map((planetData) => (
        <ClickedExoplanet
          key={planetData.planetName}
          planetData={planetData}
          hostPos={hostData.coordinate}
        />
      ))}
    </mesh>
  );
}
