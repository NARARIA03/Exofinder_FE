import { PlanetData, StarData } from "@@types/dataTypes";
import ClickedExoplanet from "@components/objects/ClickedExoplanet";
import { useThree } from "@react-three/fiber";
import {
  ableCoronaOnAtom,
  camZoomAtom,
  clickExoplanetNameAtom,
  hoverExoplanetNameAtom,
  isCoronaOnAtom,
  selectedExoplanetNameAtom,
  zoomPlanetNamesAtom,
} from "@store/jotai";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
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
    () => new THREE.SphereGeometry(10000, 16, 16),
    []
  );
  const zoomedBrightnessStarMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ff0",
        emissive: "#ff0",
        emissiveIntensity: 2,
      }),
    []
  );

  const zoomedNoBrightnessStarMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#000",
      }),
    []
  );

  const { camera } = useThree();
  const isCoronaOn = useAtomValue(isCoronaOnAtom);
  const clickExoplanetName = useAtomValue(clickExoplanetNameAtom);
  const selectedExoplanetName = useAtomValue(selectedExoplanetNameAtom);
  const setCamZoom = useSetAtom(camZoomAtom);
  const setHoverExoplanetName = useSetAtom(hoverExoplanetNameAtom);
  const setZoomPlanetNames = useSetAtom(zoomPlanetNamesAtom);
  const [ableCoronaOn, setAbleCoronaOn] = useAtom(ableCoronaOnAtom);

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
    setZoomPlanetNames(
      systemPlanetDatas.map((planetData) => planetData.planetName)
    );

    return { hostData, systemPlanetDatas, maxSemiMajorAxis };
  }, [clickExoplanetName, planetDatas, setZoomPlanetNames, starDatas]);

  useEffect(() => {
    if (
      systemPlanetDatas.some(
        (planetData) => planetData.discoveryMethod === "Imaging"
      )
    ) {
      setAbleCoronaOn(true);
    } else {
      setAbleCoronaOn(false);
    }
  }, [systemPlanetDatas, setAbleCoronaOn]);

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
        material={
          ableCoronaOn
            ? isCoronaOn
              ? zoomedNoBrightnessStarMat
              : zoomedBrightnessStarMat
            : zoomedBrightnessStarMat
        }
      />
      {systemPlanetDatas.map((planetData) => (
        <ClickedExoplanet
          key={planetData.planetName}
          planetData={planetData}
          hostPos={hostData.coordinate}
          isSelect={selectedExoplanetName === planetData.planetName}
        />
      ))}
    </mesh>
  );
}
