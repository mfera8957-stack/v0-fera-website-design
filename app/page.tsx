"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 150 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)
  
  const rotateX = useTransform(springY, [-0.5, 0.5], [2, -2])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-2, 2])

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <main
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen bg-background text-foreground overflow-hidden selection:bg-foreground selection:text-background"
    >
      {/* Subtle animated background grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: mounted ? 0.03 : 0 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 md:py-8"
      >
        <Link 
          href="/credits" 
          className="group relative text-xs tracking-[0.2em] uppercase font-medium"
        >
          <span className="relative z-10">Credits</span>
          <span className="absolute bottom-0 left-0 w-0 h-px bg-foreground transition-all duration-300 ease-out group-hover:w-full" />
        </Link>
        
        <div className="flex items-center gap-8">
          <NavLink href="https://www.instagram.com/mfera_0/" external>
            Instagram
          </NavLink>
          <NavLink href="https://www.beatstars.com/mfera" external>
            BeatStars
          </NavLink>
          <NavLink href="mailto:mfera8957@gmail.com">
            Email
          </NavLink>
        </div>
      </motion.nav>

      {/* Main content */}
      <div className="relative flex flex-col items-center justify-center min-h-screen px-6">
        {/* Giant FERA title with parallax effect */}
        <motion.div
          style={{ rotateX, rotateY, transformPerspective: 1000 }}
          className="relative"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.4, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="relative text-[20vw] md:text-[18vw] lg:text-[16vw] font-bold tracking-[-0.04em] leading-[0.85] select-none"
          >
            <span className="relative inline-block">
              {/* Glitch/shadow layers for depth */}
              <span 
                className="absolute inset-0 text-foreground/[0.03] blur-[2px]"
                style={{ transform: 'translate(4px, 4px)' }}
                aria-hidden="true"
              >
                FERA
              </span>
              <span 
                className="absolute inset-0 text-foreground/[0.02] blur-[4px]"
                style={{ transform: 'translate(8px, 8px)' }}
                aria-hidden="true"
              >
                FERA
              </span>
              {/* Main text */}
              <span className="relative">FERA</span>
            </span>
          </motion.h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 md:mt-6 text-sm md:text-base tracking-[0.3em] uppercase text-muted-foreground font-light"
        >
          swiss producer
        </motion.p>

        {/* Animated line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 w-16 h-px bg-foreground/20 origin-center"
        />

        {/* Floating decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="absolute bottom-12 left-6 md:left-12 text-[10px] tracking-[0.15em] uppercase text-muted-foreground/60"
        >
          <span className="inline-block">Based in Switzerland</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="absolute bottom-12 right-6 md:right-12 text-[10px] tracking-[0.15em] uppercase text-muted-foreground/60"
        >
          <span className="inline-block">EST. 2024</span>
        </motion.div>
      </div>

      {/* Cursor follower */}
      {mounted && <CursorFollower springX={springX} springY={springY} />}
    </main>
  )
}

function NavLink({ 
  href, 
  children, 
  external = false 
}: { 
  href: string
  children: React.ReactNode
  external?: boolean 
}) {
  const linkProps = external 
    ? { target: "_blank", rel: "noopener noreferrer" } 
    : {}
  
  return (
    <a
      href={href}
      {...linkProps}
      className="group relative text-xs tracking-[0.2em] uppercase font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute bottom-0 left-0 w-0 h-px bg-foreground transition-all duration-300 ease-out group-hover:w-full" />
    </a>
  )
}

function CursorFollower({ 
  springX, 
  springY 
}: { 
  springX: ReturnType<typeof useSpring>
  springY: ReturnType<typeof useSpring>
}) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  
  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight })
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const size = 140
  const x = useTransform(springX, [-0.5, 0.5], [-size / 2, dimensions.width - size / 2])
  const y = useTransform(springY, [-0.5, 0.5], [-size / 2, dimensions.height - size / 2])

  if (dimensions.width === 0) return null

  return (
    <>
      {/* SVG Filter for chromatic aberration distortion */}
      <svg className="fixed w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="glass-distortion" x="-50%" y="-50%" width="200%" height="200%">
            {/* Turbulence for organic glass-like distortion */}
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.015" 
              numOctaves="2" 
              seed="5"
              result="noise"
            />
            {/* Displacement map for the warping effect */}
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="noise" 
              scale="8" 
              xChannelSelector="R" 
              yChannelSelector="G"
              result="displaced"
            />
            {/* Chromatic aberration - split RGB channels */}
            <feOffset in="displaced" dx="-2" dy="0" result="red" />
            <feOffset in="displaced" dx="2" dy="0" result="blue" />
            <feOffset in="displaced" dx="0" dy="0" result="green" />
            {/* Extract color channels */}
            <feColorMatrix 
              in="red" 
              type="matrix" 
              values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="redChannel"
            />
            <feColorMatrix 
              in="green" 
              type="matrix" 
              values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="greenChannel"
            />
            <feColorMatrix 
              in="blue" 
              type="matrix" 
              values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
              result="blueChannel"
            />
            {/* Combine channels with screen blend for that rainbow glass effect */}
            <feBlend in="redChannel" in2="greenChannel" mode="screen" result="rg" />
            <feBlend in="rg" in2="blueChannel" mode="screen" result="final" />
          </filter>
        </defs>
      </svg>

      {/* Glass droplet that follows cursor */}
      <motion.div
        className="fixed pointer-events-none z-[100]"
        style={{
          x,
          y,
          width: size,
          height: size,
        }}
      >
        {/* Main glass orb with backdrop blur and distortion */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            backdropFilter: 'blur(12px) saturate(180%)',
            WebkitBackdropFilter: 'blur(12px) saturate(180%)',
            filter: 'url(#glass-distortion)',
          }}
        />
        {/* Inner glass highlight for depth */}
        <div 
          className="absolute inset-2 rounded-full opacity-60"
          style={{
            background: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.4) 0%, transparent 50%)',
          }}
        />
        {/* Colored edge refraction */}
        <div 
          className="absolute inset-0 rounded-full opacity-30"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(255,100,100,0.3) 0%, transparent 40%),
              radial-gradient(circle at 80% 30%, rgba(100,100,255,0.3) 0%, transparent 40%),
              radial-gradient(circle at 50% 80%, rgba(100,255,100,0.2) 0%, transparent 40%)
            `,
          }}
        />
        {/* Glass border/edge */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: 'transparent',
            boxShadow: `
              inset 0 0 20px rgba(255,255,255,0.2),
              inset 0 0 40px rgba(255,255,255,0.1),
              0 0 30px rgba(0,0,0,0.05)
            `,
            border: '1px solid rgba(255,255,255,0.15)',
          }}
        />
      </motion.div>
    </>
  )
}
