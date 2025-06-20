
import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/ui/PageHeader';
import { ServiceForm } from '@/components/admin/ServiceForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { services } from '@/data/mockData';
import { updateServiceAction } from '@/app/admin/services/actions';
import { notFound } from 'next/navigation';

export default function EditServicePage({ params }: { params: { id: string } }) {
  const service = services.find(s => s.id === params.id);

  if (!service) {
    notFound();
  }

  return (
    <AppShell>
      <PageHeader
        title="Edit Service"
        description={`You are currently editing "${service.name}".`}
      />
      <div className="container py-12 md:py-16">
        <Card className="max-w-2xl mx-auto shadow-xl border-primary/30">
           <CardHeader>
            <CardTitle className="text-2xl text-accent">Update Service Details</CardTitle>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <ServiceForm initialData={service} action={updateServiceAction} />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
