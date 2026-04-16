"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion"

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

      {/* Glass trail following cursor */}
      {mounted && <GlassTrail />}
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

function GlassTrail() {
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const idCounter = useRef(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const { x, y } = mouseRef.current
      if (x === 0 && y === 0) return
      
      idCounter.current += 1
      setTrail(prev => {
        const newTrail = [...prev, { x, y, id: idCounter.current }]
        // Keep last 12 points for a nice trail length
        return newTrail.slice(-12)
      })
    }, 40) // Spawn new orb every 40ms

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* SVG Filters for chromatic aberration */}
      <svg className="fixed w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="glass-chromatic" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="blur" />
            <feOffset in="blur" dx="-3" dy="0" result="red" />
            <feOffset in="blur" dx="3" dy="0" result="blue" />
            <feOffset in="blur" dx="0" dy="0" result="green" />
            <feColorMatrix in="red" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="redChannel" />
            <feColorMatrix in="green" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="greenChannel" />
            <feColorMatrix in="blue" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blueChannel" />
            <feBlend in="redChannel" in2="greenChannel" mode="screen" result="rg" />
            <feBlend in="rg" in2="blueChannel" mode="screen" />
          </filter>
        </defs>
      </svg>

      {/* Trail orbs */}
      <div className="fixed inset-0 pointer-events-none z-[100]">
        <AnimatePresence>
        {trail.map((point, index) => {
          const age = (index + 1) / trail.length // 0 to 1, older to newer
          const size = 30 + age * 70 // 30px to 100px
          const opacity = 0.15 + age * 0.5 // Fade older orbs
          
          return (
            <motion.div
              key={point.id}
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: opacity,
                x: point.x - size / 2,
                y: point.y - size / 2,
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ 
                type: "spring",
                damping: 20 + (1 - age) * 15, // Older = more damping = slower
                stiffness: 150 - (1 - age) * 80, // Older = less stiff = laggier
              }}
              style={{ width: size, height: size }}
              className="absolute"
            >
              {/* Glass orb with backdrop blur */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  backdropFilter: `blur(${8 + age * 8}px) saturate(${120 + age * 60}%)`,
                  WebkitBackdropFilter: `blur(${8 + age * 8}px) saturate(${120 + age * 60}%)`,
                  filter: 'url(#glass-chromatic)',
                }}
              />
              {/* Rainbow refraction colors */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: `
                    radial-gradient(circle at 25% 25%, rgba(255,120,180,${0.2 * age}) 0%, transparent 50%),
                    radial-gradient(circle at 75% 25%, rgba(120,180,255,${0.2 * age}) 0%, transparent 50%),
                    radial-gradient(circle at 50% 75%, rgba(180,255,120,${0.15 * age}) 0%, transparent 50%),
                    radial-gradient(circle at 50% 50%, rgba(255,200,100,${0.1 * age}) 0%, transparent 70%)
                  `,
                }}
              />
              {/* Glass highlight */}
              <div 
                className="absolute inset-[15%] rounded-full"
                style={{
                  background: `radial-gradient(ellipse at 30% 20%, rgba(255,255,255,${0.5 * age}) 0%, transparent 60%)`,
                }}
              />
              {/* Glass edge */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  boxShadow: `
                    inset 0 0 ${10 + age * 15}px rgba(255,255,255,${0.15 * age}),
                    0 0 ${15 + age * 20}px rgba(0,0,0,${0.03 * age})
                  `,
                  border: `1px solid rgba(255,255,255,${0.12 * age})`,
                }}
              />
            </motion.div>
          )
        })}
        </AnimatePresence>
      </div>
    </>
  )
}
