import ErrorBoundary from "@components/common/ErrorBoundary";
import ExoplanetInfo from "@components/modal/ExoplanetInfo";
import ExoplanetList from "@components/modal/ExoplanetList";
import GoToHWO from "@components/modal/GoToHWO";
import SideSettingBar from "@components/modal/SideSettingBar";
import SpecType from "@components/modal/SpecType";
import MainRenderer from "@components/renderer/MainRenderer";
import Postprocessing from "@components/renderer/PostProcessing";
import ZoomRenderer from "@components/renderer/ZoomRenderer";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { initializeData } from "@utils/initializeData";
import { Suspense, useMemo, useRef } from "react";

export default function App() {
  const controlRef = useRef<any>(null);

  const [starDatas, planetDatas] = useMemo(() => initializeData(), []);
  console.log(starDatas.length);
  console.log(planetDatas.length);

  return (
    <div className="w-screen h-screen bg-black">
      <Suspense
        fallback={
          <div className="w-screen h-screen flex justify-center items-center">
            <p className="text-3xl text-white">Loading 3D scene...</p>
          </div>
        }
      >
        <Canvas
          camera={{
            position: [0, 0, 5],
            near: 0.001,
            far: 999999999999999,
            fov: 75,
          }}
        >
          <OrbitControls
            ref={controlRef}
            enableZoom={true}
            target={[0, 0, 0]}
            enableDamping={true}
            dampingFactor={0.1}
          />
          <MainRenderer starDatas={starDatas} planetDatas={planetDatas} />
          <ZoomRenderer
            starDatas={starDatas}
            planetDatas={planetDatas}
            controlRef={controlRef}
          />
          <Postprocessing />
        </Canvas>
        <ErrorBoundary>
          <SideSettingBar />
        </ErrorBoundary>
        <ExoplanetList />
        <GoToHWO />
        <SpecType />
        <ExoplanetInfo planetDatas={planetDatas} />
      </Suspense>
    </div>
  );
}
