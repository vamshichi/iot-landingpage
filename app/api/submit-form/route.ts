import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";
import { FormType } from "@prisma/client";

/* ─── SMTP ─────────────────────────────────────────────────── */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

const ADMIN_EMAILS = ["info@confexmeet.com", "ramesh.confexmeet@gmail.com"];
const FROM_ADDRESS = `"IoT Security World Summit" <${process.env.SMTP_USER}>`;

/* ─── Email helpers (unchanged) ────────────────────────────── */
function buildTableRows(data: Record<string, unknown>): string {
  return Object.entries(data)
    .filter(
      ([, v]) =>
        v !== undefined && v !== null && v !== "" && !(Array.isArray(v) && v.length === 0)
    )
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

function clientEmail(name: string, formType: string): string {
  const titles: Record<string, string> = {
    delegate: "Delegate Registration",
    sponsor: "Sponsorship Enquiry",
    brochure: "Brochure Request",
  };
  return `
  <!DOCTYPE html><html lang="en">
  <head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
  <body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:32px 0;">
      <tr><td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;
               overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);max-width:600px;">
          <tr>
            <td style="background:linear-gradient(135deg,#0a2540 0%,#0e3d6e 100%);padding:36px 40px;text-align:center;">
              <p style="margin:0 0 8px;color:#38bdf8;font-size:12px;letter-spacing:3px;
                        text-transform:uppercase;font-weight:600;">IoT Security World Summit</p>
              <h1 style="margin:0;color:#fff;font-size:26px;font-weight:700;">Abu Dhabi 2026</h1>
              <div style="margin-top:16px;height:2px;background:linear-gradient(90deg,transparent,#38bdf8,transparent);"></div>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 40px;">
              <h2 style="margin:0 0 8px;color:#0a2540;font-size:20px;">Thank you, ${name}! 🎉</h2>
              <p style="margin:0 0 20px;color:#555;font-size:15px;line-height:1.6;">
                We have received your <strong>${titles[formType] ?? "submission"}</strong> and our team will get back to you shortly.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0"
                     style="background:#f0f9ff;border-left:4px solid #38bdf8;border-radius:6px;margin-bottom:24px;">
                <tr>
                  <td style="padding:18px 20px;">
                    <p style="margin:0 0 6px;color:#0369a1;font-weight:700;font-size:14px;">What happens next?</p>
                    <ul style="margin:0;padding-left:18px;color:#444;font-size:14px;line-height:1.8;">
                      <li>Our team will review your submission within <strong>1–2 business days</strong>.</li>
                      <li>You will receive a follow-up email with next steps.</li>
                      <li>For urgent queries, email us at
                          <a href="mailto:info@confexmeet.com" style="color:#0369a1;">info@confexmeet.com</a>.</li>
                    </ul>
                  </td>
                </tr>
              </table>
              <p style="margin:0;color:#555;font-size:14px;line-height:1.6;">We look forward to welcoming you at the summit.</p>
            </td>
          </tr>
          <tr>
            <td style="background:#0a2540;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 4px;color:#94a3b8;font-size:12px;">IoT Security World Summit · Abu Dhabi 2026</p>
              <p style="margin:0;color:#64748b;font-size:11px;">© 2026 Confex Meet. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td></tr>
    </table>
  </body></html>`;
}

function adminEmail(formType: string, tableRows: string): string {
  const labels: Record<string, string> = {
    delegate: "New Delegate Registration",
    sponsor: "New Sponsorship Enquiry",
    brochure: "New Brochure Request",
  };
  return `
  <!DOCTYPE html><html lang="en">
  <head><meta charset="UTF-8"/></head>
  <body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:32px 0;">
      <tr><td align="center">
        <table width="640" cellpadding="0" cellspacing="0"
               style="background:#fff;border-radius:12px;overflow:hidden;
                      box-shadow:0 4px 24px rgba(0,0,0,0.08);max-width:640px;">
          <tr>
            <td style="background:#0a2540;padding:24px 32px;">
              <p style="margin:0 0 4px;color:#38bdf8;font-size:11px;letter-spacing:2px;text-transform:uppercase;">
                IoT Security World Summit 2026
              </p>
              <h1 style="margin:0;color:#fff;font-size:20px;">${labels[formType] ?? "New Submission"}</h1>
              <p style="margin:6px 0 0;color:#94a3b8;font-size:12px;">
                Received: ${new Date().toLocaleString("en-AE", { timeZone: "Asia/Dubai" })} (GST)
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
                ${tableRows}
              </table>
            </td>
          </tr>
          <tr>
            <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:16px 32px;text-align:center;">
              <p style="margin:0;color:#94a3b8;font-size:11px;">
                This is an automated notification from the IoT Security World Summit website.
              </p>
            </td>
          </tr>
        </table>
      </td></tr>
    </table>
  </body></html>`;
}

/* ─── Subjects ──────────────────────────────────────────────── */
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

/* ─── Field mappers ─────────────────────────────────────────── */
function mapDelegateFields(data: Record<string, unknown>) {
  return {
    organizationCompanyName: (data.organizationCompanyName as string) || null,
    industry:                (data.industry                as string) || null,
    keyAreasOfInterest:      (data.keyAreasOfInterest      as string[]) || [],
    lookingToAchieve:        (data.lookingToAchieve        as string[]) || [],
    galaDinner:              (data.galaDinner              as string[]) || [],
    delegateConsent:         (data.consent                 as string[]) || [],
  };
}

function mapSponsorFields(data: Record<string, unknown>) {
  return {
    companyName:          (data.companyName          as string) || null,
    websiteUrl:           (data.websiteUrl           as string) || null,
    sponsorIndustry:      (data.industry             as string) || null,
    headquartersLocation: (data.headquartersLocation as string) || null,
    companySize:          (data.companySize          as string) || null,
    keyObjectives:        (data.keyObjectives        as string[]) || [],
    targetAudience:       (data.targetAudience       as string[]) || [],
    sponsorshipCategory:  (data.sponsorshipCategory  as string[]) || [],
    addOns:               (data.addOns               as string[]) || [],
    activationPlans:      (data.activationPlans      as string[]) || [],
    customRequests:       (data.customRequests       as string) || null,
    scheduledMeetings:    (data.scheduledMeetings    as string[]) || [],
    vipDinner:            (data.vipDinner            as string[]) || [],
    sponsorConsent:       (data.consent              as string[]) || [],
  };
}

function mapBrochureFields(data: Record<string, unknown>) {
  return {
    companyOrganizationName: (data.companyOrganizationName as string) || null,
    brochureIndustry:        (data.industry                as string) || null,
    brochureCompanySize:     (data.companySize             as string) || null,
    countryRegion:           (data.countryRegion           as string) || null,
    interestedIn:            (data.interestedIn            as string[]) || [],
    brochureConsent:         (data.consent                 as string[]) || [],
  };
}

/* ─── Route handler ─────────────────────────────────────────── */
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

    /* ── 1. Build shared contact fields ── */
    const contactFields = {
      fullName:          (data.fullName         as string) ?? "",
      jobTitle:          (data.jobTitle         as string) ?? "",
      workEmailAddress:  (data.workEmailAddress as string) ?? "",
      mobileNumber:      (data.mobileNumber     as string) ?? "",
      linkedInProfileUrl:(data.linkedInProfileUrl as string) || null,
    };

    /* ── 2. Build type-specific fields ── */
    const specificFields =
      formType === "delegate" ? mapDelegateFields(data)
      : formType === "sponsor" ? mapSponsorFields(data)
      : mapBrochureFields(data);

    /* ── 3. Save to MongoDB via Prisma ── */
    const lead = await prisma.lead.create({
      data: {
        formType: formType as FormType,
        status: "new",
        submittedAt: new Date(),
        ...contactFields,
        ...specificFields,
      },
    });

    /* ── 4. Send emails ── */
    const clientName = (data.fullName as string) || "Valued Guest";
    const clientEmailAddress = (data.workEmailAddress as string) || "";
    const tableRows = buildTableRows(data);

    if (clientEmailAddress) {
      await transporter.sendMail({
        from: FROM_ADDRESS,
        to: clientEmailAddress,
        subject: subjects.client,
        html: clientEmail(clientName, formType),
      });
    }

    await transporter.sendMail({
      from: FROM_ADDRESS,
      to: ADMIN_EMAILS.join(", "),
      subject: subjects.admin,
      html: adminEmail(formType, tableRows),
      replyTo: clientEmailAddress || undefined,
    });

    return NextResponse.json({ success: true, leadId: lead.id });
  } catch (error) {
    console.error("Submit error:", error);
    return NextResponse.json(
      { error: "Failed to process submission. Please try again." },
      { status: 500 }
    );
  }
}