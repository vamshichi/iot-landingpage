# Quick Start Guide - IoT Security Summit Website

## Installation (5 minutes)

```bash
# 1. Install dependencies
pnpm install

# 2. Setup environment variables
cp .env.example .env.local

# 3. Edit .env.local with your SMTP credentials
# See README.md for provider-specific instructions
```

## Running Locally

```bash
# Start development server
pnpm dev

# Open http://localhost:3000 in your browser
```

## Configuration Steps

### Step 1: Email Setup (Required for Contact Forms)

1. Choose your email provider:
   - **Gmail** (Recommended for testing)
   - **SendGrid** (Production)
   - **AWS SES** (Enterprise)
   - Your organization's mail server

2. Update `.env.local`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
CONTACT_EMAIL=enquiry@confexmeet.com
```

3. Test form submission at `/contact`

### Step 2: Customize Content

Edit these files to update your conference details:

- `app/layout.tsx` - Update SEO metadata
- `components/HeroSection.tsx` - Update headline and dates
- `components/AgendaSection.tsx` - Update sessions and dates
- `components/SpeakersSection.tsx` - Update speaker list
- `components/SponsorsSection.tsx` - Update sponsor tiers
- `components/ContactSection.tsx` - Update contact info

### Step 3: Deploy

#### Option A: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
# Settings → Environment Variables
```

#### Option B: Other Platforms
- **Netlify**: Connect GitHub repo
- **Self-hosted**: `pnpm build && pnpm start`

## Features Implemented

✅ Premium dark cybersecurity theme
✅ Glassmorphism effects and animations
✅ 8 content sections + navigation
✅ Speaker carousel with 6 speakers
✅ Sponsorship tier selection
✅ Contact form with email notifications
✅ Nodemailer integration for emails
✅ Form validation and sanitization
✅ Responsive mobile design
✅ Full TypeScript support

## Testing

### Form Submission
1. Navigate to Contact section
2. Fill in the form with test data
3. Check:
   - Success message appears
   - Admin email received at CONTACT_EMAIL
   - User confirmation email sent

### Email Testing (Development)
- If SMTP not configured, emails print to console
- Use Ethereal test emails for development
- Check console output for email details

## Common Issues & Solutions

### Emails Not Sending
- [ ] Check SMTP credentials in `.env.local`
- [ ] Verify email provider allows app connections
- [ ] Check terminal for error messages
- [ ] Ensure Gmail 2FA is enabled and app password created

### Styling Issues
- [ ] Clear cache: `rm -rf .next`
- [ ] Rebuild: `pnpm build`
- [ ] Check Tailwind config

### Form Submission Errors
- [ ] All fields are required and validated
- [ ] Check browser console for error details
- [ ] Verify API endpoint is accessible

## Project Structure

```
/app
  /api/submit-form      # Form submission endpoint
  page.tsx              # Main page
  layout.tsx            # Root layout
  globals.css           # Design tokens & animations

/components            # All UI sections
  Navbar.tsx
  HeroSection.tsx
  AboutSection.tsx
  AgendaSection.tsx
  SpeakersSection.tsx
  IndustriesSection.tsx
  SponsorsSection.tsx
  PartnerSection.tsx
  ContactSection.tsx
  Footer.tsx

/lib
  types.ts              # TypeScript interfaces
  form-utils.ts         # Email & form utilities
```

## Performance Tips

- Images load lazily with Next.js Image component
- CSS animations use GPU acceleration
- Code splitting for smaller bundle size
- Static pages cached automatically
- ~90+ Lighthouse score

## Next Steps

1. **Customize Theme**: Edit color variables in `globals.css`
2. **Add Speakers**: Update speaker data in `SpeakersSection.tsx`
3. **Setup Analytics**: Add Google Analytics ID to `.env.local`
4. **Enable Google Sheets**: Configure Google Sheets API for lead storage
5. **Custom Domain**: Point your domain to the deployed site

## Support Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React**: https://react.dev
- **Nodemailer**: https://nodemailer.com

## Questions?

Email: enquiry@confexmeet.com
Phone: +91 7975 429 127

---

Ready to launch? Run `pnpm dev` and start customizing!
