import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Box3, Frustum, Matrix4, Mesh, PerspectiveCamera, Scene } from "three";
import {
  diameterAtom,
  visibleExoplanetAtom,
  visibleStarCountAtom,
} from "../store/jotai";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export const useFrustumCheck = (camera: PerspectiveCamera, scene: Scene) => {
  const diameter = useAtomValue(diameterAtom);
  const [visibleExoplanet, setVisibleExoplanet] = useAtom(visibleExoplanetAtom);
  const setVisibleStarCount = useSetAtom(visibleStarCountAtom);

  // init value
  const prevCamMatrix = useRef(new Matrix4());
  const prevDiameter = useRef(6);
  const raycaster = useRef(new THREE.Raycaster());

  useEffect(() => {
    const calcFrustumCheck = () => {
      const currentCameraMatrix = new Matrix4().copy(camera.matrixWorld);

      // camera diff || diameter diff -> update visibleExoplanet state
      if (
        !currentCameraMatrix.equals(prevCamMatrix.current) ||
        diameter !== prevDiameter.current
      ) {
        const frustum = new Frustum();
        const cameraViewProjectionMatrix = new Matrix4();

        // get camera view projection matrix -> update frustum
        camera.updateMatrixWorld(); // update camera matrix
        camera.updateProjectionMatrix();
        cameraViewProjectionMatrix.multiplyMatrices(
          camera.projectionMatrix,
          camera.matrixWorldInverse
        );
        frustum.setFromProjectionMatrix(cameraViewProjectionMatrix);

        const earthMesh = scene.getObjectByName("Earth");
        if (!earthMesh) return;

        // diff all object in scene
        const objectsInView: Mesh[] = [];
        scene.traverse((object) => {
          if (
            object instanceof Mesh &&
            object.visible &&
            object.name !== "Earth"
          ) {
            const objectBoundingBox = new Box3().setFromObject(object);
            if (frustum.intersectsBox(objectBoundingBox)) {
              // Raycaster 설정 (카메라에서 행성으로 향하는 방향)
              raycaster.current.set(
                camera.position,
                object.position.clone().sub(camera.position).normalize()
              );
              const intersects = raycaster.current.intersectObject(
                earthMesh,
                true
              );

              if (intersects.length === 0) {
                objectsInView.push(object);
              }
            }
          }
        });
        if (objectsInView.length !== visibleExoplanet.length) {
          setVisibleExoplanet(() =>
            objectsInView
              .map((mesh) => mesh.userData.planetName)
              .filter(
                (planetName) => planetName !== null && planetName !== undefined
              )
          );
          setVisibleStarCount(
            () =>
              objectsInView
                .map((mesh) => mesh.userData.starName)
                .filter(
                  (starName) => starName !== null && starName !== undefined
                ).length
          );
        }
        prevCamMatrix.current.copy(currentCameraMatrix);
        prevDiameter.current = diameter;
      }
    };

    const interval = setInterval(() => {
      calcFrustumCheck();
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, [
    camera,
    diameter,
    scene,
    setVisibleExoplanet,
    setVisibleStarCount,
    visibleExoplanet.length,
  ]);
};
