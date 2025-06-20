
import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import { AnimatedBackground } from '@/components/layout/AnimatedBackground';
import './globals.css';
import { Pacifico, Montserrat } from 'next/font/google';

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pacifico',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

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
      <body className={`${montserrat.variable} ${pacifico.variable} font-body antialiased`} suppressHydrationWarning={true}>
        <AnimatedBackground />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
