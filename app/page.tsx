"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

// Letter sprite data with 2 frames each
const LETTER_SPRITES = {
  F: {
    frame1: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/F_frame1-PpL1qrYzb3YUcvmNxg7l2RKfy3Tsrq.png",
    frame2: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/F_frame2-aNtO8ewASysaHgTCuHb8Lwvo71uYCh.png",
  },
  E: {
    frame1: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/E_frame1-m1ZZUaVj8cfDZlSOxpTQ28rvLSRaaL.png",
    frame2: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/E_frame2-BzXWjG3GAaRurlx7P6PzlvXLVD6lNS.png",
  },
  R: {
    frame1: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/R_frame1-72HQAKEZHmtM1xVLkD5FOLjFhKB2Eh.png",
    frame2: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/R_frame2-0sb4bDfW8Ig8OE7UkAi8BhyFuSoS0s.png",
  },
  A: {
    frame1: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/A_frame1-6BecOEf51xK2tmsu8uMm81sFCtz0LB.png",
    frame2: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/A_frame2-Ds2mXfnNnzSOyXDb9IEJf3CV4tX2im.png",
  },
}

const SKY_FRAMES = {
  frame1: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sky1.png-2sJJuks0l1UOKxTfYQqdecYGH4Zgqy.jpeg",
  frame2: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sky2.png-fDVxaadeYCSUXMNHCsXjsRQTsmSLBW.jpeg",
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [skyFrame, setSkyFrame] = useState(1)

  useEffect(() => {
    setMounted(true)
    // Sky background animation - slower interval (1.5 seconds)
    const skyInterval = setInterval(() => {
      setSkyFrame(prev => prev === 1 ? 2 : 1)
    }, 1500)
    
    return () => clearInterval(skyInterval)
  }, [])

  return (
    <main className="relative text-foreground selection:bg-foreground selection:text-background">
      {/* Fixed animated sky background */}
      <div className="fixed inset-0 z-0">
        <Image
          src={skyFrame === 1 ? SKY_FRAMES.frame1 : SKY_FRAMES.frame2}
          alt=""
          fill
          className="object-cover transition-opacity duration-700"
          priority
          unoptimized
        />
      </div>

      {/* Hero Section - Full viewport */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Animated FERA title using letter sprites */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            duration: 1.2, 
            delay: 0.4, 
            ease: [0.16, 1, 0.3, 1] 
          }}
          className="flex items-center justify-center gap-[-2vw] md:gap-[-1vw]"
        >
          {(['F', 'E', 'R', 'A'] as const).map((letter, index) => (
            <AnimatedLetter 
              key={letter} 
              letter={letter} 
              delay={index * 0.1} 
            />
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
          >
            <motion.div className="w-1 h-2 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Content Section - Below the fold with glass containers */}
      <section className="relative z-10 min-h-screen px-6 py-24 flex flex-col items-center justify-center gap-12">
        {/* Main info glass card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl"
        >
          <div 
            className="p-8 md:p-12 rounded-2xl"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
            }}
          >
            <h2 
              className="text-2xl md:text-3xl font-bold mb-4 text-white"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}
            >
              Swiss Producer
            </h2>
            <p 
              className="text-white/80 text-sm md:text-base leading-relaxed mb-8"
              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.15)' }}
            >
              Crafting premium beats and soundscapes. Based in Switzerland, creating music for artists worldwide.
            </p>
            
            {/* Navigation links */}
            <div className="flex flex-wrap gap-4">
              <GlassLink href="https://www.instagram.com/mfera_0/" external>
                Instagram
              </GlassLink>
              <GlassLink href="https://www.beatstars.com/mfera" external>
                BeatStars
              </GlassLink>
              <GlassLink href="mailto:mfera8957@gmail.com">
                Email
              </GlassLink>
            </div>
          </div>
        </motion.div>

        {/* Credits link glass card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href="/credits">
            <div 
              className="px-8 py-4 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.15)',
              }}
            >
              <span 
                className="text-sm tracking-[0.2em] uppercase font-medium text-white/90"
                style={{ textShadow: '0 1px 4px rgba(0,0,0,0.15)' }}
              >
                View Credits
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex items-center gap-8 text-[10px] tracking-[0.15em] uppercase text-white/50"
          style={{ textShadow: '0 1px 4px rgba(0,0,0,0.2)' }}
        >
          <span>Based in Switzerland</span>
          <span className="w-px h-3 bg-white/20" />
          <span>EST. 2024</span>
        </motion.div>
      </section>
    </main>
  )
}

// Animated letter component with frame switching
function AnimatedLetter({ 
  letter, 
  delay = 0 
}: { 
  letter: keyof typeof LETTER_SPRITES
  delay?: number 
}) {
  const [frame, setFrame] = useState(1)
  
  useEffect(() => {
    // Offset each letter's animation by its delay for variety
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setFrame(prev => prev === 1 ? 2 : 1)
      }, 400)
      
      return () => clearInterval(interval)
    }, delay * 1000)
    
    return () => clearTimeout(timeout)
  }, [delay])
  
  // Start interval immediately as well
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(prev => prev === 1 ? 2 : 1)
    }, 400)
    
    return () => clearInterval(interval)
  }, [])

  const sprites = LETTER_SPRITES[letter]
  const currentSrc = frame === 1 ? sprites.frame1 : sprites.frame2

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay }}
      className="relative w-[22vw] h-[28vw] md:w-[18vw] md:h-[24vw] lg:w-[14vw] lg:h-[18vw]"
      style={{
        filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.3))',
      }}
    >
      <Image
        src={currentSrc}
        alt={letter}
        fill
        className="object-contain"
        unoptimized
      />
    </motion.div>
  )
}

// Glass-styled link button
function GlassLink({ 
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
      className="px-5 py-2.5 rounded-lg text-xs tracking-[0.15em] uppercase font-medium text-white/90 transition-all duration-300 hover:scale-105 hover:bg-white/20"
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.12)',
        textShadow: '0 1px 4px rgba(0,0,0,0.15)',
      }}
    >
      {children}
    </a>
  )
}
