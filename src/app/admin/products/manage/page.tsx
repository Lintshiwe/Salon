
import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, PackageSearch } from 'lucide-react';

export default function ManageProductsPage() {
  return (
    <AppShell>
      <PageHeader 
        title="Manage Products"
        description="Oversee your inventory of fabulous beauty products."
      />
      <div className="container py-12 md:py-16 text-center content-animate-in">
        <p className="text-xl mb-8 text-foreground/80">Product management features are currently under development. Stay tuned!</p>
         <div className="max-w-lg mx-auto bg-card p-8 rounded-lg shadow-xl border border-primary/20">
            <PackageSearch className="h-16 w-16 mx-auto text-primary mb-6 animate-bounce"/>
            <h3 className="text-2xl font-semibold text-primary mb-6">Product Management Hub</h3>
            <p className="text-muted-foreground mb-6">Soon you'll be able to add new products, update existing ones, manage stock levels, and categorize your items, all from this sparkling interface!</p>
             <div className="space-y-2 text-left">
                <p className="flex items-center p-3 bg-secondary/30 rounded-md"><span className="font-semibold mr-2">Product List:</span> View all your amazing products.</p>
                <p className="flex items-center p-3 bg-secondary/30 rounded-md"><span className="font-semibold mr-2">Add New:</span> Introduce the latest must-haves.</p>
                <p className="flex items-center p-3 bg-secondary/30 rounded-md"><span className="font-semibold mr-2">Edit Details:</span> Keep product info fresh.</p>
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
