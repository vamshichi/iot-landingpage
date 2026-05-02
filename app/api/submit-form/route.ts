import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { connectDB } from "@/lib/mongodb";
import { Lead } from "@/models/Lead";

/* ─────────────────────────────────────────────────────────────
   SMTP TRANSPORTER — set these in your .env.local file
   SMTP_HOST=mail.confexmeet.com
   SMTP_PORT=465
   SMTP_USER=info@confexmeet.com
   SMTP_PASS=your_password_here
───────────────────────────────────────────────────────────── */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/* ─────────────────────────────────────────────────────────────
   ADMIN RECIPIENTS
───────────────────────────────────────────────────────────── */
const ADMIN_EMAILS = ["info@confexmeet.com", "ramesh.confexmeet@gmail.com"];
const FROM_ADDRESS = `"IoT Security World Summit" <${process.env.SMTP_USER}>`;

/* ─────────────────────────────────────────────────────────────
   HELPER — render a clean HTML table from form data
───────────────────────────────────────────────────────────── */
function buildTableRows(data: Record<string, unknown>): string {
  return Object.entries(data)
    .filter(([, v]) => v !== undefined && v !== null && v !== "" && !(Array.isArray(v) && v.length === 0))
    .map(([key, value]) => {
      const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
      const display = Array.isArray(value) ? (value as string[]).join(", ") : String(value);
      return `
        <tr>
          <td style="padding:8px 12px;background:#f0f7ff;font-weight:600;color:#1a3a5c;
                     border:1px solid #d0e4f7;width:38%;vertical-align:top;white-space:nowrap;">
            ${label}
          </td>
          <td style="padding:8px 12px;border:1px solid #d0e4f7;color:#333;">
            ${display}
          </td>
        </tr>`;
    })
    .join("");
}

/* ─────────────────────────────────────────────────────────────
   THANK-YOU EMAIL to the client
───────────────────────────────────────────────────────────── */
function clientEmail(name: string, formType: string): string {
  const titles: Record<string, string> = {
    delegate: "Delegate Registration",
    sponsor: "Sponsorship Enquiry",
    brochure: "Brochure Request",
  };

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
  <body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:32px 0;">
      <tr><td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;
               overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);max-width:600px;">
          <tr>
            <td style="background:linear-gradient(135deg,#0a2540 0%,#0e3d6e 100%);padding:36px 40px;text-align:center;">
              <p style="margin:0 0 8px;color:#38bdf8;font-size:12px;letter-spacing:3px;
                        text-transform:uppercase;font-weight:600;">
                IoT Security World Summit
              </p>
              <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;">
                Abu Dhabi 2026
              </h1>
              <div style="margin-top:16px;height:2px;background:linear-gradient(90deg,transparent,#38bdf8,transparent);"></div>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 40px;">
              <h2 style="margin:0 0 8px;color:#0a2540;font-size:20px;">
                Thank you, ${name}! 🎉
              </h2>
              <p style="margin:0 0 20px;color:#555;font-size:15px;line-height:1.6;">
                We have received your <strong>${titles[formType] ?? "submission"}</strong> and
                our team will get back to you shortly.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0"
                     style="background:#f0f9ff;border-left:4px solid #38bdf8;border-radius:6px;
                            margin-bottom:24px;">
                <tr>
                  <td style="padding:18px 20px;">
                    <p style="margin:0 0 6px;color:#0369a1;font-weight:700;font-size:14px;">
                      What happens next?
                    </p>
                    <ul style="margin:0;padding-left:18px;color:#444;font-size:14px;line-height:1.8;">
                      <li>Our team will review your submission within <strong>1–2 business days</strong>.</li>
                      <li>You will receive a follow-up email with next steps.</li>
                      <li>For urgent queries, email us at
                          <a href="mailto:info@confexmeet.com" style="color:#0369a1;">info@confexmeet.com</a>.
                      </li>
                    </ul>
                  </td>
                </tr>
              </table>
              <p style="margin:0;color:#555;font-size:14px;line-height:1.6;">
                We look forward to welcoming you at the summit.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background:#0a2540;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 4px;color:#94a3b8;font-size:12px;">
                IoT Security World Summit · Abu Dhabi 2026
              </p>
              <p style="margin:0;color:#64748b;font-size:11px;">
                © 2026 Confex Meet. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td></tr>
    </table>
  </body>
  </html>`;
}

/* ─────────────────────────────────────────────────────────────
   ADMIN NOTIFICATION EMAIL
───────────────────────────────────────────────────────────── */
function adminEmail(
  formType: string,
  data: Record<string, unknown>,
  tableRows: string
): string {
  const labels: Record<string, string> = {
    delegate: "New Delegate Registration",
    sponsor: "New Sponsorship Enquiry",
    brochure: "New Brochure Request",
  };

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head><meta charset="UTF-8"/></head>
  <body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:32px 0;">
      <tr><td align="center">
        <table width="640" cellpadding="0" cellspacing="0"
               style="background:#fff;border-radius:12px;overflow:hidden;
                      box-shadow:0 4px 24px rgba(0,0,0,0.08);max-width:640px;">
          <tr>
            <td style="background:#0a2540;padding:24px 32px;">
              <p style="margin:0 0 4px;color:#38bdf8;font-size:11px;letter-spacing:2px;
                        text-transform:uppercase;">IoT Security World Summit 2026</p>
              <h1 style="margin:0;color:#fff;font-size:20px;">${labels[formType] ?? "New Submission"}</h1>
              <p style="margin:6px 0 0;color:#94a3b8;font-size:12px;">
                Received: ${new Date().toLocaleString("en-AE", { timeZone: "Asia/Dubai" })} (GST)
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0"
                     style="border-collapse:collapse;font-size:14px;">
                ${tableRows}
              </table>
            </td>
          </tr>
          <tr>
            <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:16px 32px;
                       text-align:center;">
              <p style="margin:0;color:#94a3b8;font-size:11px;">
                This is an automated notification from the IoT Security World Summit website.
              </p>
            </td>
          </tr>
        </table>
      </td></tr>
    </table>
  </body>
  </html>`;
}

/* ─────────────────────────────────────────────────────────────
   SUBJECTS
───────────────────────────────────────────────────────────── */
const SUBJECT_MAP: Record<string, { client: string; admin: string }> = {
  delegate: {
    client: "Your Registration is Confirmed – IoT Security World Summit Abu Dhabi 2026",
    admin: "🔔 New Delegate Registration – IoT Security Summit 2026",
  },
  sponsor: {
    client: "Sponsorship Enquiry Received – IoT Security World Summit Abu Dhabi 2026",
    admin: "🔔 New Sponsorship Enquiry – IoT Security Summit 2026",
  },
  brochure: {
    client: "Your Brochure Request – IoT Security World Summit Abu Dhabi 2026",
    admin: "🔔 New Brochure Request – IoT Security Summit 2026",
  },
};

/* ─────────────────────────────────────────────────────────────
   FIELD MAPPERS — one per form type
   Maps the raw POST body → Lead schema fields exactly.
   No field from the form or the schema is omitted.
───────────────────────────────────────────────────────────── */

function mapDelegateFields(data: Record<string, unknown>) {
  return {
    // Personal / contact
    fullName:               (data.fullName             as string) ?? "",
    jobTitle:               (data.jobTitle             as string) ?? "",
    workEmailAddress:       (data.workEmailAddress     as string) ?? "",
    mobileNumber:           (data.mobileNumber         as string) ?? "",
    linkedInProfileUrl:     (data.linkedInProfileUrl   as string) || undefined,

    // Delegate-specific
    organizationCompanyName: (data.organizationCompanyName as string) || undefined,
    industry:                (data.industry                as string) || undefined,
    keyAreasOfInterest:      (data.keyAreasOfInterest      as string[]) || [],
    lookingToAchieve:        (data.lookingToAchieve        as string[]) || [],
    galaDinner:              (data.galaDinner              as string[]) || [],
    delegateConsent:         (data.consent                 as string[]) || [],
  };
}

function mapSponsorFields(data: Record<string, unknown>) {
  return {
    // Personal / contact
    fullName:               (data.fullName             as string) ?? "",
    jobTitle:               (data.jobTitle             as string) ?? "",
    workEmailAddress:       (data.workEmailAddress     as string) ?? "",
    mobileNumber:           (data.mobileNumber         as string) ?? "",
    linkedInProfileUrl:     (data.linkedInProfileUrl   as string) || undefined,

    // Sponsor company info
    companyName:            (data.companyName          as string) || undefined,
    websiteUrl:             (data.websiteUrl           as string) || undefined,
    sponsorIndustry:        (data.industry             as string) || undefined,
    headquartersLocation:   (data.headquartersLocation as string) || undefined,
    companySize:            (data.companySize          as string) || undefined,

    // Sponsor objectives & preferences
    keyObjectives:          (data.keyObjectives        as string[]) || [],
    targetAudience:         (data.targetAudience       as string[]) || [],
    sponsorshipCategory:    (data.sponsorshipCategory  as string[]) || [],
    addOns:                 (data.addOns               as string[]) || [],
    activationPlans:        (data.activationPlans      as string[]) || [],
    customRequests:         (data.customRequests       as string) || undefined,

    // Meeting & networking
    scheduledMeetings:      (data.scheduledMeetings    as string[]) || [],
    vipDinner:              (data.vipDinner            as string[]) || [],

    // Consent
    sponsorConsent:         (data.consent              as string[]) || [],
  };
}

function mapBrochureFields(data: Record<string, unknown>) {
  return {
    // Personal / contact
    fullName:               (data.fullName             as string) ?? "",
    jobTitle:               (data.jobTitle             as string) ?? "",
    workEmailAddress:       (data.workEmailAddress     as string) ?? "",
    mobileNumber:           (data.mobileNumber         as string) ?? "",

    // Brochure-specific
    companyOrganizationName: (data.companyOrganizationName as string) || undefined,
    brochureIndustry:        (data.industry                as string) || undefined,
    brochureCompanySize:     (data.companySize             as string) || undefined,
    countryRegion:           (data.countryRegion           as string) || undefined,
    interestedIn:            (data.interestedIn            as string[]) || [],
    brochureConsent:         (data.consent                 as string[]) || [],
  };
}

/* ─────────────────────────────────────────────────────────────
   ROUTE HANDLER
───────────────────────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      formType: "delegate" | "sponsor" | "brochure";
      data: Record<string, unknown>;
    };

    const { formType, data } = body;

    if (!formType || !data) {
      return NextResponse.json({ error: "Missing formType or data." }, { status: 400 });
    }

    const subjects = SUBJECT_MAP[formType];
    if (!subjects) {
      return NextResponse.json({ error: "Unknown formType." }, { status: 400 });
    }

    /* ── 1. MAP fields to Lead schema ── */
    let mappedFields: Record<string, unknown>;

    if (formType === "delegate") {
      mappedFields = mapDelegateFields(data);
    } else if (formType === "sponsor") {
      mappedFields = mapSponsorFields(data);
    } else {
      mappedFields = mapBrochureFields(data);
    }

    /* ── 2. SAVE to MongoDB ── */
    await connectDB();

    const lead = new Lead({
      formType,
      status: "new",
      submittedAt: new Date(),
      notes: "",
      ...mappedFields,
    });

    await lead.save();

    /* ── 3. SEND EMAILS ── */
    const clientName =
      (data.fullName as string) ||
      (data.name as string) ||
      "Valued Guest";

    const clientEmailAddress =
      (data.workEmailAddress as string) ||
      (data.email as string) ||
      "";

    const tableRows = buildTableRows(data);

    // Thank-you → client
    if (clientEmailAddress) {
      await transporter.sendMail({
        from: FROM_ADDRESS,
        to: clientEmailAddress,
        subject: subjects.client,
        html: clientEmail(clientName, formType),
      });
    }

    // Notification → admins
    await transporter.sendMail({
      from: FROM_ADDRESS,
      to: ADMIN_EMAILS.join(", "),
      subject: subjects.admin,
      html: adminEmail(formType, data, tableRows),
      replyTo: clientEmailAddress || undefined,
    });

    return NextResponse.json({ success: true, leadId: lead._id });
  } catch (error) {
    console.error("Submit error:", error);
    return NextResponse.json(
      { error: "Failed to process submission. Please try again." },
      { status: 500 }
    );
  }
}