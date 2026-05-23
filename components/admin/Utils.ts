import { Lead } from "@/types/lead";

const COLS: (keyof Lead)[] = [
  "formType", "status", "submittedAt", "fullName", "jobTitle",
  "workEmailAddress", "mobileNumber", "organizationCompanyName",
  "companyName", "companyOrganizationName", "industry", "sponsorIndustry",
  "brochureIndustry", "headquartersLocation", "countryRegion", "companySize",
  "brochureCompanySize", "websiteUrl", "linkedInProfileUrl",
  "keyAreasOfInterest", "lookingToAchieve", "keyObjectives", "targetAudience",
  "sponsorshipCategory", "addOns", "interestedIn", "customRequests", "notes",
];

export function exportCSV(leads: Lead[]) {
  const header = COLS.join(",");
  const rows = leads.map((l) =>
    COLS.map((c) => {
      const val = l[c];
      if (Array.isArray(val)) return `"${val.join("; ")}"`;
      if (typeof val === "string" && val.includes(",")) return `"${val}"`;
      return val ?? "";
    }).join(",")
  );
  const csv = [header, ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `leads_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}