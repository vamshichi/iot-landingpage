import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'IoT Security World Summit Abu Dhabi 2026',
  description: 'Join the most important cybersecurity and IoT infrastructure conference in the Middle East. Connect with global leaders, innovative solutions, and the future of secure IoT ecosystems.',
  generator: 'vamshi',
  icons: {
    icon: [
      {
        url: '/iotlogo.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/iotlogo.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/iotlogo.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/iotlogo.png',
  },
  openGraph: {
    title: 'IoT Security World Summit Abu Dhabi 2026',
    description: 'Premier cybersecurity and IoT infrastructure conference',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IoT Security World Summit Abu Dhabi 2026',
    description: 'Premier cybersecurity and IoT infrastructure conference',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
