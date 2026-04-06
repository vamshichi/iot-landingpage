'use client';

import React, { useState } from 'react';
import { Calendar, Clock, Users } from 'lucide-react';

export function AgendaSection() {
  const [activeDay, setActiveDay] = useState(0);

  const agenda = [
    {
      day: 'Day 1: Future of IoT Security',
      date: 'March 15, 2026',
      sessions: [
        {
          time: '09:00 - 10:00',
          title: 'Opening Keynote: The IoT Security Imperative',
          speaker: 'Industry Leaders',
          track: 'Main Hall',
        },
        {
          time: '10:30 - 11:30',
          title: 'Critical Infrastructure Protection in Smart Cities',
          speaker: 'Government & Enterprise Panel',
          track: 'Hall A',
        },
        {
          time: '11:45 - 12:45',
          title: 'Zero-Trust Architecture for IoT Ecosystems',
          speaker: 'Technical Experts',
          track: 'Hall B',
        },
        {
          time: '14:00 - 15:00',
          title: 'Threat Intelligence & Real-Time Defense',
          speaker: 'Security Research',
          track: 'Hall A',
        },
        {
          time: '15:15 - 16:15',
          title: 'DevSecOps for IoT Development',
          speaker: 'Engineering Panel',
          track: 'Hall B',
        },
      ],
    },
    {
      day: 'Day 2: Innovation & Solutions',
      date: 'March 16, 2026',
      sessions: [
        {
          time: '09:00 - 10:00',
          title: 'Emerging IoT Technologies & Threats',
          speaker: 'Researchers',
          track: 'Main Hall',
        },
        {
          time: '10:30 - 11:30',
          title: 'AI/ML in Cybersecurity for IoT',
          speaker: 'AI Experts',
          track: 'Hall A',
        },
        {
          time: '11:45 - 12:45',
          title: 'Supply Chain Security & Vendor Management',
          speaker: 'Enterprise Leaders',
          track: 'Hall B',
        },
        {
          time: '14:00 - 15:00',
          title: 'Quantum Computing Impact on IoT Security',
          speaker: 'Quantum Security Team',
          track: 'Hall A',
        },
        {
          time: '15:15 - 16:15',
          title: 'Compliance & Regulatory Framework',
          speaker: 'Legal & Compliance',
          track: 'Hall B',
        },
      ],
    },
    {
      day: 'Day 3: Networking & Partnerships',
      date: 'March 17, 2026',
      sessions: [
        {
          time: '09:00 - 10:00',
          title: 'Case Studies: Real-World Deployments',
          speaker: 'Implementation Leaders',
          track: 'Main Hall',
        },
        {
          time: '10:30 - 11:30',
          title: 'Building Secure IoT Ecosystems',
          speaker: 'Architecture Panel',
          track: 'Hall A',
        },
        {
          time: '11:45 - 12:45',
          title: 'Career & Future Opportunities in IoT Security',
          speaker: 'HR & Talent',
          track: 'Hall B',
        },
        {
          time: '14:00 - 15:30',
          title: 'Closing Keynote & Awards Ceremony',
          speaker: 'Summit Organizers',
          track: 'Main Hall',
        },
        {
          time: '16:00 - 18:00',
          title: 'Networking Reception & Exhibitions',
          speaker: 'Open Event',
          track: 'Exhibition Hall',
        },
      ],
    },
  ];

  return (
    <section id="agenda" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Conference <span className="glow-text-cyan">Agenda</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three days of intensive sessions, keynotes, and networking opportunities with global IoT security leaders.
          </p>
        </div>

        {/* Day Selector */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {agenda.map((item, i) => (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeDay === i
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-background shadow-lg shadow-cyan-500/50'
                  : 'glass-dark border-cyan-500/30 text-foreground hover:border-cyan-500/60'
              }`}
            >
              <Calendar size={16} className="inline mr-2" />
              {item.date}
            </button>
          ))}
        </div>

        {/* Sessions Timeline */}
        <div className="space-y-4">
          {agenda[activeDay].sessions.map((session, i) => (
            <div
              key={i}
              className="glass-dark p-6 rounded-lg border border-cyan-500/30 hover:border-cyan-500/50 transition-all group"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                <div className="flex items-center space-x-3">
                  <Clock size={20} className="text-cyan-400 flex-shrink-0" />
                  <span className="font-bold text-cyan-400">{session.time}</span>
                </div>
                <div className="md:col-span-2">
                  <h4 className="font-bold text-foreground mb-2 group-hover:text-cyan-400 transition-all">
                    {session.title}
                  </h4>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Users size={14} />
                    <span>{session.speaker}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-400">
                    {session.track}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
