import "./App.css"
import { Canvas } from "@react-three/fiber"
import { Scene } from "./Scene"

function App() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas style={{ background: "#000" }} camera={{ position: [0, 0, 1] }} >
        <Scene />
      </Canvas>
    </div>
  )
}

export default App
