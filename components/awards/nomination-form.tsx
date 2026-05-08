'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  CheckCircle2,
  ShieldCheck,
  User,
  Building2,
  Mail,
  Phone,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  FileText,
} from 'lucide-react'

export function NominationFormSection() {
  const [submitted, setSubmitted] = useState(false)
  const [step, setStep] = useState(1)

  const [formData, setFormData] = useState({
    nominator_name: '',
    nominator_title: '',
    nominator_company: '',
    nominator_email: '',
    nominator_phone: '',

    nominee_name: '',
    nominee_title: '',
    nominee_company: '',

    achievement_summary: '',
    innovation: '',
    impact: '',

    consent: false,
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target

    setFormData(prev => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setSubmitted(true)

    setTimeout(() => {
      setSubmitted(false)
      setStep(1)
    }, 5000)
  }

  if (submitted) {
    return (
      <section className="relative overflow-hidden bg-[#020617] py-24 px-4">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15),transparent_60%)]" />

        <div className="relative z-10 max-w-2xl mx-auto text-center">

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[32px] border border-cyan-400/20 bg-white/[0.04] backdrop-blur-2xl p-10 md:p-14"
          >

            <div className="flex justify-center mb-8">
              <div className="flex items-center justify-center w-24 h-24 rounded-full bg-cyan-500/10 border border-cyan-400/20">
                <CheckCircle2 className="w-14 h-14 text-cyan-400" />
              </div>
            </div>

            <h2 className="text-4xl font-bold text-white mb-4">
              Nomination Submitted
            </h2>

            <p className="text-white/60 text-lg mb-10 leading-relaxed">
              Thank you for submitting your nomination for the
              IoT Security Leadership Excellence Awards 2026.
            </p>

            <button
              onClick={() => setSubmitted(false)}
              className="inline-flex items-center gap-3 rounded-2xl bg-cyan-500 px-8 py-4 text-white font-semibold hover:bg-cyan-400 transition-all duration-300"
            >
              Submit Another
              <ArrowRight className="w-5 h-5" />
            </button>

          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative overflow-hidden bg-[#020617] py-20 md:py-28 px-4">

      {/* Background */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />
      <div className="absolute inset-0 cyber-grid opacity-10" />

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-medium uppercase tracking-wider">
              Award Nomination
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Submit Your
            <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Nomination
            </span>
          </h2>

        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-6 md:p-10"
        >

          {/* Step Indicator */}
          <div className="flex items-center justify-center mb-12">

            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center">

                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    step >= item
                      ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                      : 'bg-white/10 text-white/40'
                  }`}
                >
                  {item}
                </div>

                {item !== 4 && (
                  <div
                    className={`w-10 md:w-16 h-[2px] transition-all duration-300 ${
                      step > item
                        ? 'bg-cyan-500'
                        : 'bg-white/10'
                    }`}
                  />
                )}
              </div>
            ))}

          </div>

          <AnimatePresence mode="wait">

            {/* STEP 1 */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-8"
              >

                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Nominator Details
                  </h3>

                  <p className="text-white/50">
                    Information about the person submitting the nomination
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-5">

                  {[
                    {
                      placeholder: 'Full Name',
                      name: 'nominator_name',
                      icon: User,
                    },
                    {
                      placeholder: 'Designation',
                      name: 'nominator_title',
                      icon: ShieldCheck,
                    },
                    {
                      placeholder: 'Company Name',
                      name: 'nominator_company',
                      icon: Building2,
                    },
                    {
                      placeholder: 'Email Address',
                      name: 'nominator_email',
                      icon: Mail,
                    },
                    {
                      placeholder: 'Contact Number',
                      name: 'nominator_phone',
                      icon: Phone,
                    },
                  ].map((field, index) => {
                    const Icon = field.icon

                    return (
                      <div key={index} className="relative">
                        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400/70" />

                        <input
                          type="text"
                          name={field.name}
                          placeholder={field.placeholder}
                          onChange={handleChange}
                          className="w-full rounded-2xl border border-white/10 bg-white/[0.03] py-4 pl-12 pr-4 text-white placeholder:text-white/35 focus:border-cyan-400/50 focus:outline-none"
                          required
                        />
                      </div>
                    )
                  })}

                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-3 rounded-2xl bg-cyan-500 px-8 py-4 text-white font-semibold hover:bg-cyan-400 transition-all duration-300"
                  >
                    Next
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

              </motion.div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-8"
              >

                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Nominee Details
                  </h3>

                  <p className="text-white/50">
                    Information about the nominee
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-5">

                  {[
                    'Nominee Full Name',
                    'Nominee Designation',
                    'Nominee Company',
                  ].map((item, index) => (
                    <input
                      key={index}
                      placeholder={item}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-white placeholder:text-white/35 focus:border-cyan-400/50 focus:outline-none"
                    />
                  ))}

                </div>

                <div className="flex justify-between">

                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-3 rounded-2xl border border-white/10 px-8 py-4 text-white hover:border-cyan-400/40 transition-all"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="inline-flex items-center gap-3 rounded-2xl bg-cyan-500 px-8 py-4 text-white font-semibold hover:bg-cyan-400 transition-all duration-300"
                  >
                    Next
                    <ArrowRight className="w-5 h-5" />
                  </button>

                </div>

              </motion.div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-8"
              >

                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Achievement Details
                  </h3>

                  <p className="text-white/50">
                    Describe achievements and impact
                  </p>
                </div>

                <div className="space-y-5">

                  {[
                    'Achievement Summary',
                    'Innovation & Differentiation',
                    'Measurable Impact',
                  ].map((item, index) => (
                    <div key={index} className="relative">

                      <FileText className="absolute top-5 left-5 w-5 h-5 text-cyan-400/70" />

                      <textarea
                        rows={4}
                        placeholder={item}
                        className="w-full rounded-3xl border border-white/10 bg-white/[0.03] pl-14 pr-5 py-5 text-white placeholder:text-white/35 focus:border-cyan-400/50 focus:outline-none resize-none"
                      />

                    </div>
                  ))}

                </div>

                <div className="flex justify-between">

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-3 rounded-2xl border border-white/10 px-8 py-4 text-white hover:border-cyan-400/40 transition-all"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="inline-flex items-center gap-3 rounded-2xl bg-cyan-500 px-8 py-4 text-white font-semibold hover:bg-cyan-400 transition-all duration-300"
                  >
                    Next
                    <ArrowRight className="w-5 h-5" />
                  </button>

                </div>

              </motion.div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-8"
              >

                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Final Review
                  </h3>

                  <p className="text-white/50">
                    Confirm and submit your nomination
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 flex items-start gap-4">

                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5"
                    required
                  />

                  <p className="text-white/60 leading-relaxed">
                    I confirm that the information provided is accurate
                    and I have the authority to submit this nomination.
                  </p>

                </div>

                <div className="flex justify-between">

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="inline-flex items-center gap-3 rounded-2xl border border-white/10 px-8 py-4 text-white hover:border-cyan-400/40 transition-all"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-3 rounded-2xl bg-cyan-500 px-10 py-4 text-white font-semibold hover:bg-cyan-400 transition-all duration-300 hover:shadow-[0_0_40px_rgba(6,182,212,0.35)]"
                  >
                    Submit Nomination
                    <ArrowRight className="w-5 h-5" />
                  </button>

                </div>

              </motion.div>
            )}

          </AnimatePresence>

        </motion.form>
      </div>
    </section>
  )
}