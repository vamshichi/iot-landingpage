"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, ArrowRight, ChevronDown, CheckSquare, Square,
  CheckCircle2, AlertCircle, Loader2,
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

function TextInput({
  placeholder,
  type = "text",
  name,
  value,
  onChange,
}: {
  placeholder?: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={inputCls}
    />
  );
}

function SelectInput({
  options,
  name,
  value,
  onChange,
}: {
  options: string[];
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`${inputCls} appearance-none pr-8`}
      >
        <option value="" disabled className="bg-[#0a1628]">Select…</option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#0a1628]">{o}</option>
        ))}
      </select>
      <ChevronDown size={14} className="absolute right-3 top-3 text-cyan-400 pointer-events-none" />
    </div>
  );
}

function CheckGroup({
  items,
  name,
  value,
  onChange,
}: {
  items: string[];
  name: string;
  value: string[];
  onChange: (name: string, updated: string[]) => void;
}) {
  const toggle = (item: string) => {
    const updated = value.includes(item)
      ? value.filter((v) => v !== item)
      : [...value, item];
    onChange(name, updated);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {items.map((item) => (
        <button
          type="button"
          key={item}
          onClick={() => toggle(item)}
          className="flex items-center gap-2 text-sm text-slate-300 hover:text-cyan-300 text-left transition-colors"
        >
          {value.includes(item)
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

function SubmitBtn({ label = "Submit", loading }: { label?: string; loading?: boolean }) {
  return (
    <motion.button
      type="submit"
      disabled={loading}
      whileHover={loading ? {} : { scale: 1.03 }}
      whileTap={loading ? {} : { scale: 0.97 }}
      className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-[#050d1a] font-bold text-sm tracking-wide hover:shadow-lg hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {loading ? (
        <><Loader2 size={15} className="animate-spin" /> Sending…</>
      ) : (
        <>{label} <ArrowRight size={15} /></>
      )}
    </motion.button>
  );
}

/* ─────────────────────────────────────────────────────────────
   SUCCESS / ERROR BANNERS
───────────────────────────────────────────────────────────── */
function SuccessBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 text-center gap-4"
    >
      <CheckCircle2 size={56} className="text-cyan-400" />
      <h3 className="text-xl font-bold text-white">Submission Received!</h3>
      <p className="text-slate-400 max-w-sm text-sm leading-relaxed">
        Thank you for your interest in IoT Security World Summit Abu Dhabi 2026.
        We've sent a confirmation to your email and will get back to you soon.
      </p>
    </motion.div>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4"
    >
      <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
      <p className="text-sm text-red-300">{message}</p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   GENERIC SUBMIT HOOK
───────────────────────────────────────────────────────────── */
type SubmitStatus = "idle" | "loading" | "success" | "error";

function useFormSubmit(formType: ModalKey) {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const submit = async (data: Record<string, unknown>) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType, data }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      setStatus("success");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setErrorMsg(message);
      setStatus("error");
    }
  };

  return { status, errorMsg, submit };
}

/* ─────────────────────────────────────────────────────────────
   DELEGATE FORM
───────────────────────────────────────────────────────────── */
function DelegateForm() {
  const { status, errorMsg, submit } = useFormSubmit("delegate");
  const [fields, setFields] = useState({
    fullName: "", jobTitle: "", organizationCompanyName: "",
    industry: "", workEmailAddress: "", mobileNumber: "", linkedInProfileUrl: "",
  });
  const [checks, setChecks] = useState<Record<string, string[]>>({
    keyAreasOfInterest: [], lookingToAchieve: [], galaDinner: [], consent: [],
  });

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setFields((p) => ({ ...p, [e.target.name]: e.target.value }));
  const setCheck = (name: string, val: string[]) =>
    setChecks((p) => ({ ...p, [name]: val }));

  if (status === "success") return <SuccessBanner />;

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        submit({ ...fields, ...checks });
      }}
    >
      {status === "error" && <ErrorBanner message={errorMsg} />}

      <SectionTitle>Personal Information</SectionTitle>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full Name" required>
          <TextInput name="fullName" value={fields.fullName} onChange={set} placeholder="Jane Smith" />
        </Field>
        <Field label="Job Title" required>
          <TextInput name="jobTitle" value={fields.jobTitle} onChange={set} placeholder="CISO" />
        </Field>
        <Field label="Organization / Company Name" required>
          <TextInput name="organizationCompanyName" value={fields.organizationCompanyName} onChange={set} placeholder="Acme Corp" />
        </Field>
        <Field label="Industry" required>
          <SelectInput
            name="industry" value={fields.industry} onChange={set}
            options={["BFSI","Government","Telecom","Healthcare","Manufacturing","Energy","Retail","Smart Cities","Others"]}
          />
        </Field>
        <Field label="Work Email Address" required>
          <TextInput name="workEmailAddress" type="email" value={fields.workEmailAddress} onChange={set} placeholder="jane@acme.com" />
        </Field>
        <Field label="Mobile Number (with country code)" required>
          <TextInput name="mobileNumber" value={fields.mobileNumber} onChange={set} placeholder="+971 50 000 0000" />
        </Field>
      </div>
      <Field label="LinkedIn Profile URL">
        <TextInput name="linkedInProfileUrl" value={fields.linkedInProfileUrl} onChange={set} placeholder="https://linkedin.com/in/…" />
      </Field>

      <SectionTitle>Your Interests & Objectives</SectionTitle>
      <Field label="Key Areas of Interest" required>
        <CheckGroup name="keyAreasOfInterest" value={checks.keyAreasOfInterest} onChange={setCheck}
          items={["IoT Security Frameworks","AI-driven Threat Detection","Critical Infrastructure Protection","Smart Cities Security","Industrial IoT (IIoT) Security","Cloud & Edge Security","Zero Trust Architecture","Regulatory & Compliance"]} />
      </Field>
      <Field label="What are you looking to achieve?" required>
        <CheckGroup name="lookingToAchieve" value={checks.lookingToAchieve} onChange={setCheck}
          items={["Networking with Industry Leaders","Exploring Technology Solutions","Learning & Insights","Partnerships & Collaborations","Investment Opportunities"]} />
      </Field>

      <SectionTitle>Networking & Gala Dinner</SectionTitle>
      <Field label="Will you attend the Gala Dinner & Awards Ceremony?" required>
        <CheckGroup name="galaDinner" value={checks.galaDinner} onChange={setCheck} items={["Yes","No"]} />
      </Field>

      <SectionTitle>Data Privacy & Consent</SectionTitle>
      <CheckGroup name="consent" value={checks.consent} onChange={setCheck}
        items={["I agree to share my details with event partners for networking purposes","I agree to receive updates about this and future events"]} />

      <SubmitBtn label="Submit Registration" loading={status === "loading"} />
    </form>
  );
}

/* ─────────────────────────────────────────────────────────────
   SPONSOR FORM
───────────────────────────────────────────────────────────── */
function SponsorForm() {
  const { status, errorMsg, submit } = useFormSubmit("sponsor");
  const [fields, setFields] = useState({
    companyName: "", websiteUrl: "", industry: "", headquartersLocation: "",
    companySize: "", fullName: "", jobTitle: "", workEmailAddress: "",
    mobileNumber: "", linkedInProfileUrl: "", customRequests: "",
  });
  const [checks, setChecks] = useState<Record<string, string[]>>({
    keyObjectives: [], targetAudience: [], sponsorshipCategory: [],
    addOns: [], activationPlans: [], scheduledMeetings: [], vipDinner: [], consent: [],
  });

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setFields((p) => ({ ...p, [e.target.name]: e.target.value }));
  const setCheck = (name: string, val: string[]) =>
    setChecks((p) => ({ ...p, [name]: val }));

  if (status === "success") return <SuccessBanner />;

  return (
    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); submit({ ...fields, ...checks }); }}>
      {status === "error" && <ErrorBanner message={errorMsg} />}

      <SectionTitle>Company Information</SectionTitle>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Company Name" required>
          <TextInput name="companyName" value={fields.companyName} onChange={set} placeholder="TechSecure Ltd" />
        </Field>
        <Field label="Website URL" required>
          <TextInput name="websiteUrl" value={fields.websiteUrl} onChange={set} placeholder="https://techsecure.com" />
        </Field>
        <Field label="Industry" required>
          <SelectInput name="industry" value={fields.industry} onChange={set}
            options={["Cybersecurity","IoT Solutions","Cloud","AI","Telecom","System Integrator","Consulting","Government","Startup","Others"]} />
        </Field>
        <Field label="Headquarters Location" required>
          <TextInput name="headquartersLocation" value={fields.headquartersLocation} onChange={set} placeholder="Dubai, UAE" />
        </Field>
        <Field label="Company Size" required>
          <SelectInput name="companySize" value={fields.companySize} onChange={set}
            options={["1–50","51–200","201–500","500–1000","1000+"]} />
        </Field>
      </div>

      <SectionTitle>Primary Contact Details</SectionTitle>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full Name" required>
          <TextInput name="fullName" value={fields.fullName} onChange={set} placeholder="John Doe" />
        </Field>
        <Field label="Job Title" required>
          <TextInput name="jobTitle" value={fields.jobTitle} onChange={set} placeholder="VP Partnerships" />
        </Field>
        <Field label="Work Email Address" required>
          <TextInput name="workEmailAddress" type="email" value={fields.workEmailAddress} onChange={set} placeholder="john@techsecure.com" />
        </Field>
        <Field label="Mobile Number (with country code)" required>
          <TextInput name="mobileNumber" value={fields.mobileNumber} onChange={set} placeholder="+971 50 000 0000" />
        </Field>
      </div>
      <Field label="LinkedIn Profile URL">
        <TextInput name="linkedInProfileUrl" value={fields.linkedInProfileUrl} onChange={set} placeholder="https://linkedin.com/in/…" />
      </Field>

      <SectionTitle>Sponsorship Objectives</SectionTitle>
      <Field label="Key Objectives for Sponsoring" required>
        <CheckGroup name="keyObjectives" value={checks.keyObjectives} onChange={setCheck}
          items={["Brand Visibility","Lead Generation","Thought Leadership / speaking slots","Product Launch","Networking & Partnerships","Market Expansion"]} />
      </Field>
      <Field label="Target Audience You Want to Connect With" required>
        <CheckGroup name="targetAudience" value={checks.targetAudience} onChange={setCheck}
          items={["CISOs","CIOs / CTOs","Government Leaders","Smart City Authorities","Enterprise IT Leaders","Investors / Startups"]} />
      </Field>

      <SectionTitle>Sponsorship Preferences</SectionTitle>
      <Field label="Preferred Sponsorship Category" required>
        <CheckGroup name="sponsorshipCategory" value={checks.sponsorshipCategory} onChange={setCheck}
          items={["Title Sponsor","Platinum Sponsor","Gold Sponsor","Silver Sponsor","Startup Sponsor","Not Sure – Need Consultation"]} />
      </Field>
      <Field label="Interested Add-ons">
        <CheckGroup name="addOns" value={checks.addOns} onChange={setCheck}
          items={["Speaking Slot (Keynote / Panel)","Exhibition Booth","Hosted Buyer Meetings","Private Roundtable","Awards Category Sponsorship","Branding Opportunities"]} />
      </Field>

      <SectionTitle>Engagement & Activation Plans</SectionTitle>
      <Field label="Do you plan to:">
        <CheckGroup name="activationPlans" value={checks.activationPlans} onChange={setCheck}
          items={["Launch a New Product / Solution","Showcase Existing Solutions","Announce Partnerships","Conduct Live Demos"]} />
      </Field>
      <Field label="Any specific requirements or custom requests?">
        <textarea
          name="customRequests"
          value={fields.customRequests}
          onChange={set}
          className={`${inputCls} min-h-[80px] resize-none`}
          placeholder="Tell us more…"
        />
      </Field>

      <SectionTitle>Meeting & Networking Preferences</SectionTitle>
      <Field label="Pre-scheduled 1:1 meetings with delegates?" required>
        <CheckGroup name="scheduledMeetings" value={checks.scheduledMeetings} onChange={setCheck} items={["Yes","No"]} />
      </Field>
      <Field label="VIP Networking Dinner & Awards Night?">
        <CheckGroup name="vipDinner" value={checks.vipDinner} onChange={setCheck} items={["Yes","No"]} />
      </Field>

      <SectionTitle>Consent & Communication</SectionTitle>
      <CheckGroup name="consent" value={checks.consent} onChange={setCheck}
        items={["I agree to be contacted regarding sponsorship opportunities","I agree to receive updates about this and future events"]} />

      <SubmitBtn label="Submit Sponsorship Enquiry" loading={status === "loading"} />
    </form>
  );
}

/* ─────────────────────────────────────────────────────────────
   BROCHURE FORM
───────────────────────────────────────────────────────────── */
function BrochureForm() {
  const { status, errorMsg, submit } = useFormSubmit("brochure");
  const [fields, setFields] = useState({
    fullName: "", jobTitle: "", companyOrganizationName: "",
    workEmailAddress: "", mobileNumber: "", industry: "", companySize: "", countryRegion: "",
  });
  const [checks, setChecks] = useState<Record<string, string[]>>({
    interestedIn: [], consent: [],
  });

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setFields((p) => ({ ...p, [e.target.name]: e.target.value }));
  const setCheck = (name: string, val: string[]) =>
    setChecks((p) => ({ ...p, [name]: val }));

  if (status === "success") return <SuccessBanner />;

  return (
    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); submit({ ...fields, ...checks }); }}>
      {status === "error" && <ErrorBanner message={errorMsg} />}

      <SectionTitle>Basic Information</SectionTitle>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full Name" required>
          <TextInput name="fullName" value={fields.fullName} onChange={set} placeholder="Alex Rahman" />
        </Field>
        <Field label="Job Title" required>
          <TextInput name="jobTitle" value={fields.jobTitle} onChange={set} placeholder="Security Architect" />
        </Field>
        <Field label="Company / Organization Name" required>
          <TextInput name="companyOrganizationName" value={fields.companyOrganizationName} onChange={set} placeholder="Gulf Cyber Inc" />
        </Field>
        <Field label="Work Email Address" required>
          <TextInput name="workEmailAddress" type="email" value={fields.workEmailAddress} onChange={set} placeholder="alex@gulfcyber.com" />
        </Field>
        <Field label="Mobile Number (with country code)" required>
          <TextInput name="mobileNumber" value={fields.mobileNumber} onChange={set} placeholder="+971 50 000 0000" />
        </Field>
      </div>

      <SectionTitle>Professional Details</SectionTitle>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Industry" required>
          <SelectInput name="industry" value={fields.industry} onChange={set}
            options={["Cybersecurity","IoT","BFSI","Government","Telecom","Healthcare","Manufacturing","Energy","Retail","Smart Cities","Others"]} />
        </Field>
        <Field label="Company Size" required>
          <SelectInput name="companySize" value={fields.companySize} onChange={set}
            options={["1–50","51–200","201–500","500–1000","1000+"]} />
        </Field>
        <Field label="Country / Region" required>
          <TextInput name="countryRegion" value={fields.countryRegion} onChange={set} placeholder="United Arab Emirates" />
        </Field>
      </div>

      <SectionTitle>Your Interest in the Event</SectionTitle>
      <Field label="I am interested in:" required>
        <CheckGroup name="interestedIn" value={checks.interestedIn} onChange={setCheck}
          items={["Attending as a Delegate","Speaking Opportunities","Sponsorship & Partnership","Exhibiting","Awards Participation"]} />
      </Field>

      <SectionTitle>Consent & Communication</SectionTitle>
      <CheckGroup name="consent" value={checks.consent} onChange={setCheck}
        items={["I agree to receive the brochure and event updates","I agree to be contacted for relevant opportunities"]} />

      <SubmitBtn label="Download Brochure" loading={status === "loading"} />
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
      <motion.div
        className="absolute inset-0 bg-[#020810]/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="relative z-10 w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl border border-cyan-500/30 bg-[#06111f] shadow-2xl shadow-cyan-900/30 overflow-hidden"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ type: "spring", damping: 26, stiffness: 300 }}
      >
        <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
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
        <div className="overflow-y-auto px-6 py-6 flex-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cyan-500/20">
          {meta.form}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PROVIDER
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