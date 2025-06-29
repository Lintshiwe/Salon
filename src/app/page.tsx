import { AppShell } from '@/components/layout/AppShell';
import { EnhancedHeroSection } from '@/components/ui/enhanced-hero';
import { products, promotedItems as staticPromotedItems, getHeroImageSrc } from '@/data/mockData';
import type { Product } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowRight, ShoppingBag, Sparkles, Wand2, PackageX, PhoneCall, Star, Heart, Crown, Gem, Flame } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const featuredProducts = products.slice(0, 3);
  const heroImageOverride = getHeroImageSrc(); 

  const activePromotedItems = staticPromotedItems.map(promo => {
    const product = products.find(p => p.id === promo.id);
    return product ? { ...product, type: 'product' as const, discountPercentage: promo.discountPercentage } : null;
  }).filter(item => item !== null) as Array<Product & {type: 'product', discountPercentage?: number}>;

  return (
    <AppShell>
      <EnhancedHeroSection heroImageOverride={heroImageOverride} />
      
      {/* Enhanced Products Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-secondary/30 via-background to-primary/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ec4899" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-full p-4 shadow-xl">
                <Crown className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h2 className="font-headline text-4xl md:text-6xl text-primary mb-4">Our Featured Products</h2>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
              Discover our handcrafted candles, diffusers, and soaps designed to bring beauty into your life.
            </p>
            <div className="flex justify-center mt-6 space-x-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-500 fill-current" />
              ))}
              <span className="ml-2 text-lg font-semibold text-foreground/80">Premium Quality</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 content-animate-in">
            {featuredProducts.map((product, index) => (
              <Card key={product.id} className="overflow-hidden shadow-2xl hover:shadow-[0_0_40px_10px_hsla(var(--primary)/0.3)] transition-all duration-500 ease-out transform hover:-translate-y-2 bg-gradient-to-br from-card via-card to-primary/5 border-2 border-transparent hover:border-primary/30 group" style={{ animationDelay: `${index * 200}ms` }}>
                <CardHeader className="p-0 relative">
                  <Image 
                    src={`https://placehold.co/600x400.png`}
                    alt={product.name}
                    width={600}
                    height={400}
                    className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                    data-ai-hint={product.imageHint}
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                    <Sparkles className="h-6 w-6 text-primary animate-pulse" />
                  </div>
                  {product.stockStatus === 'Out of Stock' && (
                    <Badge variant="destructive" className="absolute top-2 left-2 text-sm px-3 py-1.5">Out of Stock</Badge>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </CardHeader>
                <CardContent className="p-6 relative">
                  <CardTitle className="text-2xl lg:text-3xl font-semibold text-accent mb-3 group-hover:text-primary transition-colors">{product.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                  <CardDescription className="text-foreground/75 mb-4 text-base leading-relaxed h-20 overflow-hidden">{product.description}</CardDescription>
                  <p className="text-3xl font-bold text-primary mt-auto">{product.price.startsWith('R') ? product.price : `R${product.price}`}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button 
                    className="w-full text-lg py-6 group/button sparkle-hover transition-all duration-300 ease-out"
                    disabled={product.stockStatus === 'Out of Stock'}
                  >
                    {product.stockStatus === 'Out of Stock' ? 'Out of Stock' : 'Call to Purchase'}
                    {product.stockStatus === 'Out of Stock' ? <PackageX className="ml-2 h-5 w-5"/> : <PhoneCall className="ml-2 h-5 w-5 group-hover/button:animate-pulse"/>}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Promotions Section */}
      {activePromotedItems.length > 0 && (
        <section className="py-16 md:py-24 bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent/10 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
          </div>
          <div className="container relative z-10">
            <div className="text-center mb-16">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-r from-primary to-accent p-4 rounded-full shadow-2xl">
                  <Wand2 className="h-16 w-16 text-white animate-magical-pulse" />
                </div>
              </div>
              <h2 className="font-headline text-4xl md:text-6xl text-primary mb-4">Special Offers</h2>
              <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
                Discover enchanting offers on our premium products, handpicked to make your space beautiful!
              </p>
              <div className="flex justify-center mt-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 shadow-lg">
                  <span className="text-lg font-semibold text-primary">✨ Limited Time Offers ✨</span>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {activePromotedItems.map((item, index) => {
                const hasDiscount = item.discountPercentage && item.discountPercentage > 0;
                const originalPriceNum = parseFloat(item.price.replace('R', ''));
                const discountedPrice = hasDiscount ? originalPriceNum - (originalPriceNum * item.discountPercentage! / 100) : originalPriceNum;

                return (
                  <Card 
                    key={item.id + '-' + item.type} 
                    className="overflow-hidden shadow-2xl hover:shadow-[0_0_50px_15px_hsla(var(--primary)/0.4)] bg-gradient-to-br from-card via-card to-primary/5 border-2 border-transparent hover:border-primary/70 transition-all duration-700 ease-out transform hover:-translate-y-3 group animate-in fade-in zoom-in-90"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <CardHeader className="p-0 relative">
                      <Image 
                        src={`https://placehold.co/600x400.png`}
                        alt={item.name}
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                        data-ai-hint={item.imageHint}
                      />
                      {hasDiscount && (
                        <div className="absolute top-3 right-3 z-10">
                          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full shadow-lg animate-pulse">
                            <span className="text-sm font-bold">{item.discountPercentage}% OFF</span>
                          </div>
                        </div>
                      )}
                      {item.stockStatus === 'Out of Stock' && (
                        <div className="absolute top-3 left-3 z-10">
                          <Badge variant="destructive" className="text-sm px-3 py-1.5">Out of Stock</Badge>
                        </div>
                      )}
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                        <Gem className="h-5 w-5 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <CardTitle className="text-xl font-semibold text-accent group-hover:text-primary transition-colors duration-300 mb-3 h-14 overflow-hidden">{item.name}</CardTitle>
                      
                      {hasDiscount ? (
                        <div className="flex items-baseline gap-2 mb-3">
                          <p className="text-lg font-bold text-muted-foreground line-through">{item.price.startsWith('R') ? item.price : `R${item.price}`}</p>
                          <p className="text-2xl font-bold text-primary">R{discountedPrice.toFixed(2)}</p>
                        </div>
                      ) : (
                        <p className="text-2xl font-bold text-primary mb-3">{item.price.startsWith('R') ? item.price : `R${item.price}`}</p>
                      )}

                      <div className="bg-secondary/80 backdrop-blur-sm px-3 py-1 rounded-full inline-block mb-2">
                        <p className="text-xs text-muted-foreground">{item.category}</p>
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <Button 
                        size="lg" 
                        className="w-full sparkle-hover group/btn transition-all duration-300 ease-out shadow-lg"
                        disabled={item.stockStatus === 'Out of Stock'}
                      >
                        {item.stockStatus === 'Out of Stock' ? 'Out of Stock' : 'Call to Purchase'}
                        {item.stockStatus === 'In Stock' && <PhoneCall className="ml-2 h-5 w-5 group-hover/btn:animate-pulse"/>}
                        {item.stockStatus === 'Out of Stock' && <PackageX className="ml-2 h-5 w-5"/>}
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Enhanced CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
        </div>
        <div className="container text-center relative z-10">
          <div className="flex justify-center mb-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 shadow-2xl">
              <Sparkles className="h-16 w-16 text-white animate-bounce" />
            </div>
          </div>
          <h2 className="font-headline text-4xl md:text-6xl mb-6">Ready to Experience The Beauty of Life?</h2>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Contact us today to discover our beautiful collection of candles, diffusers, and soaps that will transform your space.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button asChild size="lg" variant="outline" className="text-lg px-10 py-7 bg-white text-primary hover:bg-pink-100 border-2 border-white sparkle-hover transform hover:scale-105 transition-all duration-300 group shadow-2xl">
              <Link href="/contact">
                Contact Us Today 
                <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform"/>
              </Link>
            </Button>
            <div className="flex items-center space-x-4 text-white/90">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span>Available Today</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2 animate-pulse"></div>
                <span>Quick Response</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}