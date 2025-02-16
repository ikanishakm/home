import "./App.css"
import { Canvas } from "@react-three/fiber"
import { Scene } from "./Scene"
import { OrbitControls } from "@react-three/drei"

function App() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas
        gl={{ alpha: false, antialias: true }}
        camera={{ position: [0, 0, 1.75] }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}

export default App
