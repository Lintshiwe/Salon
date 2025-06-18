import Image from 'next/image';
import type { Stylist } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

interface StylistProfileProps {
  stylist: Stylist;
}

export function StylistProfile({ stylist }: StylistProfileProps) {
  return (
    <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-card text-center sparkle-hover group">
      <CardHeader className="p-0 relative">
        <div className="aspect-[4/5] relative overflow-hidden">
          <Image
            src={`https://placehold.co/400x500.png`}
            alt={stylist.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            data-ai-hint={stylist.imageHint}
          />
        </div>
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 p-1 bg-background rounded-full">
          <Sparkles className="h-10 w-10 text-primary bg-secondary p-2 rounded-full shadow-lg" />
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-10">
        <CardTitle className="text-3xl font-headline text-primary mb-3 group-hover:text-accent transition-colors">{stylist.name}</CardTitle>
        <p className="text-foreground/75 mb-4 text-base leading-relaxed min-h-[6rem]">{stylist.bio}</p>
        <div className="mt-4 space-y-2">
          <h4 className="text-lg font-semibold text-accent">Specializations:</h4>
          <div className="flex flex-wrap justify-center gap-2">
            {stylist.specializations.map((spec, index) => (
              <Badge key={index} variant="secondary" className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                {spec}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
