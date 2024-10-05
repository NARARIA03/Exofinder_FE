import * as THREE from "three";
import { PlanetData } from "@@types/dataTypes";
import { useMemo, useRef } from "react";
import { getPlanetOrbit } from "@utils/getPlanetOrbit";
import { useFrame } from "@react-three/fiber";
import { Line, Text } from "@react-three/drei";

interface Props {
  planetData: PlanetData;
  hostPos: [number, number, number];
}

export default function ClickedExoplanet({ planetData, hostPos }: Props) {
  const planetGeo = useMemo(
    () => new THREE.SphereGeometry(100 * planetData.planetRadius, 16, 16),
    [planetData.planetRadius]
  );
  const planetMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: "#00f" }),
    []
  );

  const semiMajorAxis =
    planetData.semiMajorAxis > 1
      ? Math.log10(planetData.semiMajorAxis)
      : planetData.semiMajorAxis;
  const eccentricity = planetData.eccentricity;
  const randomIdx = Math.floor(Math.random() * 100);

  const points = useMemo(() => {
    return getPlanetOrbit(
      semiMajorAxis,
      eccentricity,
      hostPos,
      semiMajorAxis * 10000 + 500000
    );
  }, [eccentricity, hostPos, semiMajorAxis]);

  const curOrbitIdxRef = useRef<number>(randomIdx);
  const planetMeshRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (planetMeshRef.current) {
      curOrbitIdxRef.current = (curOrbitIdxRef.current + 1) % points.length;

      // update planet pos
      planetMeshRef.current.position.set(
        points[curOrbitIdxRef.current].x,
        points[curOrbitIdxRef.current].y,
        points[curOrbitIdxRef.current].z
      );

      // update text pos
      textRef.current?.position.set(
        points[curOrbitIdxRef.current].x,
        points[curOrbitIdxRef.current].y + 500,
        points[curOrbitIdxRef.current].z
      );
    }
  });

  return (
    <>
      <Line points={points} color={"white"} linewidth={2} />
      <mesh>
        <mesh
          position={points[curOrbitIdxRef.current]}
          ref={planetMeshRef}
          geometry={planetGeo}
          material={planetMat}
        />
        <Text
          position={[
            points[curOrbitIdxRef.current].x,
            points[curOrbitIdxRef.current].y + 500,
            points[curOrbitIdxRef.current].z,
          ]}
          fontSize={300}
          color={"white"}
          ref={textRef}
        >
          {planetData.planetName}
        </Text>
      </mesh>
    </>
  );
}
