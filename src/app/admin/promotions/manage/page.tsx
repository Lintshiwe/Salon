
import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Megaphone } from 'lucide-react'; // Changed Announce to Megaphone
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ManagePromotionsPage() {
  return (
    <AppShell>
      <PageHeader 
        title="Manage Promotions"
        description="Control which services and products are featured in the 'Magical Deals & Delights' section."
      />
      <div className="container py-12 md:py-16 text-center content-animate-in">
        <Card className="max-w-2xl mx-auto shadow-xl border-primary/30 bg-card">
            <CardHeader>
                <Megaphone className="h-16 w-16 mx-auto text-primary mb-6 animate-pulse"/>
                <CardTitle className="text-3xl font-headline text-primary">Promotion Management Coming Soon!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-lg text-foreground/80">
                <p>
                    This section will allow you to select services and products to feature in the "Magical Deals & Delights" section on the homepage.
                </p>
                <p className="text-muted-foreground">
                    Currently, promotions are managed by editing the <code className="bg-muted px-1.5 py-0.5 rounded-md font-mono text-sm">promotedItems</code> array directly in the <code className="bg-muted px-1.5 py-0.5 rounded-md font-mono text-sm">src/data/mockData.ts</code> file.
                </p>
                <p>
                    Full dynamic promotion management through this admin panel would typically require backend database integration to store and update promotion settings.
                </p>
            </CardContent>
        </Card>
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

