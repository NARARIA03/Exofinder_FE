import { EARTH_SIZE } from "@constants/unit";
import { clickExoplanetNameAtom, observationDateAtom } from "@store/jotai";
import { getCoordinate } from "@utils/getCoordinate";
import { useAtomValue } from "jotai";
import React, { useEffect, useMemo, useState } from "react";
import * as THREE from "three";

function Earth() {
  const earthGeo = useMemo(
    () => new THREE.SphereGeometry(EARTH_SIZE, 32, 32),
    []
  );
  const earthMat = useMemo(() => {
    const textureLoader = new THREE.TextureLoader();
    const earthText = textureLoader.load("/FrontEnd/assets/earth.jpg");
    return new THREE.MeshBasicMaterial({
      map: earthText,
      depthTest: false,
      depthWrite: false,
    });
  }, []);

  const clickExoplanetName = useAtomValue(clickExoplanetNameAtom);
  const [earthCoordinate, setEarthCoordinate] =
    useState<[number, number, number]>();
  const observationDate = useAtomValue(observationDateAtom);

  useEffect(() => {
    if (observationDate === "Mar") {
      const coordinate = getCoordinate(180, 0, 0.01003);
      setEarthCoordinate([coordinate.x, coordinate.y, coordinate.z]);
    } else {
      const coordinate = getCoordinate(0, 0, 0.01003);
      setEarthCoordinate([coordinate.x, coordinate.y, coordinate.z]);
    }
  }, [observationDate]);

  if (clickExoplanetName) return null;

  return (
    <>
      <mesh
        name="Earth"
        visible={!clickExoplanetName}
        position={earthCoordinate}
        geometry={earthGeo}
        material={earthMat}
      />
    </>
  );
}

export default React.memo(Earth);
