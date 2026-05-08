'use client'

import { motion } from 'framer-motion'
import {
  Shield,
  Zap,
  Building2,
  Lock,
  Cog,
  Scale,
} from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Critical Infrastructure Security',
    description:
      'Protecting vital national systems and assets from evolving cyber threats',
  },
  {
    icon: Zap,
    title: 'AI-Driven Cyber Defense',
    description:
      'Leveraging artificial intelligence for predictive threat prevention',
  },
  {
    icon: Building2,
    title: 'Smart City Resilience',
    description:
      'Ensuring secure operations across interconnected urban infrastructure',
  },
  {
    icon: Lock,
    title: 'Zero Trust Innovation',
    description:
      'Implementing next-generation security frameworks and principles',
  },
  {
    icon: Cog,
    title: 'Industrial OT/ICS Protection',
    description:
      'Safeguarding operational technology and industrial control systems',
  },
  {
    icon: Scale,
    title: 'National Cyber Governance',
    description:
      'Supporting regulatory compliance and national security mandates',
  },
]

export function WhyMattersSection() {
  return (
    <section className="relative w-full overflow-hidden py-20 md:py-32 px-4 md:px-8 bg-[#020617]">
      
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />

      {/* Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md mb-6">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-400 text-sm font-medium tracking-wide uppercase">
              Why These Awards Matter
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-5xl mx-auto">
            Recognising The Leaders
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent mt-2">
              Securing The Future
            </span>
          </h2>

          <p className="mt-8 text-base sm:text-lg md:text-xl text-white/60 max-w-4xl mx-auto leading-relaxed">
            As the UAE accelerates smart city expansion, sovereign cloud
            adoption, Industry 4.0 transformation, and AI-powered
            infrastructure, cybersecurity has become mission-critical for
            national resilience and digital trust.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">

          {features.map((feature, index) => {
            const Icon = feature.icon

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7 md:p-8 transition-all duration-500 hover:-translate-y-3 hover:border-cyan-400/40 hover:bg-white/[0.08] hover:shadow-[0_0_40px_rgba(6,182,212,0.15)]"
              >

                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10" />

                {/* Top Glow Line */}
                <div className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 group-hover:w-full" />

                {/* Icon */}
                <div className="relative z-10 mb-6">
                  <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/20 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-cyan-400" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-semibold text-white mb-4 leading-snug">
                    {feature.title}
                  </h3>

                  <p className="text-white/60 leading-relaxed text-base group-hover:text-white/80 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom Accent */}
                <div className="relative z-10 mt-8 flex items-center gap-2 text-cyan-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Explore More</span>
                  <div className="w-6 h-px bg-cyan-400" />
                </div>

              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}