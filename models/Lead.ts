import mongoose, { Schema, Document, Model } from "mongoose";

/* ─────────────────────────────────────────────────────────────
   LEAD STATUS
   new       → just submitted
   contacted → team has reached out
   converted → became delegate / sponsor / attendee
   rejected  → not moving forward
───────────────────────────────────────────────────────────── */
export type LeadStatus = "new" | "contacted" | "converted" | "rejected";
export type FormType   = "delegate" | "sponsor" | "brochure";

/* ─────────────────────────────────────────────────────────────
   SHARED BASE
───────────────────────────────────────────────────────────── */
export interface ILead extends Document {
  formType      : FormType;
  status        : LeadStatus;
  submittedAt   : Date;
  notes         : string;          // internal admin notes

  // ── Personal / Contact (all forms) ──────────────────────
  fullName      : string;
  jobTitle      : string;
  workEmailAddress: string;
  mobileNumber  : string;
  linkedInProfileUrl?: string;

  // ── Delegate fields ──────────────────────────────────────
  organizationCompanyName?: string;
  industry?               : string;
  keyAreasOfInterest?     : string[];
  lookingToAchieve?       : string[];
  galaDinner?             : string[];
  delegateConsent?        : string[];

  // ── Sponsor fields ───────────────────────────────────────
  companyName?            : string;
  websiteUrl?             : string;
  sponsorIndustry?        : string;
  headquartersLocation?   : string;
  companySize?            : string;
  keyObjectives?          : string[];
  targetAudience?         : string[];
  sponsorshipCategory?    : string[];
  addOns?                 : string[];
  activationPlans?        : string[];
  customRequests?         : string;
  scheduledMeetings?      : string[];
  vipDinner?              : string[];
  sponsorConsent?         : string[];

  // ── Brochure fields ──────────────────────────────────────
  companyOrganizationName?: string;
  brochureIndustry?       : string;
  brochureCompanySize?    : string;
  countryRegion?          : string;
  interestedIn?           : string[];
  brochureConsent?        : string[];
}

const LeadSchema = new Schema<ILead>(
  {
    formType  : { type: String, enum: ["delegate","sponsor","brochure"], required: true, index: true },
    status    : { type: String, enum: ["new","contacted","converted","rejected"], default: "new", index: true },
    submittedAt: { type: Date, default: Date.now, index: true },
    notes     : { type: String, default: "" },

    // Contact
    fullName          : { type: String, required: true },
    jobTitle          : { type: String, required: true },
    workEmailAddress  : { type: String, required: true, index: true },
    mobileNumber      : { type: String, required: true },
    linkedInProfileUrl: { type: String },

    // Delegate
    organizationCompanyName: String,
    industry               : String,
    keyAreasOfInterest     : [String],
    lookingToAchieve       : [String],
    galaDinner             : [String],
    delegateConsent        : [String],

    // Sponsor
    companyName          : String,
    websiteUrl           : String,
    sponsorIndustry      : String,
    headquartersLocation : String,
    companySize          : String,
    keyObjectives        : [String],
    targetAudience       : [String],
    sponsorshipCategory  : [String],
    addOns               : [String],
    activationPlans      : [String],
    customRequests       : String,
    scheduledMeetings    : [String],
    vipDinner            : [String],
    sponsorConsent       : [String],

    // Brochure
    companyOrganizationName: String,
    brochureIndustry       : String,
    brochureCompanySize    : String,
    countryRegion          : String,
    interestedIn           : [String],
    brochureConsent        : [String],
  },
  { timestamps: true }
);

// Text index for admin search
LeadSchema.index({
  fullName: "text",
  workEmailAddress: "text",
  companyName: "text",
  organizationCompanyName: "text",
  companyOrganizationName: "text",
  mobileNumber: "text",
});

export const Lead: Model<ILead> =
  mongoose.models.Lead ?? mongoose.model<ILead>("Lead", LeadSchema);