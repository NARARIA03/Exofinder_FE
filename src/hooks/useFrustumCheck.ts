import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Box3, Frustum, Matrix4, Mesh, PerspectiveCamera, Scene } from "three";
import {
  diameterAtom,
  visibleExoplanetAtom,
  visibleStarCountAtom,
} from "../store/jotai";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export const useFrustumCheck = (camera: PerspectiveCamera, scene: Scene) => {
  const diameter = useAtomValue(diameterAtom);
  const [visibleExoplanet, setVisibleExoplanet] = useAtom(visibleExoplanetAtom);
  const setVisibleStarCount = useSetAtom(visibleStarCountAtom);

  // 초기값
  const prevCamMatrix = useRef(new Matrix4());
  const prevDiameter = useRef(6);

  useFrame(() => {
    const currentCameraMatrix = new Matrix4().copy(camera.matrixWorld);

    // 카메라가 이전과 달라진 경우 && diameter 값이 바뀐 경우만 카메라 범위 내 행성 정보 업데이트
    if (
      !currentCameraMatrix.equals(prevCamMatrix.current) ||
      diameter !== prevDiameter.current
    ) {
      const frustum = new Frustum();
      const cameraViewProjectionMatrix = new Matrix4();

      // 카메라의 뷰 프로젝션 매트릭스를 얻어서 frustum 업데이트
      camera.updateMatrixWorld(); // 카메라의 매트릭스 업데이트
      camera.updateProjectionMatrix();
      cameraViewProjectionMatrix.multiplyMatrices(
        camera.projectionMatrix,
        camera.matrixWorldInverse
      );
      frustum.setFromProjectionMatrix(cameraViewProjectionMatrix);

      // 씬 안의 모든 오브젝트의 경계와 비교
      const objectsInView: Mesh[] = [];
      scene.traverse((object) => {
        if (object instanceof Mesh && object.visible) {
          const objectBoundingBox = new Box3().setFromObject(object);
          if (frustum.intersectsBox(objectBoundingBox)) {
            objectsInView.push(object);
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
              .filter((starName) => starName !== null && starName !== undefined)
              .length
        );
      }
      prevCamMatrix.current.copy(currentCameraMatrix);
      prevDiameter.current = diameter;
    }
  });
};
