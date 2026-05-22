export type FormType =
  | "delegate"
  | "sponsor"
  | "brochure"
  | "nomination";

export type LeadStatus =
  | "new"
  | "contacted"
  | "converted"
  | "rejected";

export interface Lead {
  id: string;

  formType: FormType;

  status: LeadStatus;

  submittedAt: string;

  notes: string;

  fullName: string;

  jobTitle: string;

  workEmailAddress: string;

  mobileNumber: string;

  linkedInProfileUrl?: string;

  organizationCompanyName?: string;

  companyName?: string;

  companyOrganizationName?: string;

  industry?: string;

  sponsorIndustry?: string;

  brochureIndustry?: string;

  checkedIn?: boolean;

  badgeSent?: boolean;
}