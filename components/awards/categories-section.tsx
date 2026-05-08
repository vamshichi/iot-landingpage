'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield,
  Building2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'

const delegateCategories = [
  'CISO of the Year – Critical Infrastructure Security',
  'IoT Security Transformation Leader',
  'Smart City Cybersecurity Leadership Award',
  'AI-Driven Cyber Defense Leadership Award',
  'National Infrastructure Cyber Resilience Award',
  'Cloud & Data Security Leadership Award',
  'Industrial Cybersecurity Innovation Leader',
  'Cybersecurity Governance Excellence Award',
  'Critical Infrastructure Security Team of the Year',
  'Healthcare IoT Security Excellence Award',
  'Energy & Utilities Security Leadership Award',
]

const sponsorCategories = [
  'IoT Security Solution Provider of the Year',
  'AI-Powered Threat Defense Solution',
  'Zero Trust Security Partner',
  'Cloud Security Excellence Award',
  'Smart City Security Innovation Award',
  'Industrial Cybersecurity Platform',
  'Sovereign Cloud Security Excellence Award',
  'AI Security Innovation Award',
  'Threat Intelligence Solution of the Year',
  'Infrastructure Protection Technology Award',
  'Cybersecurity Consulting Firm of the Year',
]

export function AwardCategoriesSection() {
  const [activeTab, setActiveTab] = useState('delegate')

  const categories =
    activeTab === 'delegate'
      ? delegateCategories
      : sponsorCategories

  return (
    <section className="relative overflow-hidden bg-[#020617] py-20 md:py-32 px-4 md:px-8">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />

      {/* Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-medium uppercase tracking-wider">
              Award Categories
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Excellence
            <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Recognition Awards
            </span>
          </h2>

          <p className="mt-6 text-white/60 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Recognising industry pioneers, innovators, cybersecurity leaders,
            and technology providers transforming the future of IoT and digital
            infrastructure security.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-14">

          <button
            onClick={() => setActiveTab('delegate')}
            className={`group relative overflow-hidden rounded-2xl px-7 py-4 font-semibold transition-all duration-300 ${
              activeTab === 'delegate'
                ? 'bg-cyan-500 text-white shadow-[0_0_30px_rgba(6,182,212,0.35)]'
                : 'border border-white/10 bg-white/[0.03] text-white/70 hover:border-cyan-400/30 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3 relative z-10">
              <Shield className="w-5 h-5" />
              <span>Industry Delegate</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('sponsor')}
            className={`group relative overflow-hidden rounded-2xl px-7 py-4 font-semibold transition-all duration-300 ${
              activeTab === 'sponsor'
                ? 'bg-cyan-500 text-white shadow-[0_0_30px_rgba(6,182,212,0.35)]'
                : 'border border-white/10 bg-white/[0.03] text-white/70 hover:border-cyan-400/30 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3 relative z-10">
              <Building2 className="w-5 h-5" />
              <span>Solution Providers</span>
            </div>
          </button>

        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 gap-6"
          >

            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.04,
                }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 md:p-7 transition-all duration-500 hover:border-cyan-400/40 hover:bg-white/[0.06] hover:shadow-[0_0_40px_rgba(6,182,212,0.15)]"
              >

                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10" />

                {/* Animated Top Border */}
                <div className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-500" />

                <div className="relative z-10 flex items-start gap-4">

                  {/* Icon */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/20 flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-cyan-400" />
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <h3 className="text-white text-lg md:text-xl font-semibold leading-relaxed group-hover:text-cyan-300 transition-colors duration-300">
                      {category}
                    </h3>

                    <div className="mt-4 flex items-center gap-2 text-cyan-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span>View Category</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}