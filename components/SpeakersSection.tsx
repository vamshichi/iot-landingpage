"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mic, ArrowRight, Linkedin } from "lucide-react";
import Image from "next/image";

const speakers = [
  {
    name: "Jinson Pappachan",
    role: "Head of Information Security & Enterprise ICT",
    company: "Emirates Policy Center",
    image: "/speakers/Jinson Pappachan.jpg",
  },
  {
    name: "James Y. Moore",
    role: "Chief Information Security Officer (CISO)",
    company: "CIVIE",
    image: "/speakers/James Moore.jpg",
  },
  {
    name: "Dr. Shijin Prasad",
    role: "Group Head Information Technology",
    company: "Elyzee Healthcare Group",
    image: "/speakers/Dr. Shijin.png",
  },
  {
  name: "Bravine Otieno",
  role: "Head of Global Operations & Infrastructure Service- Middle East & Africa Region",
  company: "DB Schenker",
  image: "/speakers/Bravine Otieno.jpg",
},
 {
    name: "Ebrahim Kamalzadeh",
    role: "Chief Information Officer",
    company: "Al Nabooda Automobiles LLC",
    image: "/speakers/Ebrahim Kamalzadeh.jpg",
  },
  {
    name: "Dr. Batheiah Bolisetti",
    role: "Head - IT & CISO",
    company: "Embassy Developments Limited",
    image: "/speakers/Dr. Batheiah Bolisetti.jpg",
  },
  {
    name: "Parthasarathy P",
    role: "EVP & Group CISO",
    company: "Leading Bank in GCC",
    image: "/speakers/Parthasarathy P.jpg",
  },
  {
    name: "George Akhras",
    role: "CIO",
    company: "Academia Management Solutions International (AMSI)",
    image: "/speakers/George.jpg",
  }
];

export function SpeakersSection() {
  return (
    <section
      id="speakers"
      className="py-24 bg-gradient-to-b from-background via-cyan-500/5 to-background relative overflow-hidden"
    >
      {/* Background Blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400 font-semibold tracking-[0.25em] uppercase mb-4">
            Speakers
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Featured Speaker Line-Up
          </h2>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Hear from global cybersecurity leaders, enterprise technology
            experts, and information security pioneers shaping the future of
            digital resilience.
          </p>
        </motion.div>

        {/* Speakers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {speakers.map((speaker, index) => (
            <motion.div
              key={speaker.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-cyan-400/50 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-[420px] overflow-hidden">
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                <div className="mb-4 flex items-center gap-2">
                  <div className="w-10 h-[2px] bg-cyan-400" />
                  <Mic size={16} className="text-cyan-400" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  {speaker.name}
                </h3>

                <p className="text-cyan-300 font-medium text-sm leading-relaxed mb-2">
                  {speaker.role}
                </p>

                <p className="text-gray-300 text-sm">
                  {speaker.company}
                </p>

                {/* Hover Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="mt-5"
                >
                  <button className="inline-flex items-center gap-2 text-cyan-300 text-sm font-medium hover:text-white transition-colors">
                    View Profile
                    <ArrowRight size={16} />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-20 text-center border border-cyan-500/20 bg-cyan-500/5 rounded-3xl p-10 md:p-14 backdrop-blur-xl"
        >
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            viewport={{ once: true }}
          >
            <div className="p-4 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              <Mic className="text-cyan-400" size={30} />
            </div>
          </motion.div>

          <h3 className="text-3xl md:text-4xl font-bold mb-5 max-w-4xl mx-auto leading-tight">
            Become a Speaker & Position Yourself as a Thought Leader in Cybersecurity
          </h3>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Join global CISOs, government leaders, and enterprise technology
            experts at one of the region’s premier cybersecurity gatherings.
          </p>

          <a href="/#contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-semibold hover:shadow-2xl hover:shadow-cyan-500/40 transition-all"
            >
              Apply to Speak
              <ArrowRight size={18} />
            </motion.button>
          </a>
        </motion.div> */}
      </div>
    </section>
  );
}