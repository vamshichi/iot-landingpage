'use client';

import React from 'react';
import { Users, Presentation, MessageSquare, Coffee, CalendarCheck, Sparkles, Download } from 'lucide-react';

export function SessionHighlightsSection() {
  const highlights = [
    '25+ Elite Speakers',
    '10+ Strategic Sessions',
    'High-Level Panel Discussions',
    'Exclusive Fireside Chats',
    'Dedicated Networking Sessions',
    'Pre-Scheduled 1:1 Business Meetings',
    'Solution Showcase & Innovation Spotlights',
    'Designed for real-world problem solving',
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background via-cyan-500/5 to-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-cyan-400 font-semibold tracking-widest uppercase mb-4">
            Session Highlights
          </p>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Built for <span className="glow-text-cyan">Real-World Impact</span>
          </h2>
        </div>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {highlights.map((item, i) => (
            <div
              key={i}
              className="glass-dark p-5 rounded-xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all text-center hover:shadow-lg hover:shadow-cyan-500/20"
            >
              <p className="text-sm font-semibold text-foreground">
                {item}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA Block */}
        <div className="glass-dark rounded-xl border border-cyan-500/30 p-8 text-center">

          <h3 className="text-2xl font-bold mb-4">
            Full Conference Agenda
          </h3>

          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-background font-semibold hover:shadow-lg hover:shadow-cyan-500/40 transition-all">
            <Download size={18} />
            Download Full Agenda
          </button>

        </div>

      </div>
    </section>
  );
}