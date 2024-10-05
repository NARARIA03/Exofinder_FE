import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import {
  EffectComposer,
  RenderPass,
  ShaderPass,
} from "three/examples/jsm/Addons.js";

const CircleShader = {
  uniforms: {
    tDiffuse: { value: null },
    resolution: { value: new THREE.Vector2() },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec2 resolution;
    varying vec2 vUv;
    
    void main() {
      vec2 uv = vUv * 2.0 - 1.0; // -1.0 to 1.0 range

      // 화면 비율을 보정해서 원형 마스크를 만듦
      uv.x *= resolution.x / resolution.y;

      float radius = 0.94; // 원의 반경
      float borderThickness = 0.05; // 테두리 두께
      float dist = length(uv);
      
      // 테두리 부분
      if (dist > radius && dist < (radius + borderThickness)) {
        gl_FragColor = vec4(0.6, 0.6, 0.6, 1.0); // 테두리 색상 (RGBA)
      }
      // 원 안쪽 부분
      else if (dist <= radius) {
        gl_FragColor = texture2D(tDiffuse, vUv);
      } 
      // 원 바깥쪽 부분은 투명
      else {
        discard;
      }
    }
  `,
};

export default function Postprocessing() {
  const { gl, scene, camera, size } = useThree();
  const composer = useRef<EffectComposer | null>(null);

  useMemo(() => {
    const renderPass = new RenderPass(scene, camera);
    const shaderPass = new ShaderPass(CircleShader);
    shaderPass.uniforms["resolution"].value = new THREE.Vector2(
      size.width,
      size.height
    );
    composer.current = new EffectComposer(gl);
    composer.current.addPass(renderPass);
    composer.current.addPass(shaderPass);
  }, [gl, scene, camera, size]);

  useFrame(() => {
    if (composer.current) composer.current.render();
  }, 1);

  return null;
}
