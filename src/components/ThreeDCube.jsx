import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

// Floating particle component
const Particle = ({ index }) => {
  const randomX = Math.random() * 100
  const randomDelay = Math.random() * 5
  const randomDuration = 3 + Math.random() * 4
  const size = 2 + Math.random() * 4

  return (
    <motion.div
      className="absolute rounded-full bg-indigo-400/60"
      style={{
        width: size,
        height: size,
        left: `${randomX}%`,
        top: '-10%',
      }}
      animate={{
        top: ['-10%', '110%'],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  )
}

export default function ThreeDCube() {
  const containerRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring physics for mouse movement
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    stiffness: 200,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
    stiffness: 200,
    damping: 30,
  })

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      // Normalize mouse position relative to container center (-0.5 to 0.5)
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      mouseX.set(x)
      mouseY.set(y)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      return () => container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mouseX, mouseY])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <Particle key={i} index={i} />
      ))}

      {/* Scene center */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Orbital ring 1 */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full border border-indigo-400/20"
          style={{ rotateX: 70, rotateY: 0 }}
          animate={{ rotateZ: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
        />

        {/* Orbital ring 2 */}
        <motion.div
          className="absolute w-[350px] h-[350px] rounded-full border border-purple-400/20"
          style={{ rotateX: -60, rotateY: 45 }}
          animate={{ rotateZ: -360 }}
          transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
        />

        {/* Outer wireframe cube (glowing edges) */}
        <motion.div
          className="cube-wrapper"
          style={{
            perspective: '800px',
            rotateX,
            rotateY,
          }}
        >
          <div
            className="outer-cube"
            style={{
              width: '250px',
              height: '250px',
              position: 'relative',
              transformStyle: 'preserve-3d',
              animation: 'spinOuter 20s infinite linear',
            }}
          >
            {/* Outer cube faces – transparent with glowing border */}
            {['front', 'back', 'right', 'left', 'top', 'bottom'].map((face, i) => {
              const transforms = {
                front: 'translateZ(125px)',
                back: 'rotateY(180deg) translateZ(125px)',
                right: 'rotateY(90deg) translateZ(125px)',
                left: 'rotateY(-90deg) translateZ(125px)',
                top: 'rotateX(90deg) translateZ(125px)',
                bottom: 'rotateX(-90deg) translateZ(125px)',
              }
              return (
                <div
                  key={face}
                  className="face"
                  style={{
                    position: 'absolute',
                    width: '250px',
                    height: '250px',
                    background: 'transparent',
                    border: '2px solid rgba(99, 102, 241, 0.4)',
                    boxShadow: '0 0 20px rgba(99, 102, 241, 0.3), inset 0 0 20px rgba(99, 102, 241, 0.1)',
                    transform: transforms[face],
                    borderRadius: '4px',
                  }}
                />
              )
            })}
          </div>
        </motion.div>

        {/* Inner solid cube (rotates opposite direction) */}
        <motion.div
          className="cube-wrapper"
          style={{
            perspective: '800px',
            rotateX: useTransform(rotateX, (val) => -val),
            rotateY: useTransform(rotateY, (val) => -val),
          }}
        >
          <div
            className="inner-cube"
            style={{
              width: '120px',
              height: '120px',
              position: 'relative',
              transformStyle: 'preserve-3d',
              animation: 'spinInner 15s infinite linear',
            }}
          >
            {['front', 'back', 'right', 'left', 'top', 'bottom'].map((face, i) => {
              const transforms = {
                front: 'translateZ(60px)',
                back: 'rotateY(180deg) translateZ(60px)',
                right: 'rotateY(90deg) translateZ(60px)',
                left: 'rotateY(-90deg) translateZ(60px)',
                top: 'rotateX(90deg) translateZ(60px)',
                bottom: 'rotateX(-90deg) translateZ(60px)',
              }
              return (
                <div
                  key={face}
                  className="face"
                  style={{
                    position: 'absolute',
                    width: '120px',
                    height: '120px',
                    background: 'rgba(99, 102, 241, 0.15)',
                    border: '1px solid rgba(99, 102, 241, 0.6)',
                    boxShadow: '0 0 15px rgba(99, 102, 241, 0.2)',
                    transform: transforms[face],
                    borderRadius: '4px',
                  }}
                />
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes spinOuter {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }
        @keyframes spinInner {
          0% { transform: rotateX(360deg) rotateY(0deg); }
          100% { transform: rotateX(0deg) rotateY(360deg); }
        }
      `}</style>
    </div>
  )
}