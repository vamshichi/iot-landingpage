'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Linkedin, Twitter } from 'lucide-react';

export function SpeakersSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const speakers = [
    {
      name: 'Dr. Sarah Chen',
      title: 'Chief Security Officer',
      company: 'Global Tech Corp',
      bio: 'Leading IoT security strategy across 50+ nations',
      image: '🔐',
    },
    {
      name: 'Ahmed Al-Mansouri',
      title: 'Government Digital Director',
      company: 'UAE Digital Authority',
      bio: 'Shaping critical infrastructure security policy',
      image: '🏛️',
    },
    {
      name: 'Dr. James Mitchell',
      title: 'Head of Cybersecurity Research',
      company: 'Tech Innovation Labs',
      bio: 'Pioneering next-generation threat detection',
      image: '🔬',
    },
    {
      name: 'Priya Sharma',
      title: 'VP Product Security',
      company: 'Smart Cities Initiative',
      bio: 'Designing secure urban ecosystems',
      image: '🏙️',
    },
    {
      name: 'Dr. Michael Weber',
      title: 'Quantum Security Specialist',
      company: 'Future Security Labs',
      bio: 'Post-quantum cryptography innovations',
      image: '🔮',
    },
    {
      name: 'Fatima Al-Zahra',
      title: 'Industrial IoT Expert',
      company: 'Manufacturing Security Alliance',
      bio: 'Protecting production ecosystems globally',
      image: '🏭',
    },
  ];

  const next = () => setCurrentSlide((prev) => (prev + 1) % speakers.length);
  const prev = () => setCurrentSlide((prev) => (prev - 1 + speakers.length) % speakers.length);

  const getVisibleSpeakers = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(speakers[(currentSlide + i) % speakers.length]);
    }
    return visible;
  };

  return (
    <section id="speakers" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="glow-text-cyan">Speakers</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn from 200+ industry leaders, researchers, and innovators shaping the IoT security landscape.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {getVisibleSpeakers().map((speaker, i) => (
              <div
                key={i}
                className="glass-dark p-6 rounded-xl border border-cyan-500/30 hover:border-cyan-500/60 transition-all overflow-hidden group"
              >
                <div className="text-5xl mb-4 h-20 flex items-center">{speaker.image}</div>

                <h3 className="text-xl font-bold mb-1 group-hover:text-cyan-400 transition-all">
                  {speaker.name}
                </h3>

                <p className="text-sm text-cyan-400 font-semibold mb-2">{speaker.title}</p>

                <p className="text-xs text-muted-foreground mb-4">{speaker.company}</p>

                <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                  {speaker.bio}
                </p>

                <div className="flex space-x-2 pt-4 border-t border-cyan-500/20">
                  <a
                    href="#"
                    className="flex-1 p-2 rounded text-center bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 transition-all"
                  >
                    <Linkedin size={16} className="mx-auto" />
                  </a>
                  <a
                    href="#"
                    className="flex-1 p-2 rounded text-center bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 transition-all"
                  >
                    <Twitter size={16} className="mx-auto" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={prev}
              className="p-3 rounded-full glass-dark border border-cyan-500/30 hover:border-cyan-500/60 text-cyan-400 hover:bg-cyan-500/10 transition-all"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {speakers.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === currentSlide
                      ? 'w-8 bg-cyan-500'
                      : 'w-2 bg-cyan-500/30 hover:bg-cyan-500/60'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 rounded-full glass-dark border border-cyan-500/30 hover:border-cyan-500/60 text-cyan-400 hover:bg-cyan-500/10 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* CTA */}
        {/* <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">See all 200+ speakers and submit your speaker application</p>
          <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-background font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
            View Full Speaker List
          </button>
        </div> */}
      </div>
    </section>
  );
}
