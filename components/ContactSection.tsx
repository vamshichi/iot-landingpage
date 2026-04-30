"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Briefcase, HelpCircle, ArrowRight } from "lucide-react";
import { useFormModal, type ModalKey } from "@/components/FormModal";

export function ContactSection() {
  const { openModal } = useFormModal();

  const contacts = [
    { icon: Users,      title: "Delegate Enquiries",    text: "Register, passes, and participation details, please contact" },
    { icon: Briefcase,  title: "Sponsorship Enquiries", text: "Partnerships, branding & business opportunities, please contact" },
    { icon: HelpCircle, title: "Media and Association partners",       text: "For all event-related queries, please contact" },
  ];

  const BUTTONS: { label: string; key: ModalKey }[] = [
    { label: "Delegate Registration", key: "delegate" },
    { label: "Become a Sponsor",      key: "sponsor"  },
    { label: "Download Brochure",     key: "brochure" },
  ];

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-background via-cyan-500/5 to-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-cyan-400 font-semibold tracking-widest uppercase mb-4">Contact</p>
          <h2 className="text-4xl md:text-5xl font-bold">CONTACT</h2>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          {contacts.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ y: -6, scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="glass-dark p-6 rounded-xl border border-cyan-500/30 hover:border-cyan-500/60 transition-all"
              >
                <motion.div className="mb-4 p-3 w-fit rounded-lg bg-cyan-500/10" whileHover={{ scale: 1.1, rotate: 5 }}>
                  <Icon className="text-cyan-400" size={22} />
                </motion.div>
                <h3 className="font-bold text-lg mb-2 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Block */}
        <motion.div
          className="glass-dark rounded-xl border border-cyan-500/30 p-10 text-center"
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          whileHover={{ y: -4 }}
        >
          <motion.h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }}>
            Join the Movement Securing the UAE's Future
          </motion.h3>
          <motion.p className="text-xl text-cyan-400 font-semibold mb-2" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} viewport={{ once: true }}>
            Secure Your Spot Today
          </motion.p>
          <motion.p className="text-muted-foreground mb-2" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} viewport={{ once: true }}>
            IoT Security World Summit Abu Dhabi 2026
          </motion.p>
          <motion.p className="text-muted-foreground mb-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} viewport={{ once: true }}>
            9th July 2026 | Abu Dhabi
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          >
            {BUTTONS.map(({ label, key }) => (
              <motion.button
                key={key}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openModal(key)}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-background font-semibold hover:shadow-lg hover:shadow-cyan-500/40 transition-all flex items-center gap-2"
              >
                {label}
                <motion.span whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 200 }}>
                  <ArrowRight size={16} />
                </motion.span>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}