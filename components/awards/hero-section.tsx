'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { CalendarDays, MapPin } from 'lucide-react'

export function HeroSection() {
  return (
<section className="relative min-h-screen w-full overflow-hidden pt-24 md:pt-28 lg:pt-32 bg-gradient-to-b from-background via-background to-secondary-background">
        <div className="cyber-grid absolute inset-0 opacity-20" />
      
      {/* Animated particles background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full opacity-50"
            animate={{
              x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
              y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Event Label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 inline-block"
          >
            <div className="px-4 py-2 rounded-full border border-primary/50 bg-primary/10 backdrop-blur-sm">
              <span className="text-sm font-medium text-primary">Hosted Alongside IOT Security World Summit Abu Dhabi 2026</span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground leading-tight tracking-tight"
          >
            IOT Security Leadership
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mt-2">
              Excellence Awards 2026
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Honouring the Visionaries Securing the Future of Connected Infrastructure
          </motion.p>

          {/* Date and Location */}
          <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.5 }}
  className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 text-foreground/70"
>
  <div className="flex items-center gap-2">
    <CalendarDays className="w-5 h-5 text-primary" />
    <span className="text-lg font-medium">23rd July 2026</span>
  </div>

  <div className="hidden sm:block w-px h-6 bg-primary/30" />

  <div className="flex items-center gap-2">
    <MapPin className="w-5 h-5 text-primary" />
    <span className="text-lg font-medium">Abu Dhabi</span>
  </div>
</motion.div>

          {/* CTA Buttons */}
          <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.6 }}
  className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
>
  <button className="px-6 py-2 rounded-xl bg-cyan-500 text-white font-semibold text-lg hover:bg-cyan-600 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105">
    Nominate Now
  </button>

  {/* <button className="px-6 py-2 rounded-xl border border-cyan-500 text-cyan-400 font-semibold text-lg hover:bg-cyan-500 hover:text-white transition-all duration-300 backdrop-blur-sm">
    Download Brochure
  </button> */}
</motion.div>
        </motion.div>

        {/* Scroll indicator */}
        {/* <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute bottom-8"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-primary/60" />
          </motion.div>
        </motion.div> */}
      </div>
    </section>
  )
}
