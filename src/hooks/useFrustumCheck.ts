import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Box3, Frustum, Matrix4, Mesh, PerspectiveCamera, Scene } from "three";
import {
  diameterAtom,
  diameterPlus1CntAtom,
  visibleExoplanetAtom,
  visibleStarCountAtom,
} from "../store/jotai";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

export const useFrustumCheck = (camera: PerspectiveCamera, scene: Scene) => {
  const { size: canvasSize } = useThree();
  const diameter = useAtomValue(diameterAtom);
  const [visibleExoplanet, setVisibleExoplanet] = useAtom(visibleExoplanetAtom);
  const setVisibleStarCount = useSetAtom(visibleStarCountAtom);
  const setDiameterPlus1Cnt = useSetAtom(diameterPlus1CntAtom);

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

              // 지구가 가리지 않는 경우에만 추가
              if (intersects.length === 0) {
                // 원형 마스크의 경계에 따라 추가 검사 수행
                const screenPosition = object.position.clone().project(camera);
                const screenX = (screenPosition.x * canvasSize.width) / 2;
                const screenY = (screenPosition.y * canvasSize.height) / 2;

                const distanceFromCenter = Math.sqrt(
                  screenX * screenX + screenY * screenY
                );
                const maxRadius =
                  (Math.min(canvasSize.width, canvasSize.height) / 2) * 0.95; // 원형 마스크 경계

                // 원 안쪽에 있는 경우만 추가
                if (distanceFromCenter <= maxRadius) {
                  objectsInView.push(object);
                }
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
          setDiameterPlus1Cnt(
            () =>
              objectsInView
                .map((mesh) => mesh.userData.diameterPlus1Obj)
                .filter((bool) => bool !== null && bool !== undefined && bool)
                .length
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
    canvasSize.height,
    canvasSize.width,
    diameter,
    scene,
    setDiameterPlus1Cnt,
    setVisibleExoplanet,
    setVisibleStarCount,
    visibleExoplanet.length,
  ]);
};
