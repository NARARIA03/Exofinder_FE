import * as THREE from "three";
import { PlanetData } from "@@types/dataTypes";
import { useMemo, useRef } from "react";
import { getPlanetOrbit } from "@utils/getPlanetOrbit";
import { useFrame } from "@react-three/fiber";
import { Line, Text } from "@react-three/drei";
import { useAtomValue } from "jotai";
import { ableCoronaOnAtom, isCoronaOnAtom } from "@store/jotai";

interface Props {
  planetData: PlanetData;
  hostPos: [number, number, number];
  isSelect: boolean;
}

export default function ClickedExoplanet({
  planetData,
  hostPos,
  isSelect,
}: Props) {
  const planetGeo = useMemo(
    () => new THREE.SphereGeometry(400 * planetData.planetRadius, 16, 16),
    [planetData.planetRadius]
  );
  const planetCoronaMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#00f",
        emissive: "#00f",
        emissiveIntensity: 2.0,
        roughness: 0.3,
        metalness: 0.0,
      }),
    []
  );

  const planetNoCoronaMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0000ff",
        emissive: "#000",
        emissiveIntensity: 0,
        roughness: 1.0,
        metalness: 0.0,
      }),
    []
  );

  const isCoronaOn = useAtomValue(isCoronaOnAtom);
  const ableCoronaOn = useAtomValue(ableCoronaOnAtom);

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
      semiMajorAxis * 10000 + 1500000
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
      <Line
        points={points}
        color={isSelect ? "yellow" : "white"}
        linewidth={2}
      />
      <mesh>
        <mesh
          position={points[curOrbitIdxRef.current]}
          ref={planetMeshRef}
          geometry={planetGeo}
          material={
            ableCoronaOn
              ? isCoronaOn
                ? planetCoronaMat
                : planetNoCoronaMat
              : planetCoronaMat
          }
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
