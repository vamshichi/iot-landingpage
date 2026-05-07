'use client'

import { motion } from 'framer-motion'

export function FinalCTASection() {
  return (
    <section className="relative w-full py-20 md:py-32 px-4 md:px-8 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
        <div className="cyber-grid absolute inset-0 opacity-20" />
        
        {/* Animated cyber lines */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
              style={{
                top: `${(i + 1) * 20}%`,
                width: '100%',
              }}
              animate={{
                x: ['-100%', '100%'],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 3,
                delay: i * 0.3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            Nominations Now Open
          </h2>
          <p className="text-xl md:text-2xl text-foreground/80 mb-12 leading-relaxed max-w-3xl mx-auto">
            Take your place among the leaders securing the future of connected intelligence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              viewport={{ once: true }}
              className="px-8 md:px-10 py-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-background font-semibold text-lg hover:shadow-[0_0_30px_rgba(0,217,255,0.5)] transition-all duration-300"
            >
              Nominate Now
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              viewport={{ once: true }}
              className="px-8 md:px-10 py-4 rounded-lg border border-primary/50 text-primary font-semibold text-lg hover:bg-primary/10 transition-all duration-300 backdrop-blur-sm"
            >
              Become a Sponsor
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
