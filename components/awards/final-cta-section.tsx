'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Trophy,
} from 'lucide-react'

export function FinalCTASection() {
  return (
    <section className="relative overflow-hidden bg-[#020617] py-24 md:py-32 px-4">

      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-10" />

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />

      {/* Animated Lines */}
      <div className="absolute inset-0 overflow-hidden">

        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
            style={{
              top: `${15 + i * 15}%`,
              width: '100%',
            }}
            animate={{
              x: ['-100%', '100%'],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 6,
              delay: i * 0.4,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}

      </div>

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Premium Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl px-6 py-14 md:px-14 md:py-20 text-center"
        >

          {/* Glow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10" />

          {/* Top Glow Line */}
          <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />

          {/* Badge */}
          <div className="relative z-10 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md mb-8">

            <Sparkles className="w-4 h-4 text-cyan-400" />

            <span className="text-cyan-400 text-sm font-medium uppercase tracking-wider">
              Nominations Open 2026
            </span>

          </div>

          {/* Icon */}
          <div className="relative z-10 flex justify-center mb-8">

            <div className="flex items-center justify-center w-24 h-24 rounded-full border border-cyan-400/20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 shadow-[0_0_40px_rgba(6,182,212,0.2)]">

              <Trophy className="w-12 h-12 text-cyan-400" />

            </div>

          </div>

          {/* Heading */}
          <h2 className="relative z-10 text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">

            Recognise The Leaders
            <span className="block mt-3 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Securing The Future
            </span>

          </h2>

          {/* Description */}
          <p className="relative z-10 mt-8 text-base sm:text-lg md:text-xl text-white/60 leading-relaxed max-w-3xl mx-auto">

            Join the most prestigious cybersecurity recognition platform
            celebrating innovation, resilience, and leadership in IoT,
            smart infrastructure, AI security, and digital transformation.

          </p>

          {/* Stats */}
          <div className="relative z-10 mt-12 grid grid-cols-2 md:grid-cols-4 gap-5">

            {[
              '500+ Global Leaders',
              '1000+ Delegates',
              '50+ Award Categories',
              '25+ Countries',
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5 backdrop-blur-xl"
              >
                <p className="text-cyan-400 font-bold text-xl mb-1">
                  {item.split(' ')[0]}
                </p>

                <p className="text-white/60 text-sm">
                  {item.replace(item.split(' ')[0], '')}
                </p>
              </div>
            ))}

          </div>

          {/* CTA Buttons */}
          <div className="relative z-10 mt-14 flex flex-col sm:flex-row gap-5 justify-center">

            {/* Primary */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group relative overflow-hidden rounded-2xl bg-cyan-500 px-8 py-4 text-white font-semibold text-lg transition-all duration-300 hover:bg-cyan-400 hover:shadow-[0_0_40px_rgba(6,182,212,0.4)]"
            >

              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10 flex items-center justify-center gap-3">
                <ShieldCheck className="w-5 h-5" />
                <span>Submit Nomination</span>
                <ArrowRight className="w-5 h-5" />
              </div>

            </motion.button>

            {/* Secondary */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group rounded-2xl border border-cyan-400/30 bg-white/[0.03] px-8 py-4 text-cyan-400 font-semibold text-lg backdrop-blur-xl transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-white"
            >

              <div className="flex items-center justify-center gap-3">
                <span>Become A Sponsor</span>
                <ArrowRight className="w-5 h-5" />
              </div>

            </motion.button>

          </div>

        </motion.div>
      </div>
    </section>
  )
}