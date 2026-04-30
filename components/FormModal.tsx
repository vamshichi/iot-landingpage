"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, ArrowRight, ChevronDown, CheckSquare, Square,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────── */
export type ModalKey = "delegate" | "sponsor" | "brochure";

interface FormModalContextValue {
  openModal: (key: ModalKey) => void;
}

const FormModalContext = createContext<FormModalContextValue | null>(null);

export function useFormModal() {
  const ctx = useContext(FormModalContext);
  if (!ctx) throw new Error("useFormModal must be used inside <FormModalProvider>");
  return ctx;
}

/* ─────────────────────────────────────────────────────────────
   SHARED UI HELPERS
───────────────────────────────────────────────────────────── */
const inputCls =
  "w-full bg-[#0a1628]/60 border border-cyan-500/30 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 transition-all";

const labelCls =
  "block text-xs font-semibold text-cyan-300/80 uppercase tracking-wider mb-1.5";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={labelCls}>
        {label}
        {required && <span className="text-cyan-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function TextInput({ placeholder, type = "text" }: { placeholder?: string; type?: string }) {
  return <input type={type} placeholder={placeholder} className={inputCls} />;
}

function SelectInput({ options }: { options: string[] }) {
  return (
    <div className="relative">
      <select className={`${inputCls} appearance-none pr-8`} defaultValue="">
        <option value="" disabled className="bg-[#0a1628]">Select…</option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#0a1628]">{o}</option>
        ))}
      </select>
      <ChevronDown size={14} className="absolute right-3 top-3 text-cyan-400 pointer-events-none" />
    </div>
  );
}

function CheckGroup({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const toggle = (item: string) =>
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(item) ? next.delete(item) : next.add(item);
      return next;
    });
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {items.map((item) => (
        <button
          type="button"
          key={item}
          onClick={() => toggle(item)}
          className="flex items-center gap-2 text-sm text-slate-300 hover:text-cyan-300 text-left transition-colors"
        >
          {checked.has(item)
            ? <CheckSquare size={15} className="text-cyan-400 shrink-0" />
            : <Square size={15} className="text-slate-600 shrink-0" />}
          {item}
        </button>
      ))}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-widest pb-2 border-b border-cyan-500/20 mb-4">
      {children}
    </h4>
  );
}

function SubmitBtn({ label = "Submit" }: { label?: string }) {
  return (
    <motion.button
      type="submit"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-[#050d1a] font-bold text-sm tracking-wide hover:shadow-lg hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2"
    >
      {label} <ArrowRight size={15} />
    </motion.button>
  );
}

/* ─────────────────────────────────────────────────────────────
   FORMS
───────────────────────────────────────────────────────────── */
function DelegateForm() {
  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <SectionTitle>Personal Information</SectionTitle>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full Name" required><TextInput placeholder="Jane Smith" /></Field>
        <Field label="Job Title" required><TextInput placeholder="CISO" /></Field>
        <Field label="Organization / Company Name" required><TextInput placeholder="Acme Corp" /></Field>
        <Field label="Industry" required>
          <SelectInput options={["BFSI","Government","Telecom","Healthcare","Manufacturing","Energy","Retail","Smart Cities","Others"]} />
        </Field>
        <Field label="Work Email Address" required><TextInput type="email" placeholder="jane@acme.com" /></Field>
        <Field label="Mobile Number (with country code)" required><TextInput placeholder="+971 50 000 0000" /></Field>
      </div>
      <Field label="LinkedIn Profile URL"><TextInput placeholder="https://linkedin.com/in/…" /></Field>

      <SectionTitle>Your Interests & Objectives</SectionTitle>
      <Field label="Key Areas of Interest" required>
        <CheckGroup items={["IoT Security Frameworks","AI-driven Threat Detection","Critical Infrastructure Protection","Smart Cities Security","Industrial IoT (IIoT) Security","Cloud & Edge Security","Zero Trust Architecture","Regulatory & Compliance"]} />
      </Field>
      <Field label="What are you looking to achieve?" required>
        <CheckGroup items={["Networking with Industry Leaders","Exploring Technology Solutions","Learning & Insights","Partnerships & Collaborations","Investment Opportunities"]} />
      </Field>

      <SectionTitle>Networking & Gala Dinner</SectionTitle>
      <Field label="Will you attend the Gala Dinner & Awards Ceremony?" required>
        <CheckGroup items={["Yes","No"]} />
      </Field>

      <SectionTitle>Data Privacy & Consent</SectionTitle>
      <CheckGroup items={["I agree to share my details with event partners for networking purposes","I agree to receive updates about this and future events"]} />

      <SubmitBtn label="Submit Registration" />
    </form>
  );
}

function SponsorForm() {
  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <SectionTitle>Company Information</SectionTitle>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Company Name" required><TextInput placeholder="TechSecure Ltd" /></Field>
        <Field label="Website URL" required><TextInput placeholder="https://techsecure.com" /></Field>
        <Field label="Industry" required>
          <SelectInput options={["Cybersecurity","IoT Solutions","Cloud","AI","Telecom","System Integrator","Consulting","Government","Startup","Others"]} />
        </Field>
        <Field label="Headquarters Location" required><TextInput placeholder="5C, 115, OMBR Layout, Bangalore-43" /></Field>
        <Field label="Company Size" required>
          <SelectInput options={["1–50","51–200","201–500","500–1000","1000+"]} />
        </Field>
      </div>

      <SectionTitle>Primary Contact Details</SectionTitle>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full Name" required><TextInput placeholder="John Doe" /></Field>
        <Field label="Job Title" required><TextInput placeholder="VP Partnerships" /></Field>
        <Field label="Work Email Address" required><TextInput type="email" placeholder="john@techsecure.com" /></Field>
        <Field label="Mobile Number (with country code)" required><TextInput placeholder="+971 50 000 0000" /></Field>
      </div>
      <Field label="LinkedIn Profile URL"><TextInput placeholder="https://linkedin.com/in/…" /></Field>

      <SectionTitle>Sponsorship Objectives</SectionTitle>
      <Field label="Key Objectives for Sponsoring" required>
        <CheckGroup items={["Brand Visibility","Lead Generation","Thought Leadership / speaking slots","Product Launch","Networking & Partnerships","Market Expansion"]} />
      </Field>
      <Field label="Target Audience You Want to Connect With" required>
        <CheckGroup items={["CISOs","CIOs / CTOs","Government Leaders","Smart City Authorities","Enterprise IT Leaders","Investors / Startups"]} />
      </Field>

      <SectionTitle>Sponsorship Preferences</SectionTitle>
      <Field label="Preferred Sponsorship Category" required>
        <CheckGroup items={["Title Sponsor","Platinum Sponsor","Gold Sponsor","Silver Sponsor","Startup Sponsor","Not Sure – Need Consultation"]} />
      </Field>
      <Field label="Interested Add-ons">
        <CheckGroup items={["Speaking Slot (Keynote / Panel)","Exhibition Booth","Hosted Buyer Meetings","Private Roundtable","Awards Category Sponsorship","Branding Opportunities"]} />
      </Field>

      <SectionTitle>Engagement & Activation Plans</SectionTitle>
      <Field label="Do you plan to:">
        <CheckGroup items={["Launch a New Product / Solution","Showcase Existing Solutions","Announce Partnerships","Conduct Live Demos"]} />
      </Field>
      <Field label="Any specific requirements or custom requests?">
        <textarea className={`${inputCls} min-h-[80px] resize-none`} placeholder="Tell us more…" />
      </Field>

      <SectionTitle>Meeting & Networking Preferences</SectionTitle>
      <Field label="Pre-scheduled 1:1 meetings with delegates?" required>
        <CheckGroup items={["Yes","No"]} />
      </Field>
      <Field label="VIP Networking Dinner & Awards Night?">
        <CheckGroup items={["Yes","No"]} />
      </Field>

      <SectionTitle>Consent & Communication</SectionTitle>
      <CheckGroup items={["I agree to be contacted regarding sponsorship opportunities","I agree to receive updates about this and future events"]} />

      <SubmitBtn label="Submit Sponsorship Enquiry" />
    </form>
  );
}

function BrochureForm() {
  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <SectionTitle>Basic Information</SectionTitle>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full Name" required><TextInput placeholder="Alex Rahman" /></Field>
        <Field label="Job Title" required><TextInput placeholder="Security Architect" /></Field>
        <Field label="Company / Organization Name" required><TextInput placeholder="Gulf Cyber Inc" /></Field>
        <Field label="Work Email Address" required><TextInput type="email" placeholder="alex@gulfcyber.com" /></Field>
        <Field label="Mobile Number (with country code)" required><TextInput placeholder="+971 50 000 0000" /></Field>
      </div>

      <SectionTitle>Professional Details</SectionTitle>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Industry" required>
          <SelectInput options={["Cybersecurity","IoT","BFSI","Government","Telecom","Healthcare","Manufacturing","Energy","Retail","Smart Cities","Others"]} />
        </Field>
        <Field label="Company Size" required>
          <SelectInput options={["1–50","51–200","201–500","500–1000","1000+"]} />
        </Field>
        <Field label="Country / Region" required><TextInput placeholder="United Arab Emirates" /></Field>
      </div>

      <SectionTitle>Your Interest in the Event</SectionTitle>
      <Field label="I am interested in:" required>
        <CheckGroup items={["Attending as a Delegate","Speaking Opportunities","Sponsorship & Partnership","Exhibiting","Awards Participation"]} />
      </Field>

      <SectionTitle>Consent & Communication</SectionTitle>
      <CheckGroup items={["I agree to receive the brochure and event updates","I agree to be contacted for relevant opportunities"]} />

      <SubmitBtn label="Download Brochure" />
    </form>
  );
}

/* ─────────────────────────────────────────────────────────────
   MODAL
───────────────────────────────────────────────────────────── */
const MODAL_META: Record<ModalKey, { title: string; subtitle: string; form: React.ReactNode }> = {
  delegate: {
    title: "Delegate Registration",
    subtitle: "Secure your seat at IoT Security World Summit Abu Dhabi 2026",
    form: <DelegateForm />,
  },
  sponsor: {
    title: "Become a Sponsor",
    subtitle: "Partner with us to connect with the region's top security leaders",
    form: <SponsorForm />,
  },
  brochure: {
    title: "Download Brochure",
    subtitle: "Instantly access the full event brochure",
    form: <BrochureForm />,
  },
};

function Modal({ modalKey, onClose }: { modalKey: ModalKey; onClose: () => void }) {
  const meta = MODAL_META[modalKey];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-[#020810]/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        className="relative z-10 w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl border border-cyan-500/30 bg-[#06111f] shadow-2xl shadow-cyan-900/30 overflow-hidden"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ type: "spring", damping: 26, stiffness: 300 }}
      >
        {/* Glowing top border accent */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-cyan-500/20 shrink-0">
          <div>
            <p className="text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-1">
              IoT Security World Summit · Abu Dhabi 2026
            </p>
            <h2 className="text-xl font-bold text-white">{meta.title}</h2>
            <p className="text-sm text-slate-400 mt-0.5">{meta.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-1.5 rounded-lg text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto px-6 py-6 flex-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cyan-500/20">
          {meta.form}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PROVIDER  —  wrap your layout with this once
───────────────────────────────────────────────────────────── */
export function FormModalProvider({ children }: { children: React.ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalKey | null>(null);

  return (
    <FormModalContext.Provider value={{ openModal: setActiveModal }}>
      {children}

      <AnimatePresence>
        {activeModal && (
          <Modal
            key={activeModal}
            modalKey={activeModal}
            onClose={() => setActiveModal(null)}
          />
        )}
      </AnimatePresence>
    </FormModalContext.Provider>
  );
}