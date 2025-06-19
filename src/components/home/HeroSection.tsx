import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, ScissorsIcon, Wand2Icon } from 'lucide-react';

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
          
          {/* Enhanced Image Section */}
          <div className="relative group flex items-center justify-center animate-in fade-in zoom-in-75 duration-1000 delay-200">
            <div className="absolute inset-0 animate-slow-spin [animation-duration:40s]">
              {/* Orbiting Icons */}
              <Sparkles className="absolute top-[5%] left-[20%] h-10 w-10 text-accent opacity-70 animate-sparkle-subtle [animation-delay:0.5s]" />
              <ScissorsIcon className="absolute top-[25%] right-[5%] h-10 w-10 text-primary opacity-70 animate-subtle-rotate [animation-delay:1s]" />
              <Wand2Icon className="absolute bottom-[10%] left-[10%] h-10 w-10 text-pink-400 opacity-70 animate-gentle-float [animation-delay:1.5s]" />
              <Sparkles className="absolute bottom-[20%] right-[15%] h-8 w-8 text-accent opacity-60 animate-sparkle-subtle [animation-delay:2s]" />
            </div>

            <div 
              className="relative aspect-square rounded-full overflow-hidden shadow-2xl mx-auto md:mx-0 max-w-sm sm:max-w-md lg:max-w-lg border-4 border-white 
                         transform rotate-3 group-hover:rotate-0 
                         transition-all duration-500 ease-out
                         group-hover:shadow-[0_0_40px_15px_hsla(var(--primary)/0.3),_0_0_20px_8px_hsla(var(--accent)/0.25)]"
            >
              <Image
                src="https://placehold.co/600x600/E8A0BF/1E3A8A.png" 
                alt="Stylized woman face logo for Born@Beautiful salon"
                width={600}
                height={600}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                data-ai-hint="stylized woman face logo dark_blue_on_pink"
                priority
              />
            </div>
          </div>
        </div>
      </div>
      {/* Decorative shapes - kept from original */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary/20 rounded-full filter blur-2xl opacity-50 -translate-x-1/2 -translate-y-1/2 animate-pulse [animation-duration:5s]"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-accent/20 rounded-full filter blur-2xl opacity-50 translate-x-1/3 translate-y-1/3 animate-pulse [animation-duration:6s] [animation-delay:1s]"></div>
    </div>
  );
}
