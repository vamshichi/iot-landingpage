# Customization Guide - IoT Security Summit Website

This guide explains how to customize every aspect of the website for your needs.

## Content Customization

### Event Details

**File: `components/HeroSection.tsx`**
```tsx
// Change headline and dates
<span className="glow-text-cyan">Summit Abu Dhabi</span>
<span className="block text-cyan-400 mt-2">2026</span>

// Change subheading
Experience the premier conference connecting global leaders...

// Update registration dates
<div className="text-2xl md:text-3xl font-bold glow-text-cyan mb-2">
  March 15-17, 2026  {/* Update dates */}
</div>
```

**File: `components/AgendaSection.tsx`**
```tsx
// Add/remove days
const agenda = [
  {
    day: 'Day 1: Future of IoT Security',
    date: 'March 15, 2026',  // Update date
    sessions: [
      {
        time: '09:00 - 10:00',
        title: 'Opening Keynote',  // Update title
        speaker: 'Speaker Name',     // Update speaker
        track: 'Main Hall',           // Update location
      },
      // Add more sessions...
    ],
  },
];
```

### Speaker Management

**File: `components/SpeakersSection.tsx`**

Add/remove speakers in the `speakers` array:
```tsx
const speakers = [
  {
    name: 'Dr. Sarah Chen',
    title: 'Chief Security Officer',
    company: 'Global Tech Corp',
    bio: 'Leading IoT security strategy...',
    image: '🔐',  // Use emoji or image URL
  },
  // Add more speakers...
];
```

To use actual images:
```tsx
const speakers = [
  {
    name: 'Dr. Sarah Chen',
    bio: 'Leading IoT security strategy...',
    image: '/images/speakers/sarah-chen.jpg',  // Path to image
  },
];
```

Update component to display images:
```tsx
<img src={speaker.image} alt={speaker.name} className="w-20 h-20 rounded-lg mb-4" />
```

### Sponsorship Tiers

**File: `components/SponsorsSection.tsx`**

Update sponsorship packages:
```tsx
const sponsorTiers = {
  platinum: {
    name: 'Platinum',
    price: '$150,000',  // Update price
    benefits: [
      'Prime booth location & 1000 sqft',
      // Add/remove benefits
    ],
    companies: ['TechCorp', 'SecureNet'],  // Update companies
  },
};
```

### Industries

**File: `components/IndustriesSection.tsx`**

Add/remove industries:
```tsx
const industries = [
  {
    icon: Building2,
    title: 'Smart Cities',
    description: 'Connected urban infrastructure...',
  },
  // Add more industries
];
```

### Contact Information

**File: `components/Footer.tsx` & `components/ContactSection.tsx`**

```tsx
// Update email
<a href="mailto:info@iotsummit.ae">info@iotsummit.ae</a>

// Update phone
<span>+971 4 XXX XXXX</span>

// Update location
<span>Abu Dhabi International Convention Centre</span>
```

## Theme Customization

### Colors

**File: `app/globals.css`**

Modify the color scheme in the `:root` section:

```css
:root {
  /* Primary colors - change from cyan/blue */
  --primary: #00d4ff;           /* Change to your brand color */
  --secondary: #7c3aed;         /* Change accent color */
  
  /* Background */
  --background: #0a0e27;        /* Change to lighter/darker */
  --foreground: #e0e9ff;        /* Change text color */
  
  /* Accents */
  --accent: #00f0ff;            /* Change glow color */
  --glow-cyan: #00d4ff;         /* Change glow effects */
  --glow-purple: #7c3aed;       /* Change glow effects */
}
```

### Typography

**File: `app/layout.tsx`**

Change fonts:
```tsx
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({ subsets: ['latin'] });

// Update Tailwind config to use new fonts
```

**File: `tailwind.config.ts`**

```js
fontFamily: {
  sans: ['var(--font-inter)'],  // Body font
  serif: ['var(--font-playfair)'],  // Headings
}
```

### Animations

**File: `app/globals.css`**

Customize animation speeds and effects:

```css
/* Change animation duration */
.transition-all {
  @apply transition-all duration-500 ease-out;  /* Change from 300ms */
}

/* Adjust float distance */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);  /* Change from -10px */
  }
}

/* Speed up fade-in animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(50px);  /* Increase from 30px */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## Layout Changes

### Add New Section

1. **Create new component file** (`components/NewSection.tsx`):
```tsx
'use client';

export function NewSection() {
  return (
    <section id="new-section" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-6">
          New <span className="glow-text-cyan">Section</span>
        </h2>
        {/* Your content here */}
      </div>
    </section>
  );
}
```

2. **Import in `app/page.tsx`**:
```tsx
import { NewSection } from '@/components/NewSection';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* ... existing sections ... */}
        <NewSection />
      </main>
      <Footer />
    </>
  );
}
```

3. **Update navigation** in `components/Navbar.tsx`:
```tsx
const navItems = [
  // ... existing items ...
  { label: 'New Section', href: '#new-section' },
];
```

### Change Section Order

In `app/page.tsx`, reorder the sections:

```tsx
<main>
  <HeroSection />
  <NewSection />        {/* Moved to top */}
  <AboutSection />
  {/* ... other sections ... */}
</main>
```

## Form Customization

### Add New Form Fields

**File: `components/ContactSection.tsx`**

1. Update `formData` state:
```tsx
const [formData, setFormData] = useState({
  name: '',
  company: '',
  email: '',
  phone: '',
  interestType: 'attend',
  newField: '',  // Add new field
  message: '',
});
```

2. Add form input:
```tsx
<div>
  <label className="block text-sm font-semibold">New Field</label>
  <input
    type="text"
    name="newField"
    value={formData.newField}
    onChange={handleChange}
    className="w-full px-4 py-3 rounded-lg bg-background/50..."
  />
</div>
```

3. Update API types in `lib/types.ts`:
```ts
export interface FormSubmissionData {
  name: string;
  company: string;
  email: string;
  phone: string;
  interestType: 'attend' | 'sponsor' | 'partner' | 'speak' | 'media' | 'other';
  newField: string;  // Add new field
  message?: string;
}
```

### Update Email Templates

**File: `lib/form-utils.ts`**

Update `generateAdminEmailTemplate()` and `generateUserEmailTemplate()` to include new fields:

```tsx
export function generateAdminEmailTemplate(data: FormSubmissionData): string {
  return `
    <!-- ... existing fields ... -->
    <div class="field">
      <div class="label">New Field:</div>
      <div class="value">${escapeHtml(data.newField)}</div>
    </div>
  `;
}
```

## SEO Customization

**File: `app/layout.tsx`**

Update metadata:
```tsx
export const metadata: Metadata = {
  title: 'Your Custom Event Title',
  description: 'Your custom event description',
  openGraph: {
    title: 'Custom Title',
    description: 'Custom description',
    image: '/og-image.jpg',  // Add image
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Title',
    image: '/twitter-image.jpg',  // Add image
  },
};
```

## Advanced Customizations

### Add Google Analytics

1. Get Google Analytics ID (GA-XXXX...)
2. Add to `.env.local`:
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

3. Update `app/layout.tsx`:
```tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Add Custom Domain

1. **Vercel**: Settings → Domains → Add Domain
2. **Netlify**: Site settings → Domain management
3. Update DNS records (auto-generated)

### Add Blog Section

Create `components/BlogSection.tsx`:
```tsx
'use client';

export function BlogSection() {
  const posts = [
    {
      id: 1,
      title: 'Blog Post Title',
      excerpt: 'Short description...',
      date: 'March 15, 2026',
      author: 'Author Name',
      url: '/blog/post-1',
    },
  ];

  return (
    <section id="blog" className="py-20 bg-background">
      {/* Blog grid */}
    </section>
  );
}
```

## Performance Tips

1. **Lazy load images**: Use Next.js Image component
2. **Optimize images**: Compress before upload (tinypng.com)
3. **Reduce animations**: Disable on mobile or slow devices
4. **Code splitting**: Let Next.js handle automatically
5. **Caching**: Configure in API routes

## Troubleshooting Customizations

| Issue | Solution |
|-------|----------|
| Styles not updating | Clear cache: `rm -rf .next` then rebuild |
| Form not working | Check API endpoint in ContactSection.tsx |
| Images broken | Verify image paths, use absolute URLs |
| Animations janky | Reduce animation duration, check GPU usage |
| Mobile layout broken | Test with responsive design tools |

## Resources

- **Tailwind CSS**: https://tailwindcss.com/docs
- **Next.js**: https://nextjs.org/docs
- **React**: https://react.dev
- **Lucide Icons**: https://lucide.dev

---

Need more help? Check README.md or DEPLOYMENT.md for additional guidance.
