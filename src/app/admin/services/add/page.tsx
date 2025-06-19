
import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AddServicePage() {
  return (
    <AppShell>
      <PageHeader 
        title="Add New Service"
        description="Create a new glamorous service for Born@Beautiful."
      />
      <div className="container py-12 md:py-16 text-center content-animate-in">
        <p className="text-xl mb-8 text-foreground/80">This page is under construction. Functionality to add new services will be available soon!</p>
        <div className="max-w-md mx-auto bg-card p-8 rounded-lg shadow-xl border border-primary/20">
            <h3 className="text-2xl font-semibold text-primary mb-6">Coming Soon: Service Creation Form</h3>
            <p className="text-muted-foreground mb-6">Imagine a beautiful form here where you can define service names, descriptions, prices, durations, and upload stunning images.</p>
            <div className="space-y-3">
                <div className="h-10 bg-muted rounded animate-pulse"></div>
                <div className="h-10 bg-muted rounded animate-pulse delay-100"></div>
                <div className="h-20 bg-muted rounded animate-pulse delay-200"></div>
                <div className="h-10 bg-muted rounded animate-pulse delay-300"></div>
            </div>
        </div>
        <Button asChild variant="outline" className="mt-12 group text-lg py-6 px-8 border-primary text-primary hover:bg-primary/10 transition-all duration-300 ease-out">
          <Link href="/admin/dashboard">
            <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    </AppShell>
  );
}
