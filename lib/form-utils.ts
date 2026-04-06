import { FormSubmissionData } from './types';

/**
 * Validates email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates phone number (basic validation)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 7;
}

/**
 * Formats interest type for display
 */
export function formatInterestType(type: FormSubmissionData['interestType']): string {
  const typeMap: Record<string, string> = {
    attend: 'Attending Conference',
    sponsor: 'Sponsorship Inquiry',
    partner: 'Partnership Opportunity',
    speak: 'Speaking Opportunity',
    media: 'Media Inquiry',
    other: 'Other Inquiry',
  };
  return typeMap[type] || type;
}

/**
 * Sanitizes form data to prevent XSS
 */
export function sanitizeFormData(data: FormSubmissionData): FormSubmissionData {
  return {
    name: data.name.trim().substring(0, 200),
    company: data.company.trim().substring(0, 200),
    email: data.email.trim().toLowerCase().substring(0, 254),
    phone: data.phone.trim().substring(0, 20),
    interestType: data.interestType,
    message: data.message ? data.message.trim().substring(0, 5000) : undefined,
  };
}

/**
 * Generates email template for admin notification
 */
export function generateAdminEmailTemplate(data: FormSubmissionData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f5f5f5; padding: 20px; }
          .field { margin: 15px 0; }
          .label { font-weight: bold; color: #0a0e27; }
          .value { color: #333; margin-top: 5px; }
          .footer { background: #0a0e27; color: #e0e9ff; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
          .badge { display: inline-block; background: #00d4ff; color: #0a0e27; padding: 5px 10px; border-radius: 20px; font-size: 12px; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Form Submission - IoT Summit</h1>
            <p>New inquiry from ${data.name}</p>
          </div>
          <div class="content">
            <div class="field">
              <span class="badge">${formatInterestType(data.interestType)}</span>
            </div>
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${escapeHtml(data.name)}</div>
            </div>
            <div class="field">
              <div class="label">Company:</div>
              <div class="value">${escapeHtml(data.company)}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
            </div>
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value"><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></div>
            </div>
            ${data.message ? `
            <div class="field">
              <div class="label">Message:</div>
              <div class="value">${escapeHtml(data.message)}</div>
            </div>
            ` : ''}
          </div>
          <div class="footer">
            <p>IoT Security World Summit Abu Dhabi 2026</p>
            <p>This is an automated email. Please reply directly to the contact provided above.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Generates email template for user confirmation
 */
export function generateUserEmailTemplate(data: FormSubmissionData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f5f5f5; padding: 20px; }
          .cta-button { display: inline-block; background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 15px 0; font-weight: bold; }
          .footer { background: #0a0e27; color: #e0e9ff; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Your Interest</h1>
            <p>IoT Security World Summit Abu Dhabi 2026</p>
          </div>
          <div class="content">
            <h2>Dear ${escapeHtml(data.name)},</h2>
            <p>Thank you for reaching out to the IoT Security World Summit Abu Dhabi 2026. We have received your inquiry and appreciate your interest in our conference.</p>
            
            <h3>Your Submission Details:</h3>
            <ul>
              <li><strong>Type:</strong> ${formatInterestType(data.interestType)}</li>
              <li><strong>Company:</strong> ${escapeHtml(data.company)}</li>
              <li><strong>Email:</strong> ${escapeHtml(data.email)}</li>
            </ul>
            
            <p>Our team will review your inquiry and will be in touch with you within 24 business hours. If you have any urgent questions, please don't hesitate to call us directly.</p>
            
            <p style="text-align: center;">
              <a href="https://iotsummit.ae" class="cta-button">Visit Our Website</a>
            </p>
            
            <h3>Quick Links:</h3>
            <ul>
              <li><a href="https://iotsummit.ae#agenda">View Agenda</a></li>
              <li><a href="https://iotsummit.ae#speakers">See Speakers</a></li>
              <li><a href="https://iotsummit.ae#sponsors">Sponsorship Opportunities</a></li>
            </ul>
            
            <p>Best regards,<br/><strong>IoT Security World Summit Team</strong></p>
          </div>
          <div class="footer">
            <p>IoT Security World Summit Abu Dhabi 2026</p>
            <p>March 15-17, 2026 | Abu Dhabi International Convention Centre</p>
            <p><a href="mailto:info@iotsummit.ae" style="color: #00d4ff; text-decoration: none;">info@iotsummit.ae</a> | +971 4 XXX XXXX</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Escapes HTML special characters to prevent XSS
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Logs form submission for analytics
 */
export function logFormSubmission(data: FormSubmissionData): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_submission', {
      interest_type: data.interestType,
      company: data.company,
      event_category: 'engagement',
      event_label: 'Contact Form',
    });
  }
}
