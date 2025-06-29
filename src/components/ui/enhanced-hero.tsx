"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, Heart, Star, Flame, Droplets } from 'lucide-react';
import { useState, useEffect } from 'react';

interface EnhancedHeroSectionProps {
  heroImageOverride?: string | null;
}

export function EnhancedHeroSection({ heroImageOverride }: EnhancedHeroSectionProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const heroImageSrc = heroImageOverride || "https://placehold.co/600x600/E8A0BF/1E3A8A.png";
  const heroImageHint = heroImageOverride ? "custom hero image" : "beautiful candles and diffusers display";

  const rotatingTexts = [
    "Experience The Beauty of Life!",
    "Transform Your Space with Fragrance!",
    "Discover Handcrafted Luxury!",
    "Create Your Perfect Atmosphere!"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-rose-100 to-purple-100 py-20 md:py-32">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-200/30 to-purple-200/30 rounded-full filter blur-3xl animate-slow-spin"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-gentle-float opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          >
            <Sparkles className="h-4 w-4 text-primary/40" />
          </div>
        ))}
      </div>

      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left animate-in fade-in slide-in-from-left-10 duration-700">
            <div className="mb-6 flex justify-center md:justify-start">
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <span className="text-sm font-semibold text-gray-700">Premium Quality Products</span>
                <Heart className="h-5 w-5 text-red-500 fill-current" />
              </div>
            </div>

            <h1 className="font-headline text-5xl sm:text-6xl lg:text-8xl mb-6 relative">
              <span className="block text-primary relative">
                {rotatingTexts[currentTextIndex].split(' ').slice(0, 3).join(' ')}
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="h-8 w-8 text-accent animate-sparkle-pulse" />
                </div>
              </span>
              <span className="block text-accent bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                {rotatingTexts[currentTextIndex].split(' ').slice(3).join(' ')}
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-foreground/80 mb-10 max-w-lg mx-auto md:mx-0 leading-relaxed">
              Welcome to Born2bBeautiful, where we create beautiful candles, diffusers, and soaps to enhance your daily life. The Beauty of Life awaits you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg" className="text-lg px-8 py-6 sparkle-hover transform hover:scale-105 transition-all duration-300 group shadow-xl">
                <Link href="/products">
                  <Flame className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                  Shop Products 
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground sparkle-hover transform hover:scale-105 transition-all duration-300 group shadow-xl bg-white/80 backdrop-blur-sm">
                <Link href="/contact">
                  Contact Us 
                  <Sparkles className="ml-2 h-5 w-5 group-hover:animate-ping" />
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-6 text-sm text-foreground/60">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>Handcrafted Quality</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span>Natural Ingredients</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                <span>Eco-Friendly</span>
              </div>
            </div>
          </div>
          
          <div className="relative group flex items-center justify-center animate-in fade-in zoom-in-75 duration-1000 delay-200">
            {/* Decorative elements around the image */}
            <div className="absolute inset-0 animate-slow-spin [animation-duration:40s]">
              <Sparkles className="absolute top-[5%] left-[20%] h-10 w-10 text-accent opacity-70 animate-sparkle-subtle [animation-delay:0.5s]" />
              <Flame className="absolute top-[25%] right-[5%] h-10 w-10 text-primary opacity-70 animate-subtle-rotate [animation-delay:1s]" />
              <Droplets className="absolute bottom-[10%] left-[10%] h-10 w-10 text-pink-400 opacity-70 animate-gentle-float [animation-delay:1.5s]" />
              <Sparkles className="absolute bottom-[20%] right-[15%] h-8 w-8 text-accent opacity-60 animate-sparkle-subtle [animation-delay:2s]" />
              <Heart className="absolute top-[40%] left-[5%] h-6 w-6 text-red-400 opacity-60 animate-gentle-float [animation-delay:2.5s]" />
              <Star className="absolute top-[60%] right-[10%] h-6 w-6 text-yellow-400 opacity-60 animate-sparkle-subtle [animation-delay:3s]" />
            </div>

            {/* Glowing ring effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 animate-pulse blur-xl"></div>

            <div 
              className="relative aspect-square rounded-full overflow-hidden shadow-2xl mx-auto md:mx-0 max-w-sm sm:max-w-md lg:max-w-lg border-4 border-white/50 backdrop-blur-sm
                         transform rotate-3 group-hover:rotate-0 
                         transition-all duration-500 ease-out
                         group-hover:shadow-[0_0_60px_20px_hsla(var(--primary)/0.4),_0_0_40px_15px_hsla(var(--accent)/0.3)]
                         hover:scale-105"
            >
              <Image
                src={heroImageSrc} 
                alt="Beautiful candles, diffusers and soaps display for Born2bBeautiful"
                width={600}
                height={600}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                data-ai-hint={heroImageHint}
                priority
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg animate-bounce">
              <Star className="h-6 w-6 text-yellow-500 fill-current" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg animate-bounce animation-delay-1000">
              <Heart className="h-6 w-6 text-red-500 fill-current" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}