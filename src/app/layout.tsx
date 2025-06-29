import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import { AnimatedBackground } from '@/components/layout/AnimatedBackground';
import './globals.css';

export const metadata: Metadata = {
  title: 'Born2bBeautiful - The Beauty of Life',
  description: 'Your destination for beautiful candles, diffusers, and soaps. Experience the beauty of life.',
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
      <body className="font-body antialiased" suppressHydrationWarning={true}>
        <AnimatedBackground />
        {children}
        <Toaster />
      </body>
    </html>
  );
}