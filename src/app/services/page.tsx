import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/ui/PageHeader';
import { ServiceItem } from '@/components/services/ServiceItem';
import { services } from '@/data/mockData';

export default function ServicesPage() {
  return (
    <AppShell>
      <PageHeader 
        title="Our Sparkling Services"
        description="Discover a wide range of treatments designed to make you look and feel Born@Beautiful. From transformative hair styling to relaxing spa experiences, we have something for everyone."
      />
      <div className="container py-12 md:py-16">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 content-animate-in">
          {services.map((service, index) => (
            <div key={service.id} style={{ animationDelay: `${index * 100}ms` }} className="animate-in fade-in slide-in-from-bottom-5 duration-500 ease-out">
              <ServiceItem service={service} />
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
