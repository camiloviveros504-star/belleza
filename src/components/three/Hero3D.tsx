import { useInView } from 'motion/react'
import { Component, Suspense, lazy, useRef, useState, type ReactNode } from 'react'

const HeroScene = lazy(() => import('./HeroScene'))

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

/** Fondo decorativo mientras carga la escena, o si el dispositivo no soporta WebGL. */
function Fallback() {
  return (
    <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
      <div className="size-64 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fffaf2,#e8d5bc_45%,#b8955a_100%)] opacity-80 blur-[2px] sm:size-80" />
    </div>
  )
}

export function Hero3D() {
  const ref = useRef<HTMLDivElement>(null)
  // La escena se pausa fuera de pantalla para ahorrar batería.
  const inView = useInView(ref, { margin: '100px' })
  const [webgl] = useState(supportsWebGL)

  return (
    <div ref={ref} className="absolute inset-0">
      {webgl ? (
        <SceneBoundary fallback={<Fallback />}>
          <Suspense fallback={<Fallback />}>
            <HeroScene active={inView} />
          </Suspense>
        </SceneBoundary>
      ) : (
        <Fallback />
      )}
    </div>
  )
}
