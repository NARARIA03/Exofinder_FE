import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";

export default function App() {
  const controlRef = useRef<any>(null);
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
        </Canvas>
      </Suspense>
    </div>
  );
}
