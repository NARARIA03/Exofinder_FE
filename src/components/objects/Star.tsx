import * as THREE from "three";
import React, { useMemo } from "react";
import { StarData } from "@@types/dataTypes";
import { Points } from "@react-three/drei";

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

  return (
    <mesh>
      <mesh
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
