"use client";

import { Building2, ShieldCheck, Cpu } from "lucide-react";

export default function AboutSummit() {
  return (
    <section className="relative bg-[#0A0F1C] py-20 lg:py-28 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}
        <div className="max-w-3xl">
          <p className="text-cyan-400 uppercase tracking-wide text-sm font-medium">
            About the Summit
          </p>

          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-white leading-tight">
            The UAE’s Most Critical Cybersecurity Gathering
            <br /> for Connected Infrastructure
          </h2>

          <p className="mt-6 text-gray-400 text-base md:text-lg leading-relaxed">
            The United Arab Emirates is leading the global transformation of smart cities,
            digital government, and connected infrastructure, making IoT security a national
            priority, not an option.
          </p>
        </div>

        {/* Investment Highlight */}
        <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl max-w-xl">
          <p className="text-gray-400 text-sm">With investments projected to reach</p>

          <h3 className="mt-2 text-4xl md:text-5xl font-bold text-cyan-400">
            USD 24.6 Billion
          </h3>

          <p className="text-gray-300 mt-2">by 2031</p>
        </div>

        {/* 3 Columns */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Government */}
          <div className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-cyan-400/40 transition">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-cyan-500/10 mb-4">
              <Building2 className="text-cyan-400" size={24} />
            </div>

            <h4 className="text-white font-semibold text-lg">
              Government Mandates
            </h4>

            <p className="mt-3 text-gray-400 text-sm leading-relaxed">
              Governments define cybersecurity mandates shaping national digital infrastructure
            </p>
          </div>

          {/* Enterprise */}
          <div className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-cyan-400/40 transition">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-cyan-500/10 mb-4">
              <ShieldCheck className="text-cyan-400" size={24} />
            </div>

            <h4 className="text-white font-semibold text-lg">
              Enterprise Challenges
            </h4>

            <p className="mt-3 text-gray-400 text-sm leading-relaxed">
              Enterprises solve mission-critical vulnerabilities across connected systems
            </p>
          </div>

          {/* Technology */}
          <div className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-cyan-400/40 transition">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-cyan-500/10 mb-4">
              <Cpu className="text-cyan-400" size={24} />
            </div>

            <h4 className="text-white font-semibold text-lg">
              Technology Solutions
            </h4>

            <p className="mt-3 text-gray-400 text-sm leading-relaxed">
              Technology leaders deliver real-world, scalable cybersecurity solutions
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}