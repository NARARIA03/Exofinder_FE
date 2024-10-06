import * as THREE from "three";
import React, { useEffect, useMemo, useRef } from "react";
import { StarData } from "@@types/dataTypes";
import { Points } from "@react-three/drei";
import { useAtomValue } from "jotai";
import { clickExoplanetNameAtom, hoverSpecTypeAtom } from "@store/jotai";
import { useStarMaterials } from "@hooks/useStarMaterials";
import gsap from "gsap";
import { getClarity } from "@utils/getClarity";

interface Props {
  starData: StarData;
}

function Star({ starData }: Props) {
  // star geometry, material memoization
  const starGeo = useMemo(() => new THREE.SphereGeometry(600, 8, 8), []);
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

  const starPointMat = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 1,
        sizeAttenuation: false,
        color: "#fff",
      }),
    []
  );

  const clickExoplanetName = useAtomValue(clickExoplanetNameAtom);
  const hoverSpecType = useAtomValue(hoverSpecTypeAtom);

  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (meshRef.current) {
      const clarity = getClarity(starData.distance);
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      material.opacity = clarity;
      material.transparent = true;

      console.log(`Updated opacity: ${clarity}`); // 디버깅용 로그
    }
  }, [starData.distance]);

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.userData = {
        starName: starData.starName,
        specType: starData.hostSpecType
          ? starData.hostSpecType.slice(0, 1)
          : "",
      };
    }
  }, [starData]);

  useEffect(() => {
    if (meshRef.current) {
      if (meshRef.current.userData.specType === hoverSpecType) {
        gsap.to(meshRef.current.scale, {
          x: 5 * starData.distance,
          y: 5 * starData.distance,
          z: 5 * starData.distance,
          duration: 1,
        });
      } else {
        gsap.to(meshRef.current.scale, { x: 1, y: 1, z: 1, duration: 1 });
      }
    }
  }, [hoverSpecType, starData.distance]);

  return (
    <mesh>
      <mesh
        ref={meshRef}
        visible={clickExoplanetName === ""}
        position={starData.coordinate}
        geometry={starGeo}
        material={
          starData.hostSpecType && typeof starData.hostSpecType === "string"
            ? (() => {
                const specType = starData.hostSpecType.slice(0, 1);
                switch (specType) {
                  case "O":
                    return starMatO;
                  case "B":
                    return starMatB;
                  case "A":
                    return starMatA;
                  case "F":
                    return starMatF;
                  case "G":
                    return starMatG;
                  case "K":
                    return starMatK;
                  case "M":
                    return starMatM;
                  default:
                    return starMatDefault;
                }
              })()
            : starMatDefault
        }
      />
      <Points
        positions={new Float32Array(starData.coordinate)}
        material={starPointMat}
      />
    </mesh>
  );
}

export default React.memo(Star);
