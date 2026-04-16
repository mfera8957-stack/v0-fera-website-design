"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function CreditsPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden selection:bg-foreground selection:text-background">
      {/* Subtle animated background grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ duration: 2, delay: 0.5 }}
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
          href="/" 
          className="group relative text-xs tracking-[0.2em] uppercase font-medium"
        >
          <span className="relative z-10">Back</span>
          <span className="absolute bottom-0 left-0 w-0 h-px bg-foreground transition-all duration-300 ease-out group-hover:w-full" />
        </Link>
        
        <span className="text-xs tracking-[0.2em] uppercase font-medium text-muted-foreground">
          FERA
        </span>
      </motion.nav>

      {/* Main content */}
      <div className="relative flex flex-col items-center justify-center min-h-screen px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1, 
            delay: 0.4, 
            ease: [0.16, 1, 0.3, 1] 
          }}
          className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-bold tracking-[-0.04em] leading-[0.85]"
        >
          Credits
        </motion.h1>

        {/* Animated line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 w-16 h-px bg-foreground/20 origin-center"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-sm tracking-[0.15em] uppercase text-muted-foreground font-light"
        >
          Coming soon
        </motion.p>
      </div>

      {/* Footer elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.2 }}
        className="absolute bottom-12 left-6 md:left-12 text-[10px] tracking-[0.15em] uppercase text-muted-foreground/60"
      >
        <span className="inline-block">&copy; 2024 FERA</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.2 }}
        className="absolute bottom-12 right-6 md:right-12 text-[10px] tracking-[0.15em] uppercase text-muted-foreground/60"
      >
        <span className="inline-block">All Rights Reserved</span>
      </motion.div>
    </main>
  )
}
