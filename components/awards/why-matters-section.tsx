'use client'

import { motion } from 'framer-motion'
import { Shield, Zap, Building2, Lock, Cog, Scale } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Critical Infrastructure Security',
    description: 'Protecting vital national systems and assets from evolving cyber threats'
  },
  {
    icon: Zap,
    title: 'AI-Driven Cyber Defense',
    description: 'Leveraging artificial intelligence for predictive threat prevention'
  },
  {
    icon: Building2,
    title: 'Smart City Resilience',
    description: 'Ensuring secure operations across interconnected urban infrastructure'
  },
  {
    icon: Lock,
    title: 'Zero Trust Innovation',
    description: 'Implementing next-generation security frameworks and principles'
  },
  {
    icon: Cog,
    title: 'Industrial OT/ICS Protection',
    description: 'Safeguarding operational technology and industrial control systems'
  },
  {
    icon: Scale,
    title: 'National Cyber Governance',
    description: 'Supporting regulatory compliance and national security mandates'
  },
]

export function WhyMattersSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section className="relative w-full py-20 md:py-32 px-4 md:px-8 bg-gradient-to-b from-background via-secondary-background to-background overflow-hidden">
      {/* Grid background */}
      <div className="cyber-grid absolute inset-0 opacity-10" />

      {/* Animated background orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Why The IOT Security Leadership Awards Matter
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            As the UAE accelerates smart city expansion, AI adoption, sovereign cloud initiatives, Industry 4.0 transformation, and hyper-connected infrastructure, cybersecurity is no longer optional — it is mission-critical and nationally enforced.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                // variants={itemVariants}
                className="group glow-border glass-effect p-6 md:p-8 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,217,255,0.3)] hover:-translate-y-2"
              >
                {/* Icon Container */}
                <div className="mb-6 inline-block p-4 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
                  <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-foreground/60 group-hover:text-foreground/80 transition-colors leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative line */}
                <div className="mt-6 h-1 w-0 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
