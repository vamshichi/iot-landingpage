"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

// ─── Configuration ─────────────────────────────────────────────────────────

const SLIDES = [
  {
    image: "/images/traffic.png",
    eyebrow: "Smart City Solutions",
    title: ["Smart Traffic", "Intelligence"],
    subtitle:
      "AI-powered IoT systems transforming urban mobility, reducing congestion, enhancing real-time traffic monitoring, and enabling smarter, safer city infrastructure.",
    cta: "Register Now",
  },
  {
    image: "/images/oil-gas.png",
    eyebrow: "Industrial IoT",
    title: ["Intelligent Oil &", "Gas Operations"],
    subtitle:
      "Advanced IoT solutions enabling real-time monitoring, predictive maintenance, asset optimization, and enhanced safety across complex industrial environments.",
    cta: "Explore More",
  },
  {
    image: "/images/manufacturing.png",
    eyebrow: "Industry 4.0",
    title: ["Smart Manufacturing", "Revolution"],
    subtitle:
      "Connected machines and intelligent automation driving efficiency, reducing downtime, improving quality control, and enabling fully data-driven production systems.",
    cta: "Get Started",
  },
] as const;

const AUTOPLAY_MS = 5000;
const IMG_DURATION = 1.2;
const TEXT_DURATION = 0.65;

// ─── Variants ──────────────────────────────────────────────────────────────

const imageVariants = {
  enter: { opacity: 0, scale: 1.08 },
  active: {
    opacity: 1,
    scale: 1,
    transition: {
      opacity: { duration: IMG_DURATION, ease: [0.4, 0, 0.2, 1] as any },
      scale: { duration: IMG_DURATION * 2, ease: [0.25, 0.46, 0.45, 0.94] as any },
    },
  },
  exit: {
    opacity: 0,
    scale: 1.04,
    transition: {
      opacity: { duration: IMG_DURATION * 0.6, ease: [0.4, 0, 1, 1] as any },
    },
  },
};

const vignetteVariants = {
  enter: { opacity: 0 },
  active: { opacity: 1, transition: { duration: IMG_DURATION * 0.8 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const textBlockVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
  exit: { opacity: 0, transition: { duration: 0.3, ease: [0.4, 0, 1, 1] as any } },
};

const textItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: TEXT_DURATION, ease: [0.22, 1, 0.36, 1] as any },
  },
};

// ─── Divider ───────────────────────────────────────────────────────────────

function Divider() {
  return (
    <motion.div
      variants={textItemVariants}
      className="flex items-center justify-center gap-3 my-6"
    >
      <span className="block h-px w-12 bg-gradient-to-r from-transparent to-cyan-400/60" />
      <span className="block w-1.5 h-1.5 rounded-full bg-cyan-400/80" />
      <span className="block h-px w-12 bg-gradient-to-l from-transparent to-cyan-400/60" />
    </motion.div>
  );
}

// ─── Ring Indicator ────────────────────────────────────────────────────────

function RingIndicator({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  const r = 14;
  const circumference = 2 * Math.PI * r;

  return (
    <button
      role="tab"
      aria-selected={active}
      aria-label={label}
      onClick={onClick}
      className="relative w-9 h-9 flex items-center justify-center focus-visible:outline-none group"
    >
      {/* Track ring */}
      <svg width="36" height="36" className="absolute inset-0 rotate-[-90deg]">
        <circle
          cx="18"
          cy="18"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth="2"
        />
        {/* Animated progress ring */}
        {active && (
          <motion.circle
            cx="18"
            cy="18"
            r={r}
            fill="none"
            stroke="url(#ring-grad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
          />
        )}
        <defs>
          <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center dot */}
      <span
        className="block rounded-full transition-all duration-300"
        style={{
          width: active ? "8px" : "5px",
          height: active ? "8px" : "5px",
          background: active
            ? "linear-gradient(135deg, #22d3ee, #60a5fa)"
            : "rgba(255,255,255,0.25)",
          boxShadow: active ? "0 0 8px #22d3ee80" : "none",
        }}
      />
    </button>
  );
}

// ─── HeroSection ───────────────────────────────────────────────────────────

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [index, setIndex] = useState(0);

  // Scroll parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scrollOverlay = useTransform(scrollYProgress, [0, 0.6], [0, 0.5]);

  // Navigation
  const goTo = useCallback(
    (i: number) => setIndex(((i % SLIDES.length) + SLIDES.length) % SLIDES.length),
    []
  );
  const next = useCallback(() => goTo(index + 1), [index, goTo]);
  const prev = useCallback(() => goTo(index - 1), [index, goTo]);

  // Autoplay — always running, no pause
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Reset timer on manual nav
  const handleManualNav = useCallback((fn: () => void) => {
    fn();
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
  }, []);

  const slide = SLIDES[index];

  return (
    <section
      ref={containerRef}
      className="relative h-screen max-h-screen overflow-hidden bg-[#020818]"
    >

      {/* ── Background Layer ─────────────────────────────────────────────── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 will-change-transform">
        <AnimatePresence mode="sync">
          <motion.div
            key={`img-${index}`}
            variants={imageVariants}
            initial="enter"
            animate="active"
            exit="exit"
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt="hero-bg"
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-b from-[#020818]/60 via-[#020818]/30 to-[#020818]/85 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020818] via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020818]/50 via-transparent to-transparent pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={`vignette-${index}`}
            variants={vignetteVariants}
            initial="enter"
            animate="active"
            exit="exit"
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, transparent 35%, #020818 100%)",
            }}
          />
        </AnimatePresence>

        <motion.div
          style={{ opacity: scrollOverlay }}
          className="absolute inset-0 bg-[#020818] pointer-events-none"
        />
      </motion.div>

      {/* ── Ambient Glows ────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-15%] left-[30%] w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, #22d3ee44 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[15%] w-[450px] h-[450px] rounded-full"
          style={{ background: "radial-gradient(circle, #818cf844 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.10, 0.04] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute top-[40%] left-[-5%] w-[350px] h-[350px] rounded-full"
          style={{ background: "radial-gradient(circle, #60a5fa33 0%, transparent 70%)" }}
        />
      </div>

      {/* ── Centered Content ─────────────────────────────────────────────── */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 h-full flex flex-col items-center justify-center px-6 sm:px-10 text-center"
      >
        <div className="w-full max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${index}`}
              variants={textBlockVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Eyebrow badge */}
              <motion.div variants={textItemVariants} className="mb-6 flex justify-center">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-white/5 backdrop-blur-md text-xs tracking-[0.2em] font-medium uppercase text-cyan-300">
                  <span className="block w-3 h-px bg-cyan-400/60" />
                  {slide.eyebrow}
                  <span className="block w-3 h-px bg-cyan-400/60" />
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                variants={textItemVariants}
                className="font-bold leading-[1.07] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white"
              >
                <span className="block">{slide.title[0]}</span>
                <span
                  className="block bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(95deg, #22d3ee 0%, #60a5fa 50%, #a78bfa 100%)",
                  }}
                >
                  {slide.title[1]}
                </span>
              </motion.h1>

              {/* <Divider /> */}

              {/* Subtitle */}
              <motion.p
                variants={textItemVariants}
                className="text-base sm:text-lg text-gray-300/80 leading-relaxed max-w-2xl mx-auto"
              >
                {slide.subtitle}
              </motion.p>

              {/* ── Redesigned CTAs ── */}
              <motion.div
                variants={textItemVariants}
                className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
              >
                {/* Primary — outlined glow pill */}
                <button className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 overflow-hidden"
                  style={{ border: "1px solid rgba(34,211,238,0.45)" }}
                >
                  {/* Animated gradient background on hover */}
                  <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(120deg, rgba(34,211,238,0.18) 0%, rgba(96,165,250,0.18) 100%)" }}
                  />
                  {/* Glow blur layer */}
                  <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"
                    style={{ background: "linear-gradient(120deg, #22d3ee30, #60a5fa30)" }}
                  />
                  <span
                    className="relative z-10 bg-clip-text text-transparent font-bold"
                    style={{ backgroundImage: "linear-gradient(90deg, #22d3ee, #a78bfa)" }}
                  >
                    {slide.cta}
                  </span>
                  <ArrowRight
                    size={15}
                    className="relative z-10 text-cyan-400 group-hover:translate-x-1 transition-transform duration-200"
                  />
                </button>

                {/* Secondary — frosted ghost with subtle left border accent */}
                <button className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium text-white/75 hover:text-white backdrop-blur-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  style={{
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.04)",
                  }}
                >
                  <span className="block w-1 h-4 rounded-full mr-1 opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: "linear-gradient(to bottom, #22d3ee, #818cf8)" }}
                  />
                  Explore Event
                </button>
              </motion.div>

            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ── Arrow Navigation ─────────────────────────────────────────────── */}
      <div className="absolute inset-y-0 left-4 right-4 z-20 hidden lg:flex items-center justify-between pointer-events-none">
        {[
          { fn: prev, Icon: ChevronLeft, label: "Previous slide" },
          { fn: next, Icon: ChevronRight, label: "Next slide" },
        ].map(({ fn, Icon, label }) => (
          <motion.button
            key={label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={() => handleManualNav(fn)}
            aria-label={label}
            className="pointer-events-auto w-10 h-10 rounded-full border border-white/15 bg-black/30 backdrop-blur-sm text-white/50 hover:text-cyan-300 hover:border-cyan-400/40 hover:bg-black/50 flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <Icon className="w-5 h-5" />
          </motion.button>
        ))}
      </div>

      {/* ── Ring Indicators ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
      >
        <div className="flex items-center gap-1" role="tablist" aria-label="Slide navigation">
          {SLIDES.map((_, i) => (
            <RingIndicator
              key={i}
              active={i === index}
              onClick={() => handleManualNav(() => goTo(i))}
              label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Slide counter */}
        <span className="font-mono text-[10px] tracking-[0.2em] text-white/30 select-none">
          {String(index + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </span>
      </motion.div>

    </section>
  );
}