'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Facebook,
  Instagram,
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background border-t border-cyan-500/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          {/* About */}
          <div>
            <h3 className="text-lg font-bold glow-text-cyan mb-4">
              IoT Summit
            </h3>

            <p className="text-muted-foreground text-sm leading-relaxed">
              Leading global conference on IoT security and cybersecurity
              infrastructure in the Middle East.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              Quick Links
            </h4>

            <ul className="space-y-3 text-sm">

              <li>
                <a
                  href="#agenda"
                  className="text-muted-foreground hover:text-cyan-400 transition-all duration-300"
                >
                  Agenda
                </a>
              </li>

              {/* <li>
                <a
                  href="#speakers"
                  className="text-muted-foreground hover:text-cyan-400 transition-all duration-300"
                >
                  Speakers
                </a>
              </li> */}

              <li>
                <a
                  href="#sponsors"
                  className="text-muted-foreground hover:text-cyan-400 transition-all duration-300"
                >
                  Sponsors
                </a>
              </li>

              <li>
                <a
                  href="#contact"
                  className="text-muted-foreground hover:text-cyan-400 transition-all duration-300"
                >
                  Register
                </a>
              </li>

            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              Contact
            </h4>

            <div className="space-y-4 text-sm text-muted-foreground">

              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-cyan-400 shrink-0" />

                <a
                  href="mailto:info@confexmeet.com"
                  className="hover:text-cyan-400 transition-all duration-300"
                >
                  info@confexmeet.com
                </a>
              </div>

              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-cyan-400 shrink-0" />

                <a
                  href="tel:+917975429127"
                  className="hover:text-cyan-400 transition-all duration-300"
                >
                  +91 7975 429 127
                </a>
              </div>

              <div className="flex items-start space-x-2">
                <MapPin
                  size={16}
                  className="text-cyan-400 shrink-0 mt-1"
                />

                <span>
                  5C, 115, OMBR Layout,
                  <br />
                  Bangalore - 560043
                </span>
              </div>

            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              Follow Us
            </h4>

            <div className="flex space-x-4">

              <a
                href="https://www.facebook.com/IoTSecurityWorldSummitAwards"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:scale-110 transition-all duration-300"
              >
                <Facebook size={18} />
              </a>

              <a
                href="https://www.linkedin.com/company/iot-security-world-summit-awards/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:scale-110 transition-all duration-300"
              >
                <Linkedin size={18} />
              </a>

              <a
                href="https://www.instagram.com/iot_security_world_summit/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:scale-110 transition-all duration-300"
              >
                <Instagram size={18} />
              </a>

            </div>

            {/* Organizer */}
            <div className="pt-6">
              <span className="font-semibold text-foreground text-sm">
                Event Organised by:
              </span>

              <div className="mt-3">
                <Image
                  src="/confex.png"
                  alt="ConfexMeet"
                  width={120}
                  height={40}
                  className="object-contain h-16 w-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-cyan-500/20 pt-8">

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">

            {/* Left */}
            <p className="text-center md:text-left">
              © 2026 IoT Security World Summit. All rights reserved.
            </p>

            {/* Right */}
            <div className="flex items-center gap-6">

              <Link
                href="/privacy-policy"
                className="hover:text-cyan-400 transition-all duration-300"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms-of-service"
                className="hover:text-cyan-400 transition-all duration-300"
              >
                Terms of Service
              </Link>

            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}