# IoT Security World Summit Abu Dhabi 2026 - Website

A premium, modern conference website for the IoT Security World Summit, featuring a dark cybersecurity theme with glassmorphism effects, smooth animations, and comprehensive lead management capabilities.

## Features

### Design & UI
- **Dark Cybersecurity Theme**: Navy (#0a0e27) background with cyan (#00d4ff) and purple (#7c3aed) accents
- **Glassmorphism Effects**: Frosted glass cards with backdrop blur and glowing borders
- **Smooth Animations**: Fade-in, scale, slide, and glitch effects with stagger delays
- **Responsive Design**: Fully mobile-optimized with Tailwind CSS
- **Professional Typography**: Clean, modern font hierarchy with appropriate spacing

### Sections
1. **Navigation**: Fixed header with smooth scrolling navigation
2. **Hero Section**: Eye-catching headline with animated background gradients and CTAs
3. **About**: Conference highlights and industry focus areas
4. **Agenda**: Interactive day-by-day schedule with session details
5. **Speakers**: Carousel slider showcasing 200+ speakers
6. **Industries**: 9-industry grid covering all critical verticals
7. **Sponsors**: Tiered sponsorship packages with benefits breakdown
8. **Partner With Us**: Strategic partnership opportunities (Media, Association, Government)
9. **Contact**: Multi-field form with email notifications and Google Sheets integration
10. **Footer**: Company info, quick links, and social media

### Forms & Data Management
- **Form Types**: Delegation, Sponsorship, Partnership, Contact inquiries
- **Fields Captured**: Name, Company, Email, Phone, Interest Type, Custom Message
- **Email Notifications**: Automated emails to admin and user confirmations via Nodemailer
- **Lead Storage**: Integration-ready for Google Sheets and Excel exports
- **Validation**: Client-side validation with Zod, server-side verification

### Technical Stack
- **Framework**: Next.js 16 with App Router
- **Frontend**: React 19, Tailwind CSS 4, shadcn/ui components
- **Forms**: React Hook Form with Zod validation
- **Email**: Nodemailer (SMTP-based)
- **Icons**: Lucide React
- **Type Safety**: Full TypeScript support

## Installation & Setup

### Prerequisites
- Node.js 18+ and pnpm (or npm)
- Git

### Clone & Install
```bash
# Clone the repository
git clone <repository-url>
cd iot-summit-website

# Install dependencies
pnpm install
```

### Local Development
```bash
# Start development server
pnpm dev

# Open browser to http://localhost:3000
```

## Configuration

### Email Setup (Nodemailer)

#### Option 1: Using Environment Variables (Recommended)
Create a `.env.local` file in the project root:

```env
# SMTP Configuration
SMTP_HOST=your-smtp-host.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@company.com
SMTP_PASSWORD=your-app-password
SMTP_FROM_EMAIL="IoT Summit <noreply@iotsummit.ae>"
CONTACT_EMAIL=info@iotsummit.ae
```

**Popular SMTP Providers:**
- **Gmail**: Use App Password (enable 2FA first)
- **SendGrid**: SMTP relay service
- **AWS SES**: Email service
- **Custom Mail Server**: Your organization's email server

#### Option 2: Development/Testing
The API will automatically use Ethereal Email (test service) if SMTP credentials aren't configured. Emails will be logged to console.

### Google Sheets Integration (Optional)

To enable automatic lead storage to Google Sheets:

1. Create a Google Cloud project
2. Enable Google Sheets API
3. Create a service account and download credentials
4. Add to `.env.local`:

```env
GOOGLE_SHEETS_API_KEY=your-api-key
GOOGLE_SHEETS_ID=your-sheet-id
```

See the API route (`app/api/submit-form/route.ts`) for implementation details.

## Project Structure

```
/app
  /api
    /submit-form
      route.ts          # Form submission endpoint
  page.tsx              # Main page with all sections
  layout.tsx            # Root layout with metadata
  globals.css           # Design tokens and animations

/components
  Navbar.tsx            # Navigation bar
  HeroSection.tsx       # Hero with CTA
  AboutSection.tsx      # Conference highlights
  AgendaSection.tsx     # Session schedule
  SpeakersSection.tsx   # Speaker carousel
  IndustriesSection.tsx # Industry grid
  SponsorsSection.tsx   # Sponsorship tiers
  PartnerSection.tsx    # Partnership opportunities
  ContactSection.tsx    # Contact form
  Footer.tsx            # Footer with links

/lib
  types.ts              # TypeScript interfaces
  utils.ts              # Utility functions

/public
  # Static assets (images, icons, etc.)

```

## Customization

### Update Conference Details
Edit the following files to update event information:
- `app/layout.tsx`: Update metadata (title, description)
- `components/HeroSection.tsx`: Update headline and dates
- `components/AgendaSection.tsx`: Add actual session details and dates
- `components/SpeakersSection.tsx`: Replace speaker data
- `components/SponsorsSection.tsx`: Update sponsor packages
- `components/ContactSection.tsx`: Update contact information

### Modify Colors & Theme
Edit `/app/globals.css` CSS variables:
```css
:root {
  --background: #0a0e27;      /* Dark navy */
  --primary: #00d4ff;          /* Bright cyan */
  --secondary: #7c3aed;        /* Purple accent */
  --muted-foreground: #94a3b8; /* Gray text */
  /* ... other colors */
}
```

### Add Custom Animations
Add keyframe animations to `/app/globals.css`:
```css
@keyframes customAnimation {
  from { /* starting state */ }
  to { /* ending state */ }
}

.animate-custom {
  animation: customAnimation 0.6s ease-out forwards;
}
```

## API Routes

### POST /api/submit-form
Handles form submissions with email notifications.

**Request Body:**
```json
{
  "name": "John Doe",
  "company": "Tech Corp",
  "email": "john@example.com",
  "phone": "+971 50 XXX XXXX",
  "interestType": "sponsor",
  "message": "Optional message"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Form submitted successfully",
  "data": { /* submitted data */ }
}
```

**Email Flow:**
1. Notification email sent to admin (CONTACT_EMAIL)
2. Confirmation email sent to user
3. Optional: Data saved to Google Sheets
4. Response returned to client

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel dashboard
3. Add environment variables in Vercel Settings → Environment Variables
4. Deploy automatically

```bash
# One-time setup with Vercel CLI
npm i -g vercel
vercel
```

### Deploy to Other Platforms
- **Netlify**: Build command: `pnpm build`, Publish: `.next/out`
- **Self-hosted**: Build and run with `pnpm build && pnpm start`
- **Docker**: Create Dockerfile with Node.js base image

## Performance Optimization

- **Image Optimization**: Use Next.js Image component for responsive images
- **Code Splitting**: Components are automatically code-split
- **Caching**: Static content cached with revalidateTag
- **Animations**: GPU-accelerated CSS transforms reduce jank
- **Lazy Loading**: Sections load on demand as user scrolls

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile: iOS Safari 12+, Chrome Android

## Common Issues

### Emails Not Sending
1. Check SMTP credentials in `.env.local`
2. Verify email provider allows app connections
3. Check console for error messages in terminal

### Form Submission Errors
1. Ensure all required fields are filled
2. Check browser console for network errors
3. Verify API endpoint is accessible

### Style Issues
1. Clear Next.js cache: `rm -rf .next`
2. Rebuild CSS: `pnpm build`
3. Check Tailwind configuration in `tailwind.config.ts`

## Contributing

To contribute improvements:
1. Create a feature branch
2. Make changes
3. Test locally with `pnpm dev`
4. Submit pull request

## License

© 2026 IoT Security World Summit. All rights reserved.

## Support

For issues, questions, or feature requests:
- Email: info@iotsummit.ae
- Phone: +971 4 XXX XXXX
- Website: https://iotsummit.ae

---

Built with Next.js, React, and Tailwind CSS. Designed for premium conference experiences.
