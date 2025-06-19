
import { AppShell } from '@/components/layout/AppShell';
import { HeroSection } from '@/components/home/HeroSection';
import { services, products, promotedItems as staticPromotedItems } from '@/data/mockData';
import type { Service, Product } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowRight, ShoppingBag, Sparkles, Wand2, PackageX } from 'lucide-react';
import { Badge } from "@/components/ui/badge"

export default function Home() {
  const featuredServices = services.slice(0, 3);
  const featuredProducts = products.slice(0, 3);

  const activePromotedItems = staticPromotedItems.map(promo => {
    if (promo.type === 'service') {
      const service = services.find(s => s.id === promo.id);
      return service ? { ...service, type: 'service' as const } : null;
    } else {
      const product = products.find(p => p.id === promo.id);
      return product ? { ...product, type: 'product' as const } : null;
    }
  }).filter(item => item !== null) as Array<(Service & {type: 'service'}) | (Product & {type: 'product'})>;


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
                  <p className="text-2xl font-bold text-primary mb-1">{service.price.startsWith('R') ? service.price : `R${service.price}`}</p>
                  {service.duration && <p className="text-sm text-muted-foreground">{service.duration}</p>}
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button asChild variant="outline" className="w-full sparkle-hover border-primary text-primary hover:bg-primary/10 group transition-all duration-300 ease-out">
                    <Link href={`/booking?service=${encodeURIComponent(service.name)}&price=${encodeURIComponent(service.price)}&duration=${encodeURIComponent(service.duration || '')}`}>
                      Book Service <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"/>
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {activePromotedItems.length > 0 && (
        <section className="py-16 md:py-24 bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50">
          <div className="container">
            <div className="text-center mb-16">
              <Wand2 className="h-16 w-16 mx-auto mb-4 text-primary animate-magical-pulse" />
              <h2 className="font-headline text-4xl md:text-5xl text-primary mb-3">Magical Deals &amp; Delights</h2>
              <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
                Discover enchanting offers and must-have items, handpicked to make you sparkle!
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {activePromotedItems.map((item, index) => (
                <Card 
                  key={item.id + '-' + item.type} 
                  className="overflow-hidden shadow-2xl hover:shadow-[0_0_35px_10px_hsla(var(--primary)/0.4)] bg-card border-2 border-transparent hover:border-primary/70 transition-all duration-500 ease-out transform hover:-translate-y-2 group animate-in fade-in zoom-in-90"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardHeader className="p-0 relative">
                    <Image 
                      src={`https://placehold.co/600x400.png`}
                      alt={item.name}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint={item.imageHint}
                    />
                    <div className="absolute top-3 right-3 bg-accent text-accent-foreground p-2 rounded-full shadow-lg transform transition-transform group-hover:scale-110">
                      <Sparkles className="h-5 w-5 animate-sparkle-pulse animation-delay-500" />
                    </div>
                     {item.type === 'product' && item.stockStatus === 'Out of Stock' && (
                        <Badge variant="destructive" className="absolute top-3 left-3 text-sm px-3 py-1.5">Out of Stock</Badge>
                      )}
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="text-xl font-semibold text-accent group-hover:text-primary transition-colors duration-300 mb-2 h-14 overflow-hidden">{item.name}</CardTitle>
                    <p className="text-2xl font-bold text-primary mb-3">{item.price.startsWith('R') ? item.price : `R${item.price}`}</p>
                    {item.type === 'service' && 'duration' in item && item.duration && <p className="text-xs text-muted-foreground mb-2">{item.duration}</p>}
                    {item.type === 'product' && 'category' in item && item.category && <p className="text-xs text-muted-foreground mb-2">{item.category}</p>}
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    {item.type === 'service' ? (
                      <Button asChild size="lg" className="w-full sparkle-hover group/btn transition-all duration-300 ease-out">
                        <Link href={`/booking?service=${encodeURIComponent(item.name)}&price=${encodeURIComponent(item.price)}&duration=${encodeURIComponent('duration' in item ? item.duration || '' : '')}`}>
                          Book Now <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform"/>
                        </Link>
                      </Button>
                    ) : (
                      <Button 
                        size="lg" 
                        className="w-full sparkle-hover group/btn transition-all duration-300 ease-out"
                        disabled={item.stockStatus === 'Out of Stock'}
                      >
                        {item.stockStatus === 'Out of Stock' ? 'Out of Stock' : 'Add to Bag'}
                        {item.stockStatus === 'In Stock' && <ShoppingBag className="ml-2 h-5 w-5 group-hover/btn:animate-pulse"/>}
                        {item.stockStatus === 'Out of Stock' && <PackageX className="ml-2 h-5 w-5"/>}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

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
                 <CardHeader className="p-0 relative">
                  <Image 
                    src={`https://placehold.co/600x400.png`}
                    alt={product.name}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                    data-ai-hint={product.imageHint}
                  />
                   {product.stockStatus === 'Out of Stock' && (
                    <Badge variant="destructive" className="absolute top-2 left-2 text-xs px-2 py-1">Out of Stock</Badge>
                  )}
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-2xl font-semibold text-accent mb-2">{product.name}</CardTitle>
                  <CardDescription className="text-foreground/70 mb-4 h-16 overflow-hidden">{product.description}</CardDescription>
                  <p className="text-2xl font-bold text-primary">{product.price.startsWith('R') ? product.price : `R${product.price}`}</p>
                </CardContent>
                 <CardFooter className="p-6 pt-0">
                  <Button 
                    className="w-full sparkle-hover group transition-all duration-300 ease-out"
                    disabled={product.stockStatus === 'Out of Stock'}
                  >
                    {product.stockStatus === 'Out of Stock' ? 'Out of Stock' : 'Add to Bag'}
                    {product.stockStatus === 'In Stock' && <ShoppingBag className="ml-2 h-4 w-4 group-hover:animate-pulse"/>}
                    {product.stockStatus === 'Out of Stock' && <PackageX className="ml-2 h-4 w-4"/>}
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
