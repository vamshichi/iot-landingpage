'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { CheckCircle } from 'lucide-react'

export function NominationFormSection() {
  const [formData, setFormData] = useState({
    nominator_name: '',
    nominator_title: '',
    nominator_company: '',
    nominator_email: '',
    nominator_phone: '',
    nominee_name: '',
    nominee_title: '',
    nominee_company: '',
    industry_sector: '',
    category: '',
    achievement_summary: '',
    innovation: '',
    impact: '',
    consent: false,
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, type } = e.target
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: e.target.value,
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate submission
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  if (submitted) {
    return (
      <section className="relative w-full py-20 md:py-32 px-4 md:px-8 bg-gradient-to-b from-background via-secondary-background to-background">
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="mb-6 flex justify-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <CheckCircle className="w-16 h-16 text-primary" />
              </motion.div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Nomination Submitted
            </h2>
            <p className="text-xl text-foreground/70 mb-8">
              Thank you for submitting your nomination! We&apos;ll review it and contact you soon.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-background font-semibold hover:shadow-[0_0_30px_rgba(0,217,255,0.5)] transition-all duration-300"
            >
              Submit Another Nomination
            </button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative w-full py-20 md:py-32 px-4 md:px-8 bg-background overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Submit Your Nomination
          </h2>
          <p className="text-lg text-foreground/70">
            Nominate an exceptional leader securing the future of connected infrastructure
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="glow-border glass-effect p-8 md:p-12 rounded-xl"
        >
          {/* Nominator Details */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-primary mb-6">Nominator Details</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { label: 'Full Name', name: 'nominator_name' },
                { label: 'Designation', name: 'nominator_title' },
                { label: 'Company Name', name: 'nominator_company' },
                { label: 'Email Address', name: 'nominator_email', type: 'email' },
                { label: 'Contact Number', name: 'nominator_phone', type: 'tel' },
              ].map((field, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type || 'text'}
                    name={field.name}
                    // value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-primary/30 text-foreground placeholder-foreground/40 focus:border-primary focus:outline-none transition-colors"
                    required
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Nominee Details */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-primary mb-6">Nominee Details</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { label: 'Nominee Full Name', name: 'nominee_name' },
                { label: 'Nominee Designation', name: 'nominee_title' },
                { label: 'Nominee Company', name: 'nominee_company' },
              ].map((field, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    name={field.name}
                    // value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-primary/30 text-foreground placeholder-foreground/40 focus:border-primary focus:outline-none transition-colors"
                    required
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Category Selection */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-primary mb-6">Category Details</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Industry Sector
                </label>
                <select
                  name="industry_sector"
                  value={formData.industry_sector}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-primary/30 text-foreground focus:border-primary focus:outline-none transition-colors"
                  required
                >
                  <option value="">Select Sector</option>
                  <option value="government">Government</option>
                  <option value="energy">Energy & Utilities</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="finance">Finance</option>
                  <option value="technology">Technology</option>
                  <option value="other">Other</option>
                </select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Award Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-primary/30 text-foreground focus:border-primary focus:outline-none transition-colors"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="ciso_year">CISO of the Year</option>
                  <option value="ai_defense">AI-Driven Cyber Defense</option>
                  <option value="smart_city">Smart City Leadership</option>
                  <option value="innovation">Innovation Leader</option>
                  <option value="team">Security Team of the Year</option>
                </select>
              </motion.div>
            </div>
          </div>

          {/* Impact & Achievement */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-primary mb-6">Impact & Achievement</h3>
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Achievement Summary
                </label>
                <textarea
                  name="achievement_summary"
                  value={formData.achievement_summary}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-primary/30 text-foreground placeholder-foreground/40 focus:border-primary focus:outline-none transition-colors resize-none"
                  placeholder="Describe the key achievements and contributions..."
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Innovation & Differentiation
                </label>
                <textarea
                  name="innovation"
                  value={formData.innovation}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-primary/30 text-foreground placeholder-foreground/40 focus:border-primary focus:outline-none transition-colors resize-none"
                  placeholder="What makes this nominee unique or innovative?..."
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Measurable Impact
                </label>
                <textarea
                  name="impact"
                  value={formData.impact}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-primary/30 text-foreground placeholder-foreground/40 focus:border-primary focus:outline-none transition-colors resize-none"
                  placeholder="Describe quantifiable impact and results..."
                  required
                />
              </motion.div>
            </div>
          </div>

          {/* Consent & Submit */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              className="w-5 h-5 rounded border-primary/30 text-primary focus:ring-primary cursor-pointer"
              required
            />
            <label className="text-sm text-foreground/70 cursor-pointer">
              I confirm that the information provided is accurate and that I have the authority to submit this nomination.
            </label>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full px-8 py-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-background font-semibold text-lg hover:shadow-[0_0_30px_rgba(0,217,255,0.5)] transition-all duration-300"
          >
            Submit Your Nomination
          </motion.button>
        </motion.form>
      </div>
    </section>
  )
}
