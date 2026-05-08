'use client'

import { motion } from 'framer-motion'
import {
  Users,
  Crown,
  Building,
  Cog,
  Cloud,
  Boxes,
  Droplet,
  Briefcase,
  Lightbulb,
  ArrowUpRight,
} from 'lucide-react'

const nominees = [
  { icon: Crown, label: 'CISOs' },
  { icon: Building, label: 'CIOs & CTOs' },
  { icon: Users, label: 'Government Leaders' },
  { icon: Building, label: 'Smart City Authorities' },
  { icon: Cog, label: 'OT/ICS Security Heads' },
  { icon: Cloud, label: 'Cloud Security Leaders' },
  { icon: Boxes, label: 'Infrastructure Operators' },
  { icon: Droplet, label: 'Energy & Utility Enterprises' },
  { icon: Briefcase, label: 'Cybersecurity Vendors' },
  { icon: Lightbulb, label: 'AI Security Providers' },
]

export function WhoShouldNominateSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#020617] py-20 md:py-32 px-4 md:px-8">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />

      {/* Grid */}
      <div className="absolute inset-0 cyber-grid opacity-10" />

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
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-400 text-sm font-medium uppercase tracking-wider">
              Eligible Nominees
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Who Should
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent mt-2">
              Nominate
            </span>
          </h2>

          <p className="mt-6 text-white/60 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Celebrating innovators, decision-makers, and cybersecurity leaders
            driving the future of resilient digital infrastructure.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5 lg:gap-6">

          {nominees.map((nominee, index) => {
            const Icon = nominee.icon

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 md:p-7 text-center transition-all duration-500 hover:border-cyan-400/40 hover:bg-white/[0.06] hover:shadow-[0_0_40px_rgba(6,182,212,0.15)]"
              >

                {/* Hover Background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10" />

                {/* Top Border Animation */}
                <div className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-500" />

                {/* Icon */}
                <div className="relative z-10 flex justify-center mb-5">
                  <div className="flex items-center justify-center w-16 h-16 rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-cyan-400" />
                  </div>
                </div>

                {/* Label */}
                <div className="relative z-10">
                  <p className="text-white font-semibold text-sm md:text-base leading-relaxed">
                    {nominee.label}
                  </p>
                </div>

                {/* Hover Arrow */}
                <div className="relative z-10 mt-5 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 text-cyan-400" />
                </div>

              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}