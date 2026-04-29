"use client";

import { useState } from "react";

/* ─── Data ─────────────────────────────────────────────────────────── */
const INDUSTRIES = [
  "BFSI", "Government", "Telecom", "Healthcare",
  "Manufacturing", "Energy", "Retail", "Smart Cities", "Others",
];

const INTERESTS = [
  "IoT Security Frameworks",
  "AI-driven Threat Detection",
  "Critical Infrastructure Protection",
  "Smart Cities Security",
  "Industrial IoT (IIoT) Security",
  "Cloud & Edge Security",
  "Zero Trust Architecture",
  "Regulatory & Compliance",
];

const GOALS = [
  "Networking with Industry Leaders",
  "Exploring Technology Solutions",
  "Learning & Insights",
  "Partnerships & Collaborations",
  "Investment Opportunities",
];

/* ─── Types ─────────────────────────────────────────────────────────── */
interface FormState {
  fullName: string;
  jobTitle: string;
  company: string;
  industry: string;
  email: string;
  mobile: string;
  linkedin: string;
  interests: string[];
  goals: string[];
  gala: "yes" | "no" | "";
  consent1: boolean;
  consent2: boolean;
}

/* ─── Sub-components ────────────────────────────────────────────────── */
function InputField({
  label, name, placeholder, type = "text", value, onChange,
}: {
  label: string; name: string; placeholder: string;
  type?: string; value: string; onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 11, fontWeight: 600, color: "#6b7fa0", textTransform: "uppercase", letterSpacing: "0.08em" }}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          background: "#070d1a",
          border: `1px solid ${focused ? "#00d4ff" : "#1e2d45"}`,
          boxShadow: focused ? "0 0 0 3px rgba(0,212,255,0.08)" : "none",
          borderRadius: 10,
          padding: "11px 14px",
          fontSize: 14,
          color: "#e2e8f4",
          outline: "none",
          fontFamily: "inherit",
          width: "100%",
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
      />
    </div>
  );
}

function SelectField({
  label, name, value, options, onChange,
}: {
  label: string; name: string; value: string; options: string[]; onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 11, fontWeight: 600, color: "#6b7fa0", textTransform: "uppercase", letterSpacing: "0.08em" }}>
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          background: "#070d1a",
          border: `1px solid ${focused ? "#00d4ff" : "#1e2d45"}`,
          boxShadow: focused ? "0 0 0 3px rgba(0,212,255,0.08)" : "none",
          borderRadius: 10,
          padding: "11px 14px",
          fontSize: 14,
          color: value ? "#e2e8f4" : "#3a4f6a",
          outline: "none",
          fontFamily: "inherit",
          width: "100%",
          transition: "border-color 0.2s, box-shadow 0.2s",
          appearance: "none",
          cursor: "pointer",
        }}
      >
        <option value="" disabled>Select industry</option>
        {options.map((o) => (
          <option key={o} value={o} style={{ background: "#0e1527", color: "#e2e8f4" }}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function CheckChip({
  label, selected, onToggle,
}: { label: string; selected: boolean; onToggle: () => void }) {
  return (
    <div
      onClick={onToggle}
      style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "10px 14px",
        background: selected ? "rgba(0,212,255,0.05)" : "#070d1a",
        border: `1px solid ${selected ? "rgba(0,212,255,0.4)" : "#1e2d45"}`,
        borderRadius: 10,
        cursor: "pointer",
        fontSize: 13,
        color: selected ? "#00d4ff" : "#8fa3c0",
        transition: "all 0.15s",
        userSelect: "none",
      }}
    >
      <span style={{
        width: 16, height: 16, borderRadius: 4,
        border: `1px solid ${selected ? "#00d4ff" : "#2a3f5f"}`,
        background: selected ? "#00d4ff" : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 10, color: "#0a0f1e", flexShrink: 0,
        transition: "all 0.15s",
      }}>
        {selected && "✓"}
      </span>
      {label}
    </div>
  );
}

function RadioCard({
  label, selected, onSelect,
}: { label: string; selected: boolean; onSelect: () => void }) {
  return (
    <div
      onClick={onSelect}
      style={{
        flex: 1, display: "flex", alignItems: "center", gap: 10,
        padding: "14px 18px",
        background: selected ? "rgba(0,212,255,0.05)" : "#070d1a",
        border: `1px solid ${selected ? "rgba(0,212,255,0.4)" : "#1e2d45"}`,
        borderRadius: 10, cursor: "pointer",
        fontSize: 14,
        color: selected ? "#e2e8f4" : "#8fa3c0",
        transition: "all 0.15s", userSelect: "none",
      }}
    >
      <div style={{
        width: 18, height: 18, borderRadius: "50%",
        border: `1px solid ${selected ? "#00d4ff" : "#2a3f5f"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, transition: "all 0.15s",
      }}>
        {selected && (
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00d4ff" }} />
        )}
      </div>
      {label}
    </div>
  );
}

function ConsentRow({
  text, checked, onToggle,
}: { text: string; checked: boolean; onToggle: () => void }) {
  return (
    <div
      onClick={onToggle}
      style={{
        display: "flex", alignItems: "flex-start", gap: 10,
        padding: "12px 14px", marginBottom: 10,
        background: "#070d1a",
        border: `1px solid ${checked ? "rgba(0,212,255,0.25)" : "#1e2d45"}`,
        borderRadius: 10, cursor: "pointer",
        transition: "all 0.15s", userSelect: "none",
      }}
    >
      <span style={{
        width: 18, height: 18, borderRadius: 5,
        border: `1px solid ${checked ? "#00d4ff" : "#2a3f5f"}`,
        background: checked ? "#00d4ff" : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 11, color: "#0a0f1e", flexShrink: 0, marginTop: 1,
        transition: "all 0.15s",
      }}>
        {checked && "✓"}
      </span>
      <span style={{ fontSize: 13, color: checked ? "#8fa3c0" : "#6b7fa0", lineHeight: 1.6 }}>
        {text}
      </span>
    </div>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: "#b0c4de", whiteSpace: "nowrap" }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: "#1a2540" }} />
    </div>
  );
}

/* ─── Steps ─────────────────────────────────────────────────────────── */
const STEPS = ["Personal Info", "Interests", "Confirm"];

/* ─── Main Component ─────────────────────────────────────────────────── */
export default function DelegateForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>({
    fullName: "", jobTitle: "", company: "", industry: "",
    email: "", mobile: "", linkedin: "",
    interests: [], goals: [],
    gala: "yes",
    consent1: false, consent2: false,
  });

  const set = (key: keyof FormState) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleArr = (key: "interests" | "goals", value: string) =>
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));

  const progress = ((step + 1) / STEPS.length) * 100;

  /* ─── Styles ── */
  const S = {
    header: {
      padding: "28px 32px 0",
      borderBottom: "1px solid #1a2540",
    } as React.CSSProperties,
    body: {
      padding: "28px 32px",
    } as React.CSSProperties,
    footer: {
      padding: "0 32px 28px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
    } as React.CSSProperties,
    grid2: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 14,
      marginBottom: 14,
    } as React.CSSProperties,
    grid1: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: 14,
      marginBottom: 14,
    } as React.CSSProperties,
    checksGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8,
      marginBottom: 20,
    } as React.CSSProperties,
    radioRow: {
      display: "flex",
      gap: 12,
      marginBottom: 24,
    } as React.CSSProperties,
  };

  if (submitted) {
    return (
      <>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap');`}</style>
        <div style={{ padding: "60px 32px", textAlign: "center" }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)",
            margin: "0 auto 20px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 28, color: "#00d4ff",
          }}>✓</div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: "#e2e8f4", marginBottom: 8 }}>
            Registration Submitted!
          </div>
          <div style={{ fontSize: 14, color: "#6b7fa0", lineHeight: 1.6 }}>
            Thank you for registering. You'll receive a confirmation<br />at your email address shortly.
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap');
        .step-panel { animation: fadeSlide 0.25s ease; }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateX(10px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .btn-back:hover  { background: rgba(255,255,255,0.06) !important; color: #b0c4de !important; }
        .btn-next:hover  { background: linear-gradient(135deg,#00c8f0,#008fc4) !important; transform: translateY(-1px); }
        .btn-next:active { transform: translateY(0) !important; }
      `}</style>

      {/* ── Header ── */}
      <div style={S.header}>
        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)",
          borderRadius: 20, padding: "4px 12px",
          fontSize: 11, fontWeight: 500, color: "#00d4ff",
          letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%", background: "#00d4ff",
            animation: "pulse 2s infinite",
          }} />
          IoT & Cybersecurity Summit 2025
        </div>

        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: "#e2e8f4", marginBottom: 6 }}>
          Delegate Registration
        </div>
        <div style={{ fontSize: 13, color: "#6b7fa0", marginBottom: 24 }}>
          Secure your seat at the premier cybersecurity event
        </div>

        {/* Step tabs */}
        <div style={{ display: "flex" }}>
          {STEPS.map((label, i) => {
            const isActive = i === step;
            const isDone = i < step;
            return (
              <div
                key={label}
                onClick={() => isDone && setStep(i)}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "12px 16px 14px",
                  cursor: isDone ? "pointer" : "default",
                  borderBottom: `2px solid ${isActive ? "#00d4ff" : "transparent"}`,
                  color: isActive ? "#00d4ff" : isDone ? "#4a9eba" : "#6b7fa0",
                  fontSize: 13, fontWeight: 500,
                  transition: "all 0.2s", whiteSpace: "nowrap",
                }}
              >
                <span style={{
                  width: 22, height: 22, borderRadius: "50%",
                  border: `1px solid currentColor`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: isDone ? 11 : 11, fontWeight: 600, flexShrink: 0,
                  background: isActive ? "#00d4ff" : isDone ? "#1a3a4a" : "transparent",
                  color: isActive ? "#0a0f1e" : "currentColor",
                  transition: "all 0.2s",
                }}>
                  {isDone ? "✓" : i + 1}
                </span>
                {label}
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 2, background: "#1a2540" }}>
        <div style={{
          height: "100%",
          background: "linear-gradient(90deg,#00d4ff,#0077a8)",
          width: `${progress}%`,
          transition: "width 0.4s cubic-bezier(0.4,0,0.2,1)",
        }} />
      </div>

      {/* ── Step 0: Personal Info ── */}
      {step === 0 && (
        <div style={S.body} className="step-panel">
          <div style={S.grid2}>
            <InputField label="Full Name *" name="fullName" placeholder="Jane Smith" value={form.fullName} onChange={set("fullName")} />
            <InputField label="Job Title *" name="jobTitle" placeholder="CISO" value={form.jobTitle} onChange={set("jobTitle")} />
          </div>
          <div style={S.grid2}>
            <InputField label="Organization *" name="company" placeholder="Acme Corp" value={form.company} onChange={set("company")} />
            <SelectField label="Industry *" name="industry" value={form.industry} options={INDUSTRIES} onChange={set("industry")} />
          </div>
          <div style={S.grid2}>
            <InputField label="Work Email *" name="email" placeholder="jane@company.com" type="email" value={form.email} onChange={set("email")} />
            <InputField label="Mobile Number *" name="mobile" placeholder="+91 98765 43210" type="tel" value={form.mobile} onChange={set("mobile")} />
          </div>
          <div style={S.grid1}>
            <InputField label="LinkedIn URL" name="linkedin" placeholder="linkedin.com/in/janesmith" value={form.linkedin} onChange={set("linkedin")} />
          </div>
        </div>
      )}

      {/* ── Step 1: Interests ── */}
      {step === 1 && (
        <div style={S.body} className="step-panel">
          <SectionDivider label="Key areas of interest *" />
          <div style={S.checksGrid}>
            {INTERESTS.map((item) => (
              <CheckChip
                key={item} label={item}
                selected={form.interests.includes(item)}
                onToggle={() => toggleArr("interests", item)}
              />
            ))}
          </div>

          <SectionDivider label="What are you looking to achieve? *" />
          <div style={S.checksGrid}>
            {GOALS.map((item) => (
              <CheckChip
                key={item} label={item}
                selected={form.goals.includes(item)}
                onToggle={() => toggleArr("goals", item)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Step 2: Confirm ── */}
      {step === 2 && (
        <div style={S.body} className="step-panel">
          <SectionDivider label="Gala dinner & awards ceremony *" />
          <div style={S.radioRow}>
            <RadioCard label="Yes, I will attend" selected={form.gala === "yes"} onSelect={() => setForm((p) => ({ ...p, gala: "yes" }))} />
            <RadioCard label="No, I'll skip" selected={form.gala === "no"} onSelect={() => setForm((p) => ({ ...p, gala: "no" }))} />
          </div>

          <SectionDivider label="Consent & data sharing" />
          <ConsentRow
            text="I agree to share my details with event partners for networking purposes"
            checked={form.consent1}
            onToggle={() => setForm((p) => ({ ...p, consent1: !p.consent1 }))}
          />
          <ConsentRow
            text="I agree to receive updates about this and future events"
            checked={form.consent2}
            onToggle={() => setForm((p) => ({ ...p, consent2: !p.consent2 }))}
          />
        </div>
      )}

      {/* ── Footer ── */}
      <div style={S.footer}>
        <button
          className="btn-back"
          onClick={() => setStep((s) => s - 1)}
          style={{
            visibility: step > 0 ? "visible" : "hidden",
            background: "transparent",
            border: "1px solid #1e2d45",
            borderRadius: 10,
            padding: "12px 24px",
            fontSize: 14, fontWeight: 500,
            color: "#6b7fa0",
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "all 0.2s",
          }}
        >
          ← Back
        </button>

        {step < STEPS.length - 1 ? (
          <button
            className="btn-next"
            onClick={() => setStep((s) => s + 1)}
            style={{
              background: "linear-gradient(135deg,#00b4d8,#0077a8)",
              border: "none",
              borderRadius: 10,
              padding: "12px 32px",
              fontSize: 14, fontWeight: 600,
              color: "#fff",
              cursor: "pointer",
              fontFamily: "inherit",
              letterSpacing: "0.01em",
              transition: "all 0.2s",
            }}
          >
            Continue →
          </button>
        ) : (
          <button
            className="btn-next"
            onClick={() => setSubmitted(true)}
            style={{
              background: "linear-gradient(135deg,#00b4d8,#0077a8)",
              border: "none",
              borderRadius: 10,
              padding: "12px 32px",
              fontSize: 14, fontWeight: 600,
              color: "#fff",
              cursor: "pointer",
              fontFamily: "inherit",
              letterSpacing: "0.01em",
              transition: "all 0.2s",
            }}
          >
            Submit Registration ✦
          </button>
        )}
      </div>
    </>
  );
}