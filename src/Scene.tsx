import {  useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Mesh, } from "three"
import {
  OrbitControls,
} from "@react-three/drei"
        //@ts-ignore

import vertexShader from "./shaders/vertexShader.js"
        //@ts-ignore

import fragmentShader from "./shaders/fragmentShader.js"

import CylinderGroup from "./CylinderGroup"

export function Scene() {
  const meshRef = useRef<Mesh>(null)
  const uniforms = {
    u_time: { value: 0.0 },
    u_mouse: {
      value: {
        x: 0.0,
        y: 0.0,
      },
    },
    u_resolution: {
      value: {
        x: window.innerWidth * window.devicePixelRatio,
        y: window.innerHeight * window.devicePixelRatio,
      },
    },
    u_bFactor: { value: 0.4 },
    u_pcurveHandle: { value: 0.8 },
  }
  useFrame((state, delta) => {
    if (meshRef.current) {
        //@ts-ignore
      meshRef.current.material.uniforms.u_time.value += delta
      //   meshRef.current.rotation.x += delta*0.05
      //   meshRef.current.rotation.y += delta * 0.05
    }
  })

  return (
    <>
      <CylinderGroup />
      {/* <group>
        {cylinderPos.map((pos, index) => (
          <mesh key={index} position={pos}>
            <cylinderGeometry args={[diameter, diameter, 4, 16]} />
            <MeshTransmissionMaterial color="#4f46e5" />
          </mesh>
        ))}
      </group> */}
      <mesh position={[0, 0, -2]} ref={meshRef}>
        <sphereGeometry args={[2, 32, 32]} />
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>
    </>
  )
}
