import { PlanetData, StarData } from "@@types/dataTypes";
import ClickedExoplanet from "@components/objects/ClickedExoplanet";
import { useStarMaterials } from "@hooks/useStarMaterials";
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
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

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
  const {
    starMatO,
    starMatB,
    starMatA,
    starMatF,
    starMatG,
    starMatK,
    starMatM,
    starMatDefault,
  } = useStarMaterials();

  const coronaMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#000",
        depthWrite: true,
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
  const ableCoronaOn = useAtomValue(ableCoronaOnAtom);

  const meshRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);

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

  const zoomedStarGeo = useMemo(() => {
    if (!hostData || !hostData.starRadius) {
      return new THREE.SphereGeometry(5000, 16, 16);
    }
    const calculatedRadius = hostData.starRadius * 10000;
    return new THREE.SphereGeometry(calculatedRadius, 16, 16);
  }, [hostData]);

  const coronaGeo = useMemo(() => {
    if (!hostData || !hostData.starRadius) {
      return new THREE.SphereGeometry(7000, 16, 16);
    }
    const coronaRadius = hostData.starRadius * 10000;
    return new THREE.SphereGeometry(coronaRadius, 16, 16);
  }, [hostData]);

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

  useEffect(() => {
    if (coronaRef.current) {
      if (isCoronaOn) {
        gsap.to(coronaRef.current.scale, {
          x: 1.5,
          y: 1.5,
          z: 1.5,
          duration: 3,
        });
      } else {
        gsap.to(coronaRef.current.scale, {
          x: 0.001,
          y: 0.001,
          z: 0.001,
          duration: 3,
        });
      }
    }
  }, [isCoronaOn]);

  if (!clickExoplanetName) return null;
  else if (!hostData) return null;

  return (
    <mesh>
      <mesh
        ref={meshRef}
        position={hostData.coordinate}
        geometry={zoomedStarGeo}
        material={(() => {
          let selectedMaterial = starMatDefault; // basic material
          if (
            hostData.hostSpecType &&
            typeof hostData.hostSpecType === "string"
          ) {
            const specType = hostData.hostSpecType.slice(0, 1);
            switch (specType) {
              case "O":
                if (meshRef.current) {
                  meshRef.current.userData = { specType: "O" };
                }
                selectedMaterial = starMatO;
                break;
              case "B":
                if (meshRef.current) {
                  meshRef.current.userData = { specType: "B" };
                }
                selectedMaterial = starMatB;
                break;
              case "A":
                if (meshRef.current) {
                  meshRef.current.userData = { specType: "A" };
                }
                selectedMaterial = starMatA;
                break;
              case "F":
                if (meshRef.current) {
                  meshRef.current.userData = { specType: "F" };
                }
                selectedMaterial = starMatF;
                break;
              case "G":
                if (meshRef.current) {
                  meshRef.current.userData = { specType: "G" };
                }
                selectedMaterial = starMatG;
                break;
              case "K":
                if (meshRef.current) {
                  meshRef.current.userData = { specType: "K" };
                }
                selectedMaterial = starMatK;
                break;
              case "M":
                if (meshRef.current) {
                  meshRef.current.userData = { specType: "M" };
                }
                selectedMaterial = starMatM;
                break;
              default:
                selectedMaterial = starMatDefault;
                break;
            }
            return selectedMaterial;
          }
        })()}
      />
      {ableCoronaOn && (
        <mesh
          ref={coronaRef}
          position={hostData.coordinate}
          geometry={coronaGeo}
          material={coronaMat}
          scale={[0.001, 0.001, 0.001]} // 처음에 보이지 않게 설정
        />
      )}
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
