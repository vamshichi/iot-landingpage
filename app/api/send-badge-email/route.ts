import { NextResponse } from "next/server";

import {prisma} from "@/lib/prisma";
import { transporter } from "@/lib/mailer";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const { leadId } = body;

    if (!leadId) {
      return NextResponse.json({
        success: false,
        message: "Lead ID is required",
      });
    }

    // ─────────────────────────────────────
    // FIND LEAD
    // ─────────────────────────────────────
    const lead = await prisma.lead.findUnique({
      where: {
        id: leadId,
      },
    });

    if (!lead) {
      return NextResponse.json({
        success: false,
        message: "Lead not found",
      });
    }

    // ─────────────────────────────────────
    // COMPANY NAME
    // ─────────────────────────────────────
    const company =
      lead.companyName ||
      lead.organizationCompanyName ||
      lead.companyOrganizationName ||
      "Company";

    // ─────────────────────────────────────
    // SEND EMAIL
    // ─────────────────────────────────────
    await transporter.sendMail({

      from: `"IoT Security World Summit" <${process.env.SMTP_USER}>`,

      to: lead.workEmailAddress,

      subject: "Your Event Badge - IoT Security World Summit 2026",

      html: `
        <div style="
          font-family: Arial, sans-serif;
          background: #f4f7fb;
          padding: 40px;
        ">

          <div style="
            max-width: 600px;
            margin: auto;
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          ">

            <!-- HEADER -->
            <div style="
              background: #041220;
              color: white;
              padding: 30px;
              text-align: center;
            ">
              <h1 style="
                margin: 0;
                font-size: 28px;
              ">
                IoT Security World Summit 2026
              </h1>

              <p style="
                margin-top: 10px;
                color: #7dd3fc;
                font-size: 14px;
              ">
                Dubai • Future of Cybersecurity & IoT
              </p>
            </div>

            <!-- BODY -->
            <div style="padding: 40px;">

              <h2 style="
                margin-top: 0;
                color: #111827;
              ">
                Hello ${lead.fullName},
              </h2>

              <p style="
                color: #4b5563;
                line-height: 1.7;
                font-size: 15px;
              ">
                Your badge for the
                <strong>IoT Security World Summit 2026</strong>
                has been successfully generated.
              </p>

              <!-- BADGE CARD -->
              <div style="
                margin-top: 30px;
                border: 1px solid #e5e7eb;
                border-radius: 16px;
                padding: 30px;
                text-align: center;
                background: #f9fafb;
              ">

                <h2 style="
                  margin: 0;
                  color: #111827;
                ">
                  ${lead.fullName}
                </h2>

                <p style="
                  margin-top: 8px;
                  color: #6b7280;
                ">
                  ${lead.jobTitle}
                </p>

                <p style="
                  color: #9ca3af;
                  font-size: 14px;
                ">
                  ${company}
                </p>

                <div style="margin-top: 25px;">
                  <img
                    src="${lead.qrCode}"
                    width="180"
                    height="180"
                    alt="QR Code"
                  />
                </div>

                <div style="margin-top: 25px;">

                  <span style="
                    background: #041220;
                    color: white;
                    padding: 10px 20px;
                    border-radius: 999px;
                    font-size: 13px;
                    font-weight: bold;
                  ">
                    ${lead.badgeType || "DELEGATE"}
                  </span>

                </div>

                <p style="
                  margin-top: 20px;
                  color: #6b7280;
                  font-size: 13px;
                ">
                  Ticket ID:
                  <strong>${lead.ticketId}</strong>
                </p>

              </div>

              <!-- EVENT INFO -->
              <div style="
                margin-top: 35px;
                background: #eff6ff;
                border-radius: 14px;
                padding: 20px;
              ">

                <h3 style="
                  margin-top: 0;
                  color: #0f172a;
                ">
                  Event Information
                </h3>

                <p style="
                  margin: 8px 0;
                  color: #334155;
                ">
                  📍 Dubai, UAE
                </p>

                <p style="
                  margin: 8px 0;
                  color: #334155;
                ">
                  📅 2026
                </p>

                <p style="
                  margin: 8px 0;
                  color: #334155;
                ">
                  🎟 Please show this QR code during check-in
                </p>

              </div>

              <!-- FOOTER -->
              <div style="
                margin-top: 40px;
                text-align: center;
              ">

                <p style="
                  color: #6b7280;
                  font-size: 14px;
                ">
                  We look forward to welcoming you at the summit.
                </p>

                <p style="
                  margin-top: 30px;
                  color: #9ca3af;
                  font-size: 12px;
                ">
                  © 2026 IoT Security World Summit
                </p>

              </div>

            </div>

          </div>

        </div>
      `,
    });

    await prisma.lead.update({
  where: {
    id: lead.id,
  },
  data: {
    badgeSent: true,
  },
});

    // ─────────────────────────────────────
    // SUCCESS RESPONSE
    // ─────────────────────────────────────
    return NextResponse.json({
      success: true,
      message: "Badge email sent successfully",
    });

  } catch (error) {

    console.error("SEND BADGE EMAIL ERROR:", error);

    return NextResponse.json({
      success: false,
      message: "Failed to send badge email",
    });
  }
}