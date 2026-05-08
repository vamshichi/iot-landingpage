'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import {
  Globe,
  Landmark,
  ShieldCheck,
  BriefcaseBusiness,
  ArrowRight,
  Sparkles,
} from 'lucide-react'

interface Stat {
  label: string
  value: number
  suffix: string
  icon: any
}

const stats: Stat[] = [
  {
    label: 'Global Leaders',
    value: 500,
    suffix: '+',
    icon: Globe,
  },
  {
    label: 'Government Delegates',
    value: 200,
    suffix: '+',
    icon: Landmark,
  },
  {
    label: 'Cybersecurity Executives',
    value: 800,
    suffix: '+',
    icon: ShieldCheck,
  },
  {
    label: 'Enterprise Decision Makers',
    value: 1000,
    suffix: '+',
    icon: BriefcaseBusiness,
  },
]

function AnimatedCounter({
  value,
  suffix,
}: {
  value: number
  suffix: string
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 2000
    const increment = value / (duration / 30)

    const timer = setInterval(() => {
      start += increment

      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 30)

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
  return (
    <section className="relative overflow-hidden bg-[#020617] py-20 md:py-32 px-4 md:px-8">

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />

      {/* Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-10" />

      {/* Radial Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.12),transparent_50%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-medium uppercase tracking-wider">
              Global Recognition
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-5xl mx-auto">
            The Ultimate
            <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Moment Of Recognition
            </span>
          </h2>

          <p className="mt-8 text-base sm:text-lg md:text-xl text-white/60 max-w-4xl mx-auto leading-relaxed">
            The IoT Security Leadership Excellence Awards 2026 will be presented
            live on stage before an elite gathering of global cybersecurity
            leaders, government authorities, CIOs, CISOs, infrastructure
            operators, and enterprise decision-makers.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">

          {stats.map((stat, index) => {
            const Icon = stat.icon

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 transition-all duration-500 hover:border-cyan-400/40 hover:bg-white/[0.06] hover:shadow-[0_0_40px_rgba(6,182,212,0.15)]"
              >

                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10" />

                {/* Animated Border */}
                <div className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 group-hover:w-full" />

                {/* Icon */}
                <div className="relative z-10 mb-6">
                  <div className="flex items-center justify-center w-16 h-16 rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-cyan-400" />
                  </div>
                </div>

                {/* Counter */}
                <div className="relative z-10">
                  <h3 className="text-5xl font-bold text-white mb-3">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                    />
                  </h3>

                  <p className="text-white/60 text-lg leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                    {stat.label}
                  </p>
                </div>

                {/* Hover Action */}
                <div className="relative z-10 mt-6 flex items-center gap-2 text-cyan-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span>Global Participation</span>
                  <ArrowRight className="w-4 h-4" />
                </div>

              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >

          <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
            Join the region’s most prestigious gathering of cybersecurity,
            infrastructure, and digital transformation leaders.
          </p>

          <button className="group relative overflow-hidden rounded-2xl bg-cyan-500 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-cyan-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.45)]">

            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10 flex items-center gap-3">
              <span>Reserve Your Seat</span>
              <ArrowRight className="w-5 h-5" />
            </div>

          </button>
        </motion.div>

      </div>
    </section>
  )
}