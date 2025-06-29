"use client"; 

import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/ui/PageHeader';
import { ContactFormComponent } from '@/components/contact/ContactForm';
import { useSearchParams } from 'next/navigation';
import { Phone, Mail, MapPin, CreditCard, Clock } from 'lucide-react';

export default function ContactPage() {
  const searchParams = useSearchParams();
  const initialProduct = searchParams.get('product') || undefined;

  return (
    <AppShell>
      <PageHeader 
        title="Contact Us"
        description="Have questions about our products or want to place an order? Reach out to us! We're excited to help you experience The Beauty of Life."
      />
      <div className="container py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div className="content-animate-in animate-in fade-in slide-in-from-left-10 duration-500">
            <ContactFormComponent initialService={initialProduct} />
          </div>
          <div className="space-y-6 content-animate-in animate-in fade-in slide-in-from-right-10 duration-500 delay-200">
            <h2 className="font-headline text-4xl text-primary mb-6">Our Details</h2>
            
            <div className="flex items-start space-x-4 p-6 bg-secondary/50 rounded-lg shadow-md">
              <MapPin className="h-10 w-10 text-accent mt-1 shrink-0" />
              <div>
                <h3 className="text-2xl font-semibold text-primary mb-1">Pretoria Branch</h3>
                <p className="text-lg text-foreground/80">
                  Pretoria East Mooikloof The Hills Estate,
                  <br /> 
                  Gemsbok Street
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-secondary/50 rounded-lg shadow-md">
              <MapPin className="h-10 w-10 text-accent mt-1 shrink-0" />
              <div>
                <h3 className="text-2xl font-semibold text-primary mb-1">Tembisa Branch</h3>
                <p className="text-lg text-foreground/80">
                  114 Temong Section,
                  <br /> 
                  George Nyanga, Tembisa
                </p>
              </div>
            </div>

             <div className="flex items-start space-x-4 p-6 bg-secondary/50 rounded-lg shadow-md">
              <Clock className="h-10 w-10 text-accent mt-1 shrink-0" />
              <div>
                <h3 className="text-2xl font-semibold text-primary mb-1">Opening Hours</h3>
                <p className="text-lg text-foreground/80">Mon - Thurs: 09:00 - 17:00</p>
                <p className="text-lg text-foreground/80">Fri - Sun: 08:30 - 17:00</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-secondary/50 rounded-lg shadow-md">
              <Phone className="h-10 w-10 text-accent mt-1 shrink-0" />
              <div>
                <h3 className="text-2xl font-semibold text-primary mb-1">Call Us</h3>
                <p className="text-lg text-foreground/80">+071 451 3588</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-secondary/50 rounded-lg shadow-md">
              <Mail className="h-10 w-10 text-accent mt-1 shrink-0" />
              <div>
                <h3 className="text-2xl font-semibold text-primary mb-1">Email Us</h3>
                <p className="text-lg text-foreground/80">SEKGOTATUMELO238@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-primary/10 rounded-lg shadow-md border border-primary/30">
              <CreditCard className="h-10 w-10 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="text-2xl font-semibold text-primary mb-1">Payment Info</h3>
                <p className="text-lg text-foreground/80">
                  We gladly accept cash payments for all our beautiful products.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}