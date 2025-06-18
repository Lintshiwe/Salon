import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100 py-20 md:py-32">
      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left animate-in fade-in slide-in-from-left-10 duration-700">
            <h1 className="font-headline text-5xl sm:text-6xl lg:text-8xl mb-6">
              <span className="block text-primary">Unleash Your</span>
              <span className="block text-accent">Inner Sparkle!</span>
            </h1>
            <p className="text-xl lg:text-2xl text-foreground/80 mb-10 max-w-lg mx-auto md:mx-0">
              Welcome to Born@Beautiful, where dreams get a makeover. Discover a world of glamour, style, and pampering designed just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg" className="text-lg px-8 py-6 sparkle-hover transform hover:scale-105 transition-transform duration-300 group">
                <Link href="/services">
                  Explore Services <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-primary text-primary hover:bg-primary/10 sparkle-hover transform hover:scale-105 transition-transform duration-300 group">
                <Link href="/contact">
                  Book Now <Sparkles className="ml-2 h-5 w-5 group-hover:animate-ping" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative animate-in fade-in slide-in-from-right-10 duration-700 delay-200">
            <div className="aspect-square rounded-full overflow-hidden shadow-2xl mx-auto md:mx-0 max-w-md lg:max-w-lg border-4 border-white transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <Image
                src="https://placehold.co/600x600.png"
                alt="Beautiful hairstyle"
                width={600}
                height={600}
                className="object-cover w-full h-full"
                data-ai-hint="glamorous hairstyle"
                priority
              />
            </div>
            <Sparkles className="absolute -top-8 -left-8 h-16 w-16 text-accent opacity-70 animate-pulse" />
            <Sparkles className="absolute -bottom-8 -right-8 h-16 w-16 text-primary opacity-70 animate-pulse delay-500" />
          </div>
        </div>
      </div>
      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary/20 rounded-full filter blur-2xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-accent/20 rounded-full filter blur-2xl opacity-50 translate-x-1/3 translate-y-1/3"></div>
    </div>
  );
}
