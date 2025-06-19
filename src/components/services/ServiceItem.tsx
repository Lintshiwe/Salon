
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import type { Service } from '@/lib/types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface ServiceItemProps {
  service: Service;
}

export function ServiceItem({ service }: ServiceItemProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-card h-full sparkle-hover group">
      <CardHeader className="p-0 relative">
        <Image
          src={`https://placehold.co/600x400.png`}
          alt={service.name}
          width={600}
          height={400}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
          data-ai-hint={service.imageHint}
        />
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground p-2 rounded-bl-lg rounded-tr-md shadow-md">
            <Sparkles className="h-5 w-5"/>
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-2xl lg:text-3xl font-semibold text-accent mb-2 group-hover:text-primary transition-colors">{service.name}</CardTitle>
        <CardDescription className="text-foreground/75 mb-4 text-base leading-relaxed h-24 overflow-hidden">{service.description}</CardDescription>
        <div className="flex justify-between items-center mt-auto">
          <p className="text-3xl font-bold text-primary">{service.price}</p>
          {service.duration && <p className="text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full">{service.duration}</p>}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild variant="outline" className="w-full text-lg py-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group/button">
          <Link href={`/booking?service=${encodeURIComponent(service.name)}&price=${encodeURIComponent(service.price)}&duration=${encodeURIComponent(service.duration || '')}`}>
            Book This Service <ArrowRight className="ml-2 h-5 w-5 group-hover/button:translate-x-1 transition-transform"/>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
