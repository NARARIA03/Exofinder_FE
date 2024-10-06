import * as THREE from "three";
import { useMemo } from "react";

export const useStarMaterials = () => {
  const starMatO = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#2727e4",
        emissive: "#2727e4",
        emissiveIntensity: 3,
      }),
    []
  );
  const starMatB = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#004dc9",
        emissive: "#004dc9",
        emissiveIntensity: 3,
      }),
    []
  );
  const starMatA = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#61a3cc",
        emissive: "#61a3cc",
        emissiveIntensity: 3,
      }),
    []
  );
  const starMatF = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#d4e394",
        emissive: "#d4e394",
        emissiveIntensity: 3,
      }),
    []
  );
  const starMatG = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#eaff4f",
        emissive: "#eaff4f",
        emissiveIntensity: 3,
      }),
    []
  );
  const starMatK = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#d6b900",
        emissive: "#d6b900",
        emissiveIntensity: 3,
      }),
    []
  );
  const starMatM = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#e37100",
        emissive: "#e37100",
        emissiveIntensity: 3,
      }),
    []
  );
  const starMatDefault = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ffffff",
        emissive: "#ffffff",
        emissiveIntensity: 3,
      }),
    []
  );

  return {
    starMatO,
    starMatB,
    starMatA,
    starMatF,
    starMatG,
    starMatK,
    starMatM,
    starMatDefault,
  };
};