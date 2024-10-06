import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { PlanetData } from "@@types/dataTypes";
import { Text } from "@react-three/drei";
import { useAtomValue } from "jotai";
import { clickExoplanetNameAtom, hoverExoplanetNameAtom } from "@store/jotai";
import gsap from "gsap";

interface Props {
  planetData: PlanetData;
  snr: number;
  esMax: number;
}

function Exoplanet({ planetData, snr, esMax }: Props) {
  const planetGeo = useMemo(() => new THREE.SphereGeometry(300, 8, 8), []);
  const planetMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0f0",
        emissive: "#0f0",
      }),
    []
  );

  const hoverExoplanetName = useAtomValue(hoverExoplanetNameAtom);
  const clickExoplanetName = useAtomValue(clickExoplanetNameAtom);

  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (meshRef.current) {
      let difficult = 0;
      if (
        (5 < snr && snr < 10) ||
        (esMax * 0.8 < planetData.distance && planetData.distance < esMax)
      ) {
        difficult = 3;
      } else if (
        (10 < snr && snr < 20) ||
        (esMax * 0.5 < planetData.distance && planetData.distance < esMax * 0.8)
      ) {
        difficult = 2;
      } else if (20 < snr || esMax * 0.5 < planetData.distance) {
        difficult = 1;
      }

      if (difficult !== 0) {
        meshRef.current.userData = {
          ...meshRef.current.userData,
          difficult: difficult,
        };
      }
      meshRef.current.userData = {
        ...meshRef.current.userData,
        planetName: planetData.planetName,
      };
    }
  }, [esMax, planetData, snr]);

  useEffect(() => {
    if (meshRef.current) {
      if (hoverExoplanetName === meshRef.current.userData.planetName) {
        gsap.to(meshRef.current.scale, {
          x: 10 * planetData.distance,
          y: 10 * planetData.distance,
          z: 10 * planetData.distance,
          duration: 1,
        });
      } else {
        gsap.to(meshRef.current.scale, { x: 1, y: 1, z: 1, duration: 1 });
      }
    }
  }, [hoverExoplanetName, planetData.distance]);

  return (
    <mesh visible={clickExoplanetName === ""}>
      <mesh
        ref={meshRef}
        position={planetData.points[0]}
        geometry={planetGeo}
        material={planetMat}
      />
      <Text
        position={[
          planetData.points[0].x,
          planetData.points[0].y + 1300,
          planetData.points[0].z,
        ]}
        fontSize={300}
        color={"white"}
      >
        {planetData.planetName}
      </Text>
    </mesh>
  );
}

export default React.memo(Exoplanet);
