import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { FormSubmissionData } from '@/lib/types';
import { sanitizeFormData, generateAdminEmailTemplate, generateUserEmailTemplate } from '@/lib/form-utils';

// Create email transporter (configure with your email service)
// For development/testing, you can use nodemailer's test account
// For production, configure with your actual SMTP credentials via env vars
async function getTransporter() {
  // Check if using environment variables for SMTP
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  // Fallback to test account (Ethereal - for development)
  console.warn(
    'SMTP credentials not configured. Using Ethereal test account. Set SMTP_HOST, SMTP_USER, SMTP_PASSWORD env vars for production.'
  );

  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
}

// Send email notification
async function sendEmail(data: FormSubmissionData) {
  try {
    const transporter = await getTransporter();

    // Email to admin/contact inbox
    const adminMailOptions = {
      from: process.env.SMTP_FROM_EMAIL || '"IoT Summit" <noreply@iotsummit.ae>',
      to: process.env.CONTACT_EMAIL || 'info@iotsummit.ae',
      subject: `New Inquiry from ${data.name} - ${data.interestType}`,
      html: generateAdminEmailTemplate(data),
    };

    // Confirmation email to user
    const userMailOptions = {
      from: process.env.SMTP_FROM_EMAIL || '"IoT Summit" <noreply@iotsummit.ae>',
      to: data.email,
      subject: 'IoT Security World Summit - We Received Your Inquiry',
      html: generateUserEmailTemplate(data),
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    console.log('Emails sent successfully');
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

// Add to Google Sheets (optional - requires Google Sheets API setup)
async function addToGoogleSheets(data: FormSubmissionData) {
  try {
    if (!process.env.GOOGLE_SHEETS_API_KEY || !process.env.GOOGLE_SHEETS_ID) {
      console.log('Google Sheets credentials not configured, skipping');
      return { success: true };
    }

    // Implementation would go here
    // This requires setting up Google Sheets API with appropriate authentication
    // For now, we'll log that this feature is available but not configured
    console.log('Google Sheets integration available but not configured');

    return { success: true };
  } catch (error) {
    console.error('Error adding to Google Sheets:', error);
    // Don't throw - this is optional, email is primary
    return { success: false, error: 'Google Sheets sync failed' };
  }
}

export async function POST(request: NextRequest) {
  try {
    let data: FormSubmissionData = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.company || !data.phone) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Sanitize data to prevent XSS and SQL injection
    data = sanitizeFormData(data);

    // Send email
    await sendEmail(data);

    // Attempt to add to Google Sheets (non-blocking)
    addToGoogleSheets(data).catch(console.error);

    return NextResponse.json(
      {
        success: true,
        message: 'Form submitted successfully. We will be in touch soon.',
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit form. Please try again.' },
      { status: 500 }
    );
  }
}

export const config = {
  runtime: 'nodejs',
};
