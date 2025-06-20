
import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/ui/PageHeader';
import { StylistForm } from '@/components/admin/StylistForm';
import { Card, CardContent } from '@/components/ui/card';
import { addStylistAction } from '@/app/admin/stylists/actions';

export default function AddStylistPage() {
  return (
    <AppShell>
      <PageHeader 
        title="Add New Stylist"
        description="Introduce a new fabulous artist to the Born2bBeautiful team."
      />
      <div className="container py-12 md:py-16">
        <Card className="max-w-2xl mx-auto shadow-xl border-primary/30">
          <CardContent className="p-6 md:p-8">
            <StylistForm action={addStylistAction} />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
