
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Sparkles } from 'lucide-react';

// Inline SVG for TikTok icon as it's not in Lucide
const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.5.04-4.84-1.14-6.37-3.02-1.03-1.25-1.72-2.71-1.9-4.25-.02-1.5-.04-3-.02-4.5.05-1.79 1.04-3.47 2.56-4.55 1.18-.85 2.62-1.29 4.03-1.44.2-.02.4-.03.6-.05.02-2.44-.02-4.88.02-7.32.01-.25.02-.5.04-.75.03-.6.13-1.19.32-1.77.11-.3.25-.58.41-.85.1-.17.2-.33.3-.5.02-.02.03-.04.05-.05H12.525z" />
  </svg>
);

const HeartFilledIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="inline-block h-4 w-4 text-primary mx-1"
    {...props}
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-secondary text-secondary-foreground">
      <div className="container py-12 max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center space-x-2 group mb-4">
              <Sparkles className="h-7 w-7 text-primary transition-transform group-hover:scale-110 group-hover:animate-sparkle-pulse" />
              <span className="font-headline text-2xl font-bold text-primary tracking-wider">
                Born@Beautiful
              </span>
            </Link>
            <p className="text-sm text-center md:text-left">
              Experience the magic of beauty. <br />
              123 Sparkle Ave, Glamour City, GC 12345
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="font-headline text-xl text-primary mb-3">Quick Links</h3>
            <ul className="space-y-2 text-center">
              <li><Link href="/services" className="hover:text-primary transition-colors duration-300 ease-out sparkle-hover">Services</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors duration-300 ease-out sparkle-hover">Products</Link></li>
              <li><Link href="/gallery" className="hover:text-primary transition-colors duration-300 ease-out sparkle-hover">Gallery</Link></li>
              <li><Link href="/stylists" className="hover:text-primary transition-colors duration-300 ease-out sparkle-hover">Stylists</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors duration-300 ease-out sparkle-hover">Contact</Link></li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <h3 className="font-headline text-xl text-primary mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook" className="text-secondary-foreground hover:text-primary transition-all duration-300 ease-out hover:scale-110 sparkle-hover p-2"><Facebook size={28} /></Link>
              <Link href="#" aria-label="Instagram" className="text-secondary-foreground hover:text-primary transition-all duration-300 ease-out hover:scale-110 sparkle-hover p-2"><Instagram size={28} /></Link>
              <Link href="#" aria-label="Twitter" className="text-secondary-foreground hover:text-primary transition-all duration-300 ease-out hover:scale-110 sparkle-hover p-2"><Twitter size={28} /></Link>
              <Link href="#" aria-label="TikTok" className="text-secondary-foreground hover:text-primary transition-all duration-300 ease-out hover:scale-110 sparkle-hover p-2"><TikTokIcon className="h-7 w-7" /></Link>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Born2bBeautiful. All rights reserved. Designed with PureBeauty<HeartFilledIcon />.</p>
        </div>
      </div>
    </footer>
  );
}
