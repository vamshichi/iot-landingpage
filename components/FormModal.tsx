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
   BUSINESS EMAIL VALIDATION
───────────────────────────────────────────────────────────── */
const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com","googlemail.com","yahoo.com","yahoo.co.uk","yahoo.co.in","yahoo.fr",
  "yahoo.de","yahoo.es","yahoo.it","yahoo.ca","yahoo.com.au","yahoo.com.br",
  "hotmail.com","hotmail.co.uk","hotmail.fr","hotmail.de","hotmail.es","hotmail.it",
  "outlook.com","outlook.co.uk","live.com","live.co.uk","live.fr","live.de",
  "msn.com","icloud.com","me.com","mac.com","aol.com","aim.com",
  "protonmail.com","protonmail.ch","pm.me","tutanota.com","tutanota.de",
  "zoho.com","mail.com","email.com","fastmail.com","fastmail.fm",
  "yandex.com","yandex.ru","inbox.com","gmx.com","gmx.net","gmx.de",
  "rediffmail.com","rocketmail.com","ymail.com","hushmail.com",
  "guerrillamail.com","tempmail.com","mailinator.com","sharklasers.com",
  "dispostable.com","throwam.com","trashmail.com",
]);

/**
 * Returns an error message string if the email is not a business email,
 * or null if it's valid.
 */
function validateBusinessEmail(email: string): string | null {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed) return null; // let `required` handle the empty case

  const atIdx = trimmed.lastIndexOf("@");
  if (atIdx < 1) return "Please enter a valid email address.";

  const domain = trimmed.slice(atIdx + 1);
  if (FREE_EMAIL_DOMAINS.has(domain)) {
    return "Please use a business / work email address (e.g. yourname@company.com).";
  }

  return null;
}

/* ─────────────────────────────────────────────────────────────
   SHARED UI HELPERS
───────────────────────────────────────────────────────────── */
const inputCls =
  "w-full bg-[#0a1628]/60 border border-cyan-500/30 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 transition-all";

const inputErrCls =
  "w-full bg-[#0a1628]/60 border border-red-500/60 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400/40 transition-all";

const labelCls =
  "block text-xs font-semibold text-cyan-300/80 uppercase tracking-wider mb-1.5";

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string | null;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={labelCls}>
        {label}
        {required && <span className="text-cyan-400 ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 flex items-start gap-1.5 text-xs text-red-400">
          <AlertCircle size={12} className="shrink-0 mt-0.5" />
          {error}
        </p>
      )}
    </div>
  );
}

function TextInput({
  placeholder,
  type = "text",
  name,
  value,
  onChange,
  hasError,
}: {
  placeholder?: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasError?: boolean;
}) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={hasError ? inputErrCls : inputCls}
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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFields((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));         // clear on change
  };

  const setCheck = (name: string, val: string[]) => {
    setChecks((p) => ({ ...p, [name]: val }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validate = (): Record<string, string> => {
    const errs: Record<string, string> = {};
    if (!fields.fullName.trim())                  errs.fullName = "Full name is required.";
    if (!fields.jobTitle.trim())                  errs.jobTitle = "Job title is required.";
    if (!fields.organizationCompanyName.trim())   errs.organizationCompanyName = "Organization name is required.";
    if (!fields.industry)                         errs.industry = "Please select an industry.";
    if (!fields.workEmailAddress.trim()) {
      errs.workEmailAddress = "Work email is required.";
    } else {
      const emailErr = validateBusinessEmail(fields.workEmailAddress);
      if (emailErr) errs.workEmailAddress = emailErr;
    }
    if (!fields.mobileNumber.trim())              errs.mobileNumber = "Mobile number is required.";
    if (!checks.keyAreasOfInterest.length)        errs.keyAreasOfInterest = "Please select at least one area of interest.";
    if (!checks.lookingToAchieve.length)          errs.lookingToAchieve = "Please select at least one objective.";
    if (!checks.galaDinner.length)                errs.galaDinner = "Please indicate whether you will attend.";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    submit({ ...fields, ...checks });
  };

  if (status === "success") return <SuccessBanner />;

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      {status === "error" && <ErrorBanner message={errorMsg} />}

      <SectionTitle>Personal Information</SectionTitle>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full Name" required error={errors.fullName}>
          <TextInput name="fullName" value={fields.fullName} onChange={set} placeholder="Jane Smith" hasError={!!errors.fullName} />
        </Field>
        <Field label="Job Title" required error={errors.jobTitle}>
          <TextInput name="jobTitle" value={fields.jobTitle} onChange={set} placeholder="CISO" hasError={!!errors.jobTitle} />
        </Field>
        <Field label="Organization / Company Name" required error={errors.organizationCompanyName}>
          <TextInput name="organizationCompanyName" value={fields.organizationCompanyName} onChange={set} placeholder="Acme Corp" hasError={!!errors.organizationCompanyName} />
        </Field>
        <Field label="Industry" required error={errors.industry}>
          <SelectInput
            name="industry" value={fields.industry} onChange={set}
            options={["BFSI","Government","Telecom","Healthcare","Manufacturing","Energy","Retail","Smart Cities","Others"]}
          />
        </Field>
        <Field label="Work Email Address" required error={errors.workEmailAddress}>
          <TextInput
            name="workEmailAddress" type="email"
            value={fields.workEmailAddress} onChange={set}
            placeholder="jane@acme.com"
            hasError={!!errors.workEmailAddress}
          />
        </Field>
        <Field label="Mobile Number (with country code)" required error={errors.mobileNumber}>
          <TextInput name="mobileNumber" value={fields.mobileNumber} onChange={set} placeholder="+971 50 000 0000" hasError={!!errors.mobileNumber} />
        </Field>
      </div>
      <Field label="LinkedIn Profile URL">
        <TextInput name="linkedInProfileUrl" value={fields.linkedInProfileUrl} onChange={set} placeholder="https://linkedin.com/in/…" />
      </Field>

      <SectionTitle>Your Interests & Objectives</SectionTitle>
      <Field label="Key Areas of Interest" required error={errors.keyAreasOfInterest}>
        <CheckGroup name="keyAreasOfInterest" value={checks.keyAreasOfInterest} onChange={setCheck}
          items={["IoT Security Frameworks","AI-driven Threat Detection","Critical Infrastructure Protection","Smart Cities Security","Industrial IoT (IIoT) Security","Cloud & Edge Security","Zero Trust Architecture","Regulatory & Compliance"]} />
      </Field>
      <Field label="What are you looking to achieve?" required error={errors.lookingToAchieve}>
        <CheckGroup name="lookingToAchieve" value={checks.lookingToAchieve} onChange={setCheck}
          items={["Networking with Industry Leaders","Exploring Technology Solutions","Learning & Insights","Partnerships & Collaborations","Investment Opportunities"]} />
      </Field>

      <SectionTitle>Networking & Gala Dinner</SectionTitle>
      <Field label="Will you attend the Gala Dinner & Awards Ceremony?" required error={errors.galaDinner}>
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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFields((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const setCheck = (name: string, val: string[]) => {
    setChecks((p) => ({ ...p, [name]: val }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validate = (): Record<string, string> => {
    const errs: Record<string, string> = {};
    if (!fields.companyName.trim())           errs.companyName = "Company name is required.";
    if (!fields.websiteUrl.trim())            errs.websiteUrl = "Website URL is required.";
    if (!fields.industry)                     errs.industry = "Please select an industry.";
    if (!fields.headquartersLocation.trim())  errs.headquartersLocation = "Headquarters location is required.";
    if (!fields.companySize)                  errs.companySize = "Please select a company size.";
    if (!fields.fullName.trim())              errs.fullName = "Full name is required.";
    if (!fields.jobTitle.trim())              errs.jobTitle = "Job title is required.";
    if (!fields.workEmailAddress.trim()) {
      errs.workEmailAddress = "Work email is required.";
    } else {
      const emailErr = validateBusinessEmail(fields.workEmailAddress);
      if (emailErr) errs.workEmailAddress = emailErr;
    }
    if (!fields.mobileNumber.trim())          errs.mobileNumber = "Mobile number is required.";
    if (!checks.keyObjectives.length)         errs.keyObjectives = "Please select at least one objective.";
    if (!checks.targetAudience.length)        errs.targetAudience = "Please select at least one target audience.";
    if (!checks.sponsorshipCategory.length)   errs.sponsorshipCategory = "Please select a sponsorship category.";
    if (!checks.scheduledMeetings.length)     errs.scheduledMeetings = "Please indicate your preference.";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    submit({ ...fields, ...checks });
  };

  if (status === "success") return <SuccessBanner />;

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      {status === "error" && <ErrorBanner message={errorMsg} />}

      <SectionTitle>Company Information</SectionTitle>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Company Name" required error={errors.companyName}>
          <TextInput name="companyName" value={fields.companyName} onChange={set} placeholder="TechSecure Ltd" hasError={!!errors.companyName} />
        </Field>
        <Field label="Website URL" required error={errors.websiteUrl}>
          <TextInput name="websiteUrl" value={fields.websiteUrl} onChange={set} placeholder="https://techsecure.com" hasError={!!errors.websiteUrl} />
        </Field>
        <Field label="Industry" required error={errors.industry}>
          <SelectInput name="industry" value={fields.industry} onChange={set}
            options={["Cybersecurity","IoT Solutions","Cloud","AI","Telecom","System Integrator","Consulting","Government","Startup","Others"]} />
        </Field>
        <Field label="Headquarters Location" required error={errors.headquartersLocation}>
          <TextInput name="headquartersLocation" value={fields.headquartersLocation} onChange={set} placeholder="Dubai, UAE" hasError={!!errors.headquartersLocation} />
        </Field>
        <Field label="Company Size" required error={errors.companySize}>
          <SelectInput name="companySize" value={fields.companySize} onChange={set}
            options={["1–50","51–200","201–500","500–1000","1000+"]} />
        </Field>
      </div>

      <SectionTitle>Primary Contact Details</SectionTitle>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full Name" required error={errors.fullName}>
          <TextInput name="fullName" value={fields.fullName} onChange={set} placeholder="John Doe" hasError={!!errors.fullName} />
        </Field>
        <Field label="Job Title" required error={errors.jobTitle}>
          <TextInput name="jobTitle" value={fields.jobTitle} onChange={set} placeholder="VP Partnerships" hasError={!!errors.jobTitle} />
        </Field>
        <Field label="Work Email Address" required error={errors.workEmailAddress}>
          <TextInput
            name="workEmailAddress" type="email"
            value={fields.workEmailAddress} onChange={set}
            placeholder="john@techsecure.com"
            hasError={!!errors.workEmailAddress}
          />
        </Field>
        <Field label="Mobile Number (with country code)" required error={errors.mobileNumber}>
          <TextInput name="mobileNumber" value={fields.mobileNumber} onChange={set} placeholder="+971 50 000 0000" hasError={!!errors.mobileNumber} />
        </Field>
      </div>
      <Field label="LinkedIn Profile URL">
        <TextInput name="linkedInProfileUrl" value={fields.linkedInProfileUrl} onChange={set} placeholder="https://linkedin.com/in/…" />
      </Field>

      <SectionTitle>Sponsorship Objectives</SectionTitle>
      <Field label="Key Objectives for Sponsoring" required error={errors.keyObjectives}>
        <CheckGroup name="keyObjectives" value={checks.keyObjectives} onChange={setCheck}
          items={["Brand Visibility","Lead Generation","Thought Leadership / speaking slots","Product Launch","Networking & Partnerships","Market Expansion"]} />
      </Field>
      <Field label="Target Audience You Want to Connect With" required error={errors.targetAudience}>
        <CheckGroup name="targetAudience" value={checks.targetAudience} onChange={setCheck}
          items={["CISOs","CIOs / CTOs","Government Leaders","Smart City Authorities","Enterprise IT Leaders","Investors / Startups"]} />
      </Field>

      <SectionTitle>Sponsorship Preferences</SectionTitle>
      <Field label="Preferred Sponsorship Category" required error={errors.sponsorshipCategory}>
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
      <Field label="Pre-scheduled 1:1 meetings with delegates?" required error={errors.scheduledMeetings}>
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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFields((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const setCheck = (name: string, val: string[]) => {
    setChecks((p) => ({ ...p, [name]: val }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validate = (): Record<string, string> => {
    const errs: Record<string, string> = {};
    if (!fields.fullName.trim())                  errs.fullName = "Full name is required.";
    if (!fields.jobTitle.trim())                  errs.jobTitle = "Job title is required.";
    if (!fields.companyOrganizationName.trim())   errs.companyOrganizationName = "Company name is required.";
    if (!fields.workEmailAddress.trim()) {
      errs.workEmailAddress = "Work email is required.";
    } else {
      const emailErr = validateBusinessEmail(fields.workEmailAddress);
      if (emailErr) errs.workEmailAddress = emailErr;
    }
    if (!fields.mobileNumber.trim())              errs.mobileNumber = "Mobile number is required.";
    if (!fields.industry)                         errs.industry = "Please select an industry.";
    if (!fields.companySize)                      errs.companySize = "Please select a company size.";
    if (!fields.countryRegion.trim())             errs.countryRegion = "Country / region is required.";
    if (!checks.interestedIn.length)              errs.interestedIn = "Please select at least one option.";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    submit({ ...fields, ...checks });
  };

  if (status === "success") return <SuccessBanner />;

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      {status === "error" && <ErrorBanner message={errorMsg} />}

      <SectionTitle>Basic Information</SectionTitle>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full Name" required error={errors.fullName}>
          <TextInput name="fullName" value={fields.fullName} onChange={set} placeholder="Alex Rahman" hasError={!!errors.fullName} />
        </Field>
        <Field label="Job Title" required error={errors.jobTitle}>
          <TextInput name="jobTitle" value={fields.jobTitle} onChange={set} placeholder="Security Architect" hasError={!!errors.jobTitle} />
        </Field>
        <Field label="Company / Organization Name" required error={errors.companyOrganizationName}>
          <TextInput name="companyOrganizationName" value={fields.companyOrganizationName} onChange={set} placeholder="Gulf Cyber Inc" hasError={!!errors.companyOrganizationName} />
        </Field>
        <Field label="Work Email Address" required error={errors.workEmailAddress}>
          <TextInput
            name="workEmailAddress" type="email"
            value={fields.workEmailAddress} onChange={set}
            placeholder="alex@gulfcyber.com"
            hasError={!!errors.workEmailAddress}
          />
        </Field>
        <Field label="Mobile Number (with country code)" required error={errors.mobileNumber}>
          <TextInput name="mobileNumber" value={fields.mobileNumber} onChange={set} placeholder="+971 50 000 0000" hasError={!!errors.mobileNumber} />
        </Field>
      </div>

      <SectionTitle>Professional Details</SectionTitle>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Industry" required error={errors.industry}>
          <SelectInput name="industry" value={fields.industry} onChange={set}
            options={["Cybersecurity","IoT","BFSI","Government","Telecom","Healthcare","Manufacturing","Energy","Retail","Smart Cities","Others"]} />
        </Field>
        <Field label="Company Size" required error={errors.companySize}>
          <SelectInput name="companySize" value={fields.companySize} onChange={set}
            options={["1–50","51–200","201–500","500–1000","1000+"]} />
        </Field>
        <Field label="Country / Region" required error={errors.countryRegion}>
          <TextInput name="countryRegion" value={fields.countryRegion} onChange={set} placeholder="United Arab Emirates" hasError={!!errors.countryRegion} />
        </Field>
      </div>

      <SectionTitle>Your Interest in the Event</SectionTitle>
      <Field label="I am interested in:" required error={errors.interestedIn}>
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