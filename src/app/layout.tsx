
import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import { AnimatedBackground } from '@/components/layout/AnimatedBackground';
import './globals.css';

export const metadata: Metadata = {
  title: 'Born2bBeautiful',
  description: 'Your destination for beauty and style.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning={true}>
        <AnimatedBackground />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
