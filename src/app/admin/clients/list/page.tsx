
import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Users } from 'lucide-react';

export default function ViewClientsPage() {
  return (
    <AppShell>
      <PageHeader 
        title="View Client List"
        description="Manage your cherished Born2bBeautiful clientele."
      />
      <div className="container py-12 md:py-16 text-center content-animate-in">
        <p className="text-xl mb-8 text-foreground/80">Client management tools are coming soon. Get ready to connect!</p>
        <div className="max-w-lg mx-auto bg-card p-8 rounded-lg shadow-xl border border-primary/20">
            <Users className="h-16 w-16 mx-auto text-primary mb-6 animate-pulse"/>
            <h3 className="text-2xl font-semibold text-primary mb-6">Client Directory Central</h3>
            <p className="text-muted-foreground mb-6">This will be your go-to place to view client details, booking history, preferences, and more. All designed to help you provide the most personalized Born2bBeautiful experience!</p>
             <ul className="space-y-2 text-left list-disc list-inside text-muted-foreground">
                <li>View client contact information.</li>
                <li>See appointment history.</li>
                <li>Note client preferences.</li>
                <li>(Maybe even send birthday sparkles!)</li>
            </ul>
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

