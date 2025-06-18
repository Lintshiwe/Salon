import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/ui/PageHeader';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { galleryImages } from '@/data/mockData';

export default function GalleryPage() {
  return (
    <AppShell>
      <PageHeader 
        title="Our Dazzling Gallery"
        description="Step into the world of Born@Beautiful. Explore our stunning transformations, chic salon interiors, and the talented team that makes the magic happen."
      />
      <div className="container py-12 md:py-16">
        <GalleryGrid images={galleryImages} />
      </div>
    </AppShell>
  );
}
