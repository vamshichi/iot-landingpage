export type FormType = "delegate" | "sponsor" | "brochure" | "nomination";
export type LeadStatus = "new" | "contacted" | "converted" | "rejected";

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
  // delegate
  organizationCompanyName?: string;
  industry?: string;
  keyAreasOfInterest?: string[];
  lookingToAchieve?: string[];
  galaDinner?: string[];
  // sponsor
  companyName?: string;
  websiteUrl?: string;
  sponsorIndustry?: string;
  headquartersLocation?: string;
  companySize?: string;
  keyObjectives?: string[];
  targetAudience?: string[];
  sponsorshipCategory?: string[];
  addOns?: string[];
  activationPlans?: string[];
  customRequests?: string;
  scheduledMeetings?: string[];
  vipDinner?: string[];
  // brochure
  companyOrganizationName?: string;
  brochureIndustry?: string;
  brochureCompanySize?: string;
  countryRegion?: string;
  interestedIn?: string[];
  // nomination
  nomineeName?: string;
  nomineeTitle?: string;
  nomineeCompany?: string;
  achievementSummary?: string;
  innovation?: string;
  impact?: string;
  // badge / check-in
  ticketId?: string;
  qrCode?: string;
  badgeType?: string;
  checkedIn?: boolean;
  checkedInAt?: string;
  checkInBy?: string;
  badgeSent?: boolean;
}

export interface Stats {
  total: number;
  byType: Record<string, number>;
  byStatus: Record<string, number>;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}