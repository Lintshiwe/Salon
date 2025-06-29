import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/ui/PageHeader';
import { ProductItem } from '@/components/products/ProductItem';
import { products } from '@/data/mockData';

export default function ProductsPage() {
  return (
    <AppShell>
      <PageHeader 
        title="Shop Our Beautiful Collection"
        description="Discover our handcrafted candles, diffusers, and soaps. Each product is made with love to bring The Beauty of Life into your home."
      />
      <div className="container py-12 md:py-16">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 content-animate-in">
          {products.map((product, index) => (
             <div key={product.id} style={{ animationDelay: `${index * 100}ms` }} className="animate-in fade-in slide-in-from-bottom-5 duration-500 ease-out">
              <ProductItem product={product} />
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}