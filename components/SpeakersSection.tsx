'use client';

import React from 'react';
import { Mic, Users, ArrowRight } from 'lucide-react';

export function SpeakersSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-purple-500/5 to-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Header */}
        <p className="text-cyan-400 font-semibold tracking-widest uppercase mb-4">
          Speakers
        </p>

        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Speaker Line-Up
        </h2>

        {/* Description */}
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
          Featuring government leaders, national infrastructure experts & global cybersecurity pioneers
        </p>

        {/* CTA Card */}
        <div className="glass-dark border border-cyan-500/30 rounded-xl p-10 hover:border-cyan-500/60 transition-all">

          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-cyan-500/10">
              <Mic className="text-cyan-400" size={28} />
            </div>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Become a Speaker & Position yourself as a thought leader in national cybersecurity
          </h3>

          <button className="mt-6 inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-background font-semibold hover:shadow-lg hover:shadow-cyan-500/40 transition-all">
            Apply to Speak
            <ArrowRight size={18} />
          </button>

        </div>

      </div>
    </section>
  );
}