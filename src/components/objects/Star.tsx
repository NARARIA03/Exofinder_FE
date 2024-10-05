import * as THREE from "three";
import React, { useEffect, useMemo, useRef } from "react";
import { StarData } from "@@types/dataTypes";
import { Points } from "@react-three/drei";
import { useAtomValue } from "jotai";
import { clickExoplanetNameAtom } from "@store/jotai";

interface Props {
  starData: StarData;
}

function Star({ starData }: Props) {
  // star geometry, material memoization
  const starGeo = useMemo(() => new THREE.SphereGeometry(600, 8, 8), []);
  const starMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#fff",
        emissive: "#fff",
        emissiveIntensity: 10,
      }),
    []
  );
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

  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.userData = { starName: starData.starName };
    }
  }, [starData]);

  return (
    <mesh ref={meshRef}>
      <mesh
        visible={clickExoplanetName === ""}
        position={starData.coordinate}
        geometry={starGeo}
        material={starMat}
      />
      <Points
        positions={new Float32Array(starData.coordinate)}
        material={starPointMat}
      />
    </mesh>
  );
}

export default React.memo(Star);
