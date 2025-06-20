
import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/ui/PageHeader';
import { ServiceForm } from '@/components/admin/ServiceForm';
import { Card, CardContent } from '@/components/ui/card';
import { addServiceAction } from '@/app/admin/services/actions';

export default function AddServicePage() {
  return (
    <AppShell>
      <PageHeader 
        title="Add New Service"
        description="Create a new glamorous service for Born@Beautiful."
      />
      <div className="container py-12 md:py-16">
        <Card className="max-w-2xl mx-auto shadow-xl border-primary/30">
          <CardContent className="p-6 md:p-8">
            <ServiceForm action={addServiceAction} />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
