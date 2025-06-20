
import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/ui/PageHeader';
import { ProductForm } from '@/components/admin/ProductForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { products } from '@/data/mockData';
import { updateProductAction } from '@/app/admin/products/actions';
import { notFound } from 'next/navigation';

export default function EditProductPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <AppShell>
      <PageHeader
        title="Edit Product"
        description={`You are currently editing "${product.name}".`}
      />
      <div className="container py-12 md:py-16">
        <Card className="max-w-2xl mx-auto shadow-xl border-primary/30">
           <CardHeader>
            <CardTitle className="text-2xl text-accent">Update Product Details</CardTitle>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <ProductForm initialData={product} action={updateProductAction} />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
