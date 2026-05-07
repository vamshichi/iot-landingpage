'use client'

import { motion } from 'framer-motion'
import { Users, Crown, Building, Zap, Cog, Cloud, Boxes, Droplet, Briefcase, Lightbulb } from 'lucide-react'

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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className="relative w-full py-20 md:py-32 px-4 md:px-8 bg-background overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Who Should Nominate
          </h2>
        </motion.div>

        {/* Nominees Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
        >
          {nominees.map((nominee, index) => {
            const Icon = nominee.icon
            return (
              <motion.div
                key={index}
                // variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 30px rgba(0, 217, 255, 0.4)',
                }}
                className="group glow-border glass-effect p-6 md:p-8 rounded-lg text-center cursor-pointer transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                  </div>
                </div>
                <p className="font-semibold text-foreground text-sm md:text-base">
                  {nominee.label}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
