import * as THREE from "three";
import { useSetAtom } from "jotai";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { hwoRaDecAtom } from "@store/jotai";

export const useUpdateRaDec = (camera: THREE.PerspectiveCamera) => {
  const setHwoRaDec = useSetAtom(hwoRaDecAtom);

  const prevRa = useRef<number | null>(null);
  const prevDec = useRef<number | null>(null);

  useFrame(() => {
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);

    const dec = Math.round(Math.asin(direction.y) * (180 / Math.PI));
    let ra = Math.atan2(direction.z, direction.x) * (180 / Math.PI);
    if (ra < 0) ra += 360;
    ra = Math.round(ra);
    if (prevRa.current !== ra || prevDec.current !== dec) {
      console.log("RA, DEC 변경 감지!");
      setHwoRaDec({ dec, ra });
      prevRa.current = ra;
      prevDec.current = dec;
    }
  });
};
