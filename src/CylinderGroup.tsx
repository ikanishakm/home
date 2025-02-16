import  { useRef, useEffect, useMemo } from "react"
import { MeshTransmissionMaterial } from "@react-three/drei"
import { Matrix4, DoubleSide } from "three"

const CylinderGroup = () => {
  // Create a ref for the instanced mesh
  const meshRef = useRef(null)
  const count = 40
  const diameter = 0.1

  const cylinderPos = useMemo(() => {
    const arr = []
    for (let i = 0; i < count; i++) {
      arr.push([(i - count / 2) * diameter * 2, 0, 0])
    }
    return arr
  }, [])
  // Example positions array - you can modify these coordinates

  useEffect(() => {
    // Skip if mesh reference isn't ready
    if (!meshRef.current) return

    // Create a temporary matrix for each instance
    const matrix = new Matrix4()

    // Set the position for each instance
    cylinderPos.forEach((pos, i) => {
      matrix.setPosition(pos[0], pos[1], pos[2])
      // @ts-ignore
      meshRef.current.setMatrixAt(i, matrix)
    })

    // Update the instance matrix buffer
    // @ts-ignore
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [])

  return (
      // @ts-ignore
    <instancedMesh ref={meshRef} args={[null, null, count]} rotation={[0, 0, Math.PI / 4]}>
      <cylinderGeometry args={[diameter, diameter, 10, 32]} />
      <MeshTransmissionMaterial
        transmission={1}
        side={DoubleSide}
        color="#ffffff"
        roughness={0.5}
        ior={1.33}
        thickness={0.1}
        temporalDistortion={0.1}
        metalness={0.12}
        dispersion={3}
        transparent
      />
    </instancedMesh>
  )
}

export default CylinderGroup
