"use client"; // Required for useSearchParams

import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/ui/PageHeader';
import { ContactFormComponent } from '@/components/contact/ContactForm';
import { useSearchParams } from 'next/navigation';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function ContactPage() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get('service') || undefined;

  return (
    <AppShell>
      <PageHeader 
        title="Contact Us"
        description="Have questions, want to book an appointment, or just say hello? Reach out to us! We're excited to connect with you and help you on your beauty journey."
      />
      <div className="container py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div className="content-animate-in animate-in fade-in slide-in-from-left-10 duration-500">
            <ContactFormComponent initialService={initialService} />
          </div>
          <div className="space-y-10 content-animate-in animate-in fade-in slide-in-from-right-10 duration-500 delay-200">
            <h2 className="font-headline text-4xl text-primary mb-6">Visit Our Dream Salon</h2>
            
            <div className="flex items-start space-x-4 p-6 bg-secondary/50 rounded-lg shadow-md">
              <MapPin className="h-10 w-10 text-accent mt-1 shrink-0" />
              <div>
                <h3 className="text-2xl font-semibold text-primary mb-1">Our Address</h3>
                <p className="text-lg text-foreground/80">
                  123 Sparkle Avenue<br />
                  Glamour City, GC 12345
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-secondary/50 rounded-lg shadow-md">
              <Phone className="h-10 w-10 text-accent mt-1 shrink-0" />
              <div>
                <h3 className="text-2xl font-semibold text-primary mb-1">Call Us</h3>
                <p className="text-lg text-foreground/80">(555) 123-PINK (7465)</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-secondary/50 rounded-lg shadow-md">
              <Mail className="h-10 w-10 text-accent mt-1 shrink-0" />
              <div>
                <h3 className="text-2xl font-semibold text-primary mb-1">Email Us</h3>
                <p className="text-lg text-foreground/80">hello@bornatbeautiful.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
