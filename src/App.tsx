import './App.css'
import { Canvas } from '@react-three/fiber'
import { Scene } from './Scene'

function App() {

  return (
    <div style={{ width: '100%', height: '100vh'}}>
      <Canvas>
        <Scene />
      </Canvas>
    </div >
  )
}

export default App
