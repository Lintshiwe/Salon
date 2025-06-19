
import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/ui/PageHeader';
import { ProductForm } from '@/components/admin/ProductForm';
import { Card, CardContent } from '@/components/ui/card';

export default function AddProductPage() {
  return (
    <AppShell>
      <PageHeader 
        title="Add New Product"
        description="Introduce a new fabulous item to the Born@Beautiful catalog."
      />
      <div className="container py-12 md:py-16">
        <Card className="max-w-2xl mx-auto shadow-xl border-primary/30">
          <CardContent className="p-6 md:p-8">
            <ProductForm />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
