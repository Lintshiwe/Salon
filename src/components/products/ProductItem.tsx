import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import type { Product } from '@/lib/types';
import { ShoppingBag, Sparkles } from 'lucide-react';

interface ProductItemProps {
  product: Product;
}

export function ProductItem({ product }: ProductItemProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-card h-full sparkle-hover group">
      <CardHeader className="p-0 relative">
        <Image
          src={`https://placehold.co/600x400.png`}
          alt={product.name}
          width={600}
          height={400}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
          data-ai-hint={product.imageHint}
        />
        <div className="absolute top-2 right-2 bg-accent text-accent-foreground p-2 rounded-bl-lg rounded-tr-md shadow-md">
            <ShoppingBag className="h-5 w-5"/>
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-2xl lg:text-3xl font-semibold text-accent mb-2 group-hover:text-primary transition-colors">{product.name}</CardTitle>
        <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
        <CardDescription className="text-foreground/75 mb-4 text-base leading-relaxed h-20 overflow-hidden">{product.description}</CardDescription>
        <p className="text-3xl font-bold text-primary mt-auto">{product.price}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button className="w-full text-lg py-6 group/button sparkle-hover">
          Add to Bag <Sparkles className="ml-2 h-5 w-5 group-hover/button:animate-sparkle-pulse"/>
        </Button>
      </CardFooter>
    </Card>
  );
}
