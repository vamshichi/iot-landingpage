'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface Stat {
  label: string
  value: number
  suffix: string
}

const stats: Stat[] = [
  { label: 'Global Leaders', value: 500, suffix: '+' },
  { label: 'Government Delegates', value: 200, suffix: '+' },
  { label: 'Cybersecurity Executives', value: 800, suffix: '+' },
  { label: 'Enterprise Decision Makers', value: 1000, suffix: '+' },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = value
    const duration = 2000
    const increment = end / (duration / 50)

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 50)

    return () => clearInterval(timer)
  }, [value])

  return (
    <>
      {count}
      {suffix}
    </>
  )
}

export function MomentOfRecognitionSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className="relative w-full py-20 md:py-32 px-4 md:px-8 bg-background overflow-hidden">
      {/* Cinematic background */}
      <div className="absolute inset-0">
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-background to-primary/10" />
        
        {/* Animated light rays */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        </div>

        {/* Corner glows */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            The Moment of Recognition
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            The IOT Security Leadership Excellence Awards 2026 will be presented live on stage before an elite audience of government officials, CISOs, CIOs, regulators, cybersecurity leaders, and enterprise decision-makers.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
            //   variants={itemVariants}
              className="group glow-border glass-effect p-8 rounded-lg text-center cursor-pointer transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,217,255,0.4)] hover:-translate-y-2"
            >
              <div className="mb-4 inline-block p-3 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
              </div>
              <p className="text-foreground/70 font-semibold">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-foreground/60 text-lg mb-8">
            Be part of this prestigious gathering of security leaders
          </p>
          <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-background font-semibold text-lg hover:shadow-[0_0_30px_rgba(0,217,255,0.5)] transition-all duration-300 transform hover:scale-105">
            Reserve Your Seat
          </button>
        </motion.div>
      </div>
    </section>
  )
}
