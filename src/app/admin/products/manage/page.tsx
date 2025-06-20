
"use client";

import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { products as initialProductsData } from '@/data/mockData'; // Renamed to avoid conflict
import type { Product, ActionResponse } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Edit3, PackageCheck, PackageX, Eye, PlusCircle, Trash2, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import React, { useState, useTransition, useEffect } from 'react';
import { updateProductStockAction, deleteProductAction } from '@/app/admin/products/actions';

export default function ManageProductsPage() {
  const { toast } = useToast();
  // This local state is not strictly necessary if revalidatePath works perfectly,
  // but can be useful for optimistic updates or if revalidation is slow.
  // For now, we'll rely on server revalidation primarily.
  const [products, setProducts] = useState<Product[]>(initialProductsData); 
  const [isPending, startTransition] = useTransition();
  const [updatingProductId, setUpdatingProductId] = useState<string | null>(null);

  useEffect(() => {
    // If initialProductsData changes due to server revalidation, update local state
    setProducts(initialProductsData);
  }, [initialProductsData]);


  const handleStockStatusChange = (productId: string, newStatus: 'In Stock' | 'Out of Stock') => {
    setUpdatingProductId(productId);
    startTransition(async () => {
      const result = await updateProductStockAction(productId, newStatus);
      if (result.success) {
        toast({
          title: "Stock Status Updated",
          description: result.message,
          className: "bg-primary text-primary-foreground border-accent",
        });
        // Data will be revalidated by server action
      } else {
        toast({
          variant: "destructive",
          title: "Update Failed",
          description: result.message,
        });
      }
      setUpdatingProductId(null);
    });
  };

  const handleDeleteProduct = (productId: string) => {
    setUpdatingProductId(productId); // Use same state for loading indicator
    startTransition(async () => {
      const result = await deleteProductAction(productId);
       if (result.success) {
        toast({
          title: "Product Deleted!",
          description: result.message,
          className: "bg-primary text-primary-foreground border-accent",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Deletion Failed",
          description: result.message,
        });
      }
      setUpdatingProductId(null);
    });
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
            <CardDescription>View, edit details, manage stock status, and delete products. Data is updated from server memory.</CardDescription>
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
                        <Button asChild variant="ghost" size="icon" className="hover:bg-accent/20 text-accent hover:text-accent" title="Edit">
                          <Link href={`/admin/products/edit/${product.id}`}>
                            <Edit3 className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Link>
                        </Button>
                        {product.stockStatus === 'In Stock' ? (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="hover:bg-red-500/20 text-red-500 hover:text-red-600" 
                            title="Mark Out of Stock"
                            onClick={() => handleStockStatusChange(product.id, 'Out of Stock')}
                            disabled={isPending && updatingProductId === product.id}
                          >
                            {isPending && updatingProductId === product.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <PackageX className="h-4 w-4" />}
                            <span className="sr-only">Mark Out of Stock</span>
                          </Button>
                        ) : (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="hover:bg-green-500/20 text-green-500 hover:text-green-600" 
                            title="Mark In Stock"
                            onClick={() => handleStockStatusChange(product.id, 'In Stock')}
                            disabled={isPending && updatingProductId === product.id}
                          >
                             {isPending && updatingProductId === product.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <PackageCheck className="h-4 w-4" />}
                            <span className="sr-only">Mark In Stock</span>
                          </Button>
                        )}
                         <Button 
                          variant="ghost" 
                          size="icon" 
                          className="hover:bg-destructive/20 text-destructive hover:text-destructive"
                          onClick={() => handleDeleteProduct(product.id)}
                          disabled={isPending && updatingProductId === product.id}
                          title="Delete Product"
                        >
                          {isPending && updatingProductId === product.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                          <span className="sr-only">Delete Product</span>
                        </Button>
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
