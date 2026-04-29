"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Agenda", href: "#agenda" },
    { label: "Speakers", href: "#speakers" },
    { label: "Industries", href: "#industries" },
    { label: "Sponsors", href: "#sponsors" },
    { label: "Partner With Us", href: "#partner" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* ✅ Logo Image */}
          <Link href="#" className="flex items-center">
            <Image
              src="/iotlogo.png"
              alt="IoT Summit Logo"
              width={140}
              height={40}
              priority
              className="object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-cyan-500 transition-all"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#contact"
              className="px-6 py-2 rounded-lg bg-cyan-500 text-white font-semibold hover:bg-cyan-600 hover:shadow-lg hover:shadow-cyan-500/30 transition-all inline-block"
            >
              Attend
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-cyan-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 bg-white">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-cyan-500 transition-all"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}

            <a
              href="#contact"
              className="px-6 py-2 rounded-lg bg-cyan-500 text-white font-semibold hover:bg-cyan-600 hover:shadow-lg hover:shadow-cyan-500/30 transition-all inline-block"
            >
              Attend
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}