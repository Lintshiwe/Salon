
import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/ui/PageHeader';
import { StylistProfile } from '@/components/stylists/StylistProfile';
import { stylists } from '@/data/mockData';

export default function StylistsPage() {
  return (
    <AppShell>
      <PageHeader 
        title="Meet Our Glam Squad"
        description="Our talented and passionate stylists are dedicated to making you look and feel your absolute best. Get to know the artists behind Born2bBeautiful."
      />
      <div className="container py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 content-animate-in">
          {stylists.map((stylist, index) => (
            <div key={stylist.id} style={{ animationDelay: `${index * 100}ms` }} className="animate-in fade-in slide-in-from-bottom-5 duration-500 ease-out">
              <StylistProfile stylist={stylist} />
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
