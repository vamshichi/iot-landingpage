'use client';

import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';

export function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-block mb-6">
          <div className="glass px-4 py-2 rounded-full flex items-center space-x-2 border-cyan-500/50">
            <Zap size={16} className="text-cyan-400" />
            <span className="text-sm font-semibold glow-text-cyan">Join the Future of IoT Security</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-6">
          <span className="block mb-2">IoT Security World</span>
          <span className="glow-text-cyan">Summit Abu Dhabi</span>
          <span className="block text-cyan-400 mt-2">2026</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Experience the premier conference connecting global leaders in cybersecurity, IoT innovation, and smart city infrastructure. 
          Three days of cutting-edge insights, networking, and solutions shaping the secure future.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button className="group px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-background font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all flex items-center justify-center space-x-2">
            <span>Register Now</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-all" />
          </button>
          <button className="px-8 py-4 rounded-lg glass-dark border-cyan-500/50 text-foreground font-bold text-lg hover:border-cyan-400/80 hover:bg-cyan-500/5 transition-all">
            Download Brochure
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mb-16">
          {[
            { value: '3000+', label: 'Attendees Expected' },
            { value: '200+', label: 'International Speakers' },
            { value: '50+', label: 'Sponsor Partners' },
          ].map((stat, i) => (
            <div key={i} className="glass-dark p-4 md:p-6 rounded-lg border-cyan-500/30 hover:border-cyan-500/50 transition-all">
              <div className="text-2xl md:text-3xl font-bold glow-text-cyan mb-2">{stat.value}</div>
              <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Floating CTA */}
        <div className="inline-block glass p-4 rounded-lg border-cyan-500/30">
          <p className="text-sm text-muted-foreground">
            <span className="text-cyan-400 font-semibold">Secure Your Spot Today</span> - Limited Early Bird Pricing Available
          </p>
        </div>
      </div>
    </section>
  );
}
