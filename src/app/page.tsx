import { AppShell } from '@/components/layout/AppShell';
import { HeroSection } from '@/components/home/HeroSection';
import { services, products } from '@/data/mockData';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';

export default function Home() {
  const featuredServices = services.slice(0, 3);
  const featuredProducts = products.slice(0, 3);

  return (
    <AppShell>
      <HeroSection />
      
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-headline text-4xl md:text-5xl text-primary mb-3">Our Signature Services</h2>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
              Indulge in our most popular treatments, crafted for pure bliss and stunning results.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 content-animate-in">
            {featuredServices.map((service) => (
              <Card key={service.id} className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 ease-out transform hover:-translate-y-1 bg-card">
                <CardHeader className="p-0">
                  <Image 
                    src={`https://placehold.co/600x400.png`}
                    alt={service.name}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                    data-ai-hint={service.imageHint}
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-2xl font-semibold text-accent mb-2">{service.name}</CardTitle>
                  <CardDescription className="text-foreground/70 mb-4 h-20 overflow-hidden">{service.description}</CardDescription>
                  <p className="text-2xl font-bold text-primary mb-1">{service.price}</p>
                  {service.duration && <p className="text-sm text-muted-foreground">{service.duration}</p>}
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button asChild variant="outline" className="w-full sparkle-hover border-primary text-primary hover:bg-primary/10 group">
                    <Link href="/services">
                      Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"/>
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-headline text-4xl md:text-5xl text-primary mb-3">Shop Our Favorites</h2>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
              Take home a piece of Born@Beautiful magic with our curated product selection.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 content-animate-in">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 ease-out transform hover:-translate-y-1 bg-card">
                <CardHeader className="p-0">
                  <Image 
                    src={`https://placehold.co/600x400.png`}
                    alt={product.name}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                    data-ai-hint={product.imageHint}
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-2xl font-semibold text-accent mb-2">{product.name}</CardTitle>
                  <CardDescription className="text-foreground/70 mb-4 h-16 overflow-hidden">{product.description}</CardDescription>
                  <p className="text-2xl font-bold text-primary">{product.price}</p>
                </CardContent>
                 <CardFooter className="p-6 pt-0">
                  <Button className="w-full sparkle-hover group">
                    Add to Bag <ShoppingBag className="ml-2 h-4 w-4 group-hover:animate-pulse"/>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-primary/80 to-accent/80 text-primary-foreground">
        <div className="container text-center">
          <Sparkles className="h-16 w-16 mx-auto mb-6 text-white animate-bounce" />
          <h2 className="font-headline text-4xl md:text-5xl mb-6">Ready to Be Pampered?</h2>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
            Book your appointment today and let our expert stylists transform your look and lift your spirits.
          </p>
          <Button asChild size="lg" variant="outline" className="text-lg px-10 py-7 bg-white text-primary hover:bg-pink-100 border-white sparkle-hover transform hover:scale-105 transition-transform duration-300 group">
            <Link href="/contact">
              Contact Us Today <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform"/>
            </Link>
          </Button>
        </div>
      </section>

    </AppShell>
  );
}
