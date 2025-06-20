
import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/ui/PageHeader';
import { StylistForm } from '@/components/admin/StylistForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { stylists } from '@/data/mockData';
import { updateStylistAction } from '@/app/admin/stylists/actions';
import { notFound } from 'next/navigation';

export default function EditStylistPage({ params }: { params: { id: string } }) {
  const stylist = stylists.find(p => p.id === params.id);

  if (!stylist) {
    notFound();
  }

  return (
    <AppShell>
      <PageHeader
        title="Edit Stylist"
        description={`You are currently editing "${stylist.name}".`}
      />
      <div className="container py-12 md:py-16">
        <Card className="max-w-2xl mx-auto shadow-xl border-primary/30">
           <CardHeader>
            <CardTitle className="text-2xl text-accent">Update Stylist Details</CardTitle>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <StylistForm initialData={stylist} action={updateStylistAction} />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
