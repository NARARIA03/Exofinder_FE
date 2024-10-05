import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { PlanetData } from "@@types/dataTypes";
import { Text } from "@react-three/drei";

interface Props {
  planetData: PlanetData;
}

function Exoplanet({ planetData }: Props) {
  const planetGeo = useMemo(() => new THREE.SphereGeometry(300, 8, 8), []);
  const planetMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0f0",
        emissive: "#0f0",
      }),
    []
  );
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.userData = { planetName: planetData.planetName };
    }
  }, [planetData]);

  return (
    <mesh>
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
