'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

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

interface Tab {
  id: string
  label: string
  categories: string[]
}

export function AwardCategoriesSection() {
  const [activeTab, setActiveTab] = useState<string>('delegate')

  const tabs: Tab[] = [
    {
      id: 'delegate',
      label: 'Industry Delegate Categories',
      categories: delegateCategories,
    },
    {
      id: 'sponsor',
      label: 'Industry Sponsor / Solution Provider Categories',
      categories: sponsorCategories,
    },
  ]

  const activeTabData = tabs.find(tab => tab.id === activeTab)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className="relative w-full py-20 md:py-32 px-4 md:px-8 bg-gradient-to-b from-background via-secondary-background to-background overflow-hidden">
      {/* Background grid */}
      <div className="cyber-grid absolute inset-0 opacity-15" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Award Categories
          </h2>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row gap-4 mb-12 justify-center"
        >
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-6 md:px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-primary to-secondary text-background shadow-[0_0_30px_rgba(0,217,255,0.5)]'
                  : 'border border-primary/30 text-foreground hover:border-primary/60 glass-effect'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Categories List */}
        {activeTabData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-1 gap-4"
            >
              {activeTabData.categories.map((category, index) => (
                <motion.div
                  key={index}
                //   variants={itemVariants}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 0 30px rgba(0, 217, 255, 0.3)',
                  }}
                  className="group glow-border glass-effect p-5 md:p-6 rounded-lg cursor-pointer transition-all duration-300 hover:border-primary/60"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                    <p className="text-foreground group-hover:text-primary transition-colors duration-300 leading-relaxed">
                      {category}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
