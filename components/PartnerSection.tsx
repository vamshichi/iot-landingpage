'use client';

import React from 'react';
import { Megaphone, Users, Building2, ArrowRight } from 'lucide-react';

export function PartnerSection() {
  const partners = [
    {
      icon: Megaphone,
      text: 'Media Partners: Amplify reach across global cybersecurity communities',
    },
    {
      icon: Users,
      text: 'Association Partners: Collaborate with industry bodies & ecosystems',
    },
    {
      icon: Building2,
      text: 'Government Collaboration: Align with national cybersecurity initiatives',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background via-purple-500/5 to-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Header */}
        <p className="text-cyan-400 font-semibold tracking-widest uppercase mb-4">
          Partner With Us
        </p>

        <h2 className="text-4xl md:text-5xl font-bold mb-12 leading-tight">
          PARTNER WITH US
        </h2>

        {/* Partner Types */}
        <div className="space-y-4 mb-12">
          {partners.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="glass-dark p-6 rounded-xl border border-cyan-500/30 hover:border-cyan-500/60 transition-all flex items-center gap-4 text-left"
              >
                <div className="p-3 rounded-lg bg-cyan-500/10">
                  <Icon className="text-cyan-400" size={22} />
                </div>

                <p className="text-foreground text-sm font-medium">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <button className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-background font-semibold hover:shadow-lg hover:shadow-cyan-500/40 transition-all">
          Partner with us
          <ArrowRight size={18} />
        </button>

      </div>
    </section>
  );
}