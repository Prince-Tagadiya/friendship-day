import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Happy Friendship Day 💖 — A Letter Just For You',
  description: 'A handcrafted, cinematic Friendship Day experience — written with care, designed for someone special.',
  keywords: ['friendship day', 'friendship letter', 'happy friendship day'],
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Happy Friendship Day 💖',
    description: 'Something special was written just for you.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#1a0a14',
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Dancing+Script:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="vignette overflow-x-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
