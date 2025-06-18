"use client";

import * as React from 'react';
import Image from 'next/image';
import { GalleryImage } from '@/lib/types';
import { Maximize2, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GalleryGridProps {
  images: GalleryImage[];
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = React.useState<GalleryImage | null>(null);

  const categories = Array.from(new Set(images.map(img => img.category)));

  return (
    <>
      <Tabs defaultValue={categories[0]} className="w-full mb-12">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 max-w-2xl mx-auto h-auto sm:h-12 bg-primary/10 p-2 rounded-lg">
          {categories.map(category => (
            <TabsTrigger 
              key={category} 
              value={category} 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg rounded-md py-2 text-lg"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map(category => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 content-animate-in">
              {images.filter(img => img.category === category).map((image, index) => (
                <div
                  key={image.id}
                  className="relative aspect-square rounded-lg overflow-hidden shadow-lg cursor-pointer group transform hover:scale-105 transition-transform duration-300 ease-out animate-in fade-in zoom-in-90"
                  style={{ animationDelay: `${index * 70}ms` }}
                  onClick={() => setSelectedImage(image)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setSelectedImage(image)}
                >
                  <Image
                    src={`https://placehold.co/400x400.png`}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-opacity duration-300 group-hover:opacity-80"
                    data-ai-hint={image.imageHint}
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Maximize2 className="h-10 w-10 text-white" />
                  </div>
                  <p className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2 truncate opacity-0 group-hover:opacity-100 transition-opacity duration-300">{image.alt}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-3xl p-2 sm:p-4 !rounded-lg bg-background border-primary shadow-2xl">
            <DialogHeader className="p-0">
              <DialogTitle className="sr-only">{selectedImage.alt}</DialogTitle>
              <DialogClose className="absolute -top-2 -right-2 sm:top-2 sm:right-2 z-10 bg-background rounded-full p-1.5 border border-primary hover:bg-primary/10">
                <X className="h-5 w-5 text-primary" />
              </DialogClose>
            </DialogHeader>
            <div className="relative aspect-[4/3] w-full rounded-md overflow-hidden">
              <Image
                src={`https://placehold.co/800x600.png`}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                data-ai-hint={selectedImage.imageHint}
              />
            </div>
            <p className="text-center text-muted-foreground mt-2 text-sm sm:text-base p-2">{selectedImage.alt}</p>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
