import Link from 'next/link';
import { Facebook, Instagram, Twitter, Sparkles } from 'lucide-react';

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
              <li><Link href="/services" className="hover:text-primary transition-colors sparkle-hover">Services</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors sparkle-hover">Products</Link></li>
              <li><Link href="/gallery" className="hover:text-primary transition-colors sparkle-hover">Gallery</Link></li>
              <li><Link href="/stylists" className="hover:text-primary transition-colors sparkle-hover">Stylists</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors sparkle-hover">Contact</Link></li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <h3 className="font-headline text-xl text-primary mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook" className="text-secondary-foreground hover:text-primary transition-all hover:scale-110 sparkle-hover p-2"><Facebook size={28} /></Link>
              <Link href="#" aria-label="Instagram" className="text-secondary-foreground hover:text-primary transition-all hover:scale-110 sparkle-hover p-2"><Instagram size={28} /></Link>
              <Link href="#" aria-label="Twitter" className="text-secondary-foreground hover:text-primary transition-all hover:scale-110 sparkle-hover p-2"><Twitter size={28} /></Link>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Born@Beautiful. All rights reserved. Designed with <HeartFilledIcon />.</p>
        </div>
      </div>
    </footer>
  );
}

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
