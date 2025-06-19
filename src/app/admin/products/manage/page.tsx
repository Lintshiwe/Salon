
"use client";

import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { products as initialProducts } from '@/data/mockData';
import type { Product } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Edit3, PackageCheck, PackageX, Eye, PlusCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';

export default function ManageProductsPage() {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(initialProducts);
  }, []);


  const handleStockStatusChange = (productId: string, newStatus: 'In Stock' | 'Out of Stock') => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === productId ? { ...product, stockStatus: newStatus } : product
      )
    );
    toast({
      title: "Stock Status Updated (Simulated)",
      description: `Product "${products.find(p=>p.id === productId)?.name}" marked as ${newStatus}. This change is local and won't persist.`,
      className: "bg-primary text-primary-foreground border-accent",
    });
    console.log(`Simulated stock update: Product ${productId} to ${newStatus}`);
  };

  return (
    <AppShell>
      <PageHeader 
        title="Manage Products"
        description="Oversee your inventory of fabulous beauty products. Update stock status and details."
      />
      <div className="container py-12 md:py-16">
        <div className="flex justify-between items-center mb-8">
          <Button asChild variant="outline" className="group text-md py-5 px-6 border-primary text-primary hover:bg-primary/10 transition-all duration-300 ease-out">
            <Link href="/admin/dashboard">
              <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              Back to Dashboard
            </Link>
          </Button>
          <Button asChild className="group text-md py-5 px-6 transition-all duration-300 ease-out">
            <Link href="/admin/products/add">
              <PlusCircle className="mr-2 h-5 w-5 group-hover:animate-pulse" />
              Add New Product
            </Link>
          </Button>
        </div>

        <Card className="shadow-xl border-primary/30">
          <CardHeader>
            <CardTitle className="text-2xl text-accent">Current Products</CardTitle>
            <CardDescription>View, edit details (simulated), and manage stock status.</CardDescription>
          </CardHeader>
          <CardContent>
            {products.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Stock Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product: Product) => (
                    <TableRow key={product.id} className="hover:bg-primary/5 transition-colors">
                      <TableCell>
                        <Image
                          src={`https://placehold.co/100x100.png`}
                          alt={product.name}
                          width={60}
                          height={60}
                          className="rounded-md object-cover"
                          data-ai-hint={product.imageHint}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        <Badge variant={product.stockStatus === 'In Stock' ? 'default' : 'destructive'}>
                          {product.stockStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button variant="ghost" size="icon" className="hover:bg-blue-500/20 text-blue-500 hover:text-blue-600" title="View (placeholder)">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:bg-accent/20 text-accent hover:text-accent" title="Edit (placeholder)">
                          <Edit3 className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        {product.stockStatus === 'In Stock' ? (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="hover:bg-red-500/20 text-red-500 hover:text-red-600" 
                            title="Mark Out of Stock"
                            onClick={() => handleStockStatusChange(product.id, 'Out of Stock')}
                          >
                            <PackageX className="h-4 w-4" />
                            <span className="sr-only">Mark Out of Stock</span>
                          </Button>
                        ) : (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="hover:bg-green-500/20 text-green-500 hover:text-green-600" 
                            title="Mark In Stock"
                            onClick={() => handleStockStatusChange(product.id, 'In Stock')}
                          >
                            <PackageCheck className="h-4 w-4" />
                            <span className="sr-only">Mark In Stock</span>
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-muted-foreground text-center py-8">No products found. Add some to get started!</p>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
