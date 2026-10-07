import { ContactShadows, Environment, Float, Lightformer, RoundedBox } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import { MathUtils, type Group } from 'three'

const GOLD = '#c8a66a'
const PEARL = '#f3ebe0'

/** Gira suavemente la composición hacia el puntero para dar profundidad. */
function Rig({ children, still }: { children: React.ReactNode; still: boolean }) {
  const group = useRef<Group>(null)
  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    const t = still ? 0 : state.clock.elapsedTime
    g.rotation.y = MathUtils.damp(g.rotation.y, state.pointer.x * 0.45 + Math.sin(t * 0.25) * 0.15, 3, delta)
    g.rotation.x = MathUtils.damp(g.rotation.x, -state.pointer.y * 0.2, 3, delta)
  })
  return <group ref={group}>{children}</group>
}

function Bottle() {
  return (
    <group position={[0, -0.15, 0]}>
      {/* Cuerpo de cristal */}
      <RoundedBox args={[1.5, 1.9, 0.8]} radius={0.16} smoothness={6}>
        <meshPhysicalMaterial
          color="#f7efe6"
          transmission={1}
          thickness={1.2}
          roughness={0.04}
          ior={1.45}
          clearcoat={1}
          attenuationColor="#e7c9a0"
          attenuationDistance={2.2}
        />
      </RoundedBox>
      {/* Líquido ámbar */}
      <RoundedBox args={[1.22, 1.15, 0.55]} radius={0.12} position={[0, -0.3, 0]}>
        <meshPhysicalMaterial color="#d9b27a" roughness={0.15} transmission={0.6} thickness={0.6} />
      </RoundedBox>
      {/* Etiqueta dorada */}
      <mesh position={[0, 0.15, 0.405]}>
        <planeGeometry args={[0.8, 0.28]} />
        <meshStandardMaterial color={GOLD} metalness={0.55} roughness={0.35} emissive="#6b5230" emissiveIntensity={0.35} />
      </mesh>
      {/* Cuello y tapa */}
      <mesh position={[0, 1.08, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.28, 48]} />
        <meshStandardMaterial color={GOLD} metalness={1} roughness={0.2} />
      </mesh>
      <RoundedBox args={[0.72, 0.62, 0.72]} radius={0.08} position={[0, 1.5, 0]}>
        <meshStandardMaterial color="#2a1f1a" metalness={0.6} roughness={0.25} />
      </RoundedBox>
    </group>
  )
}

function Pearl({ position, scale, speed }: { position: [number, number, number]; scale: number; speed: number }) {
  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={1.4}>
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial color={PEARL} roughness={0.18} metalness={0.05} clearcoat={1} sheen={1} sheenColor="#f6dccb" iridescence={0.6} />
      </mesh>
    </Float>
  )
}

function Ring({ still }: { still: boolean }) {
  const ref = useRef<Group>(null)
  useFrame((_, delta) => {
    if (ref.current && !still) ref.current.rotation.z += delta * 0.15
  })
  return (
    <group ref={ref} position={[0, 0.2, -1.4]} rotation={[0.35, 0, 0]}>
      <mesh>
        <torusGeometry args={[2.05, 0.03, 32, 200]} />
        <meshStandardMaterial color={GOLD} metalness={1} roughness={0.18} />
      </mesh>
    </group>
  )
}

export default function HeroScene({ active = true }: { active?: boolean }) {
  const reduce = useReducedMotion() ?? false
  const speed = reduce ? 0 : 1

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.2, 8.6], fov: 34 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={active ? 'always' : 'never'}
      aria-hidden="true"
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 5, 4]} intensity={2.2} color="#fff4e6" />
      <Rig still={reduce}>
        <Float speed={speed * 1.2} rotationIntensity={0.25} floatIntensity={0.6}>
          <Bottle />
        </Float>
        <Ring still={reduce} />
        <Pearl position={[-1.55, 1.1, 0.4]} scale={0.32} speed={speed * 1.6} />
        <Pearl position={[1.6, -0.9, 0.8]} scale={0.42} speed={speed * 1.3} />
        <Pearl position={[1.5, 1.55, -0.6]} scale={0.2} speed={speed * 2} />
        <Pearl position={[-1.4, -1.35, 0.9]} scale={0.18} speed={speed * 1.8} />
      </Rig>
      <ContactShadows position={[0, -1.9, 0]} opacity={0.35} scale={8} blur={2.6} far={3} color="#5a4030" />
      {/* Iluminación de estudio generada localmente: no descarga mapas HDR externos. */}
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3} position={[0, 4, 2]} scale={[8, 2, 1]} color="#fff6ea" />
        <Lightformer form="rect" intensity={2} position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[6, 2, 1]} color="#f2d9b8" />
        <Lightformer form="rect" intensity={1.5} position={[5, -1, -1]} rotation-y={-Math.PI / 2} scale={[6, 2, 1]} color="#ffffff" />
        <Lightformer form="ring" intensity={2} position={[0, 0, -6]} scale={4} color="#e8c99a" />
      </Environment>
    </Canvas>
  )
}
