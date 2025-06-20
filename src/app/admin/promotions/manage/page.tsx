
"use client";

import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { services as allServices, products as allProducts, promotedItems as currentPromotedItems } from '@/data/mockData';
import type { Service, Product, PromotedItemIdentifier, ActionResponse } from '@/lib/types';
import Link from 'next/link';
import { ArrowLeft, PlusCircle, Trash2, Loader2, Tag, Megaphone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import React, { useTransition, useEffect, useState } from 'react';
import { useActionState } from 'react';
import { addPromotionAction, removePromotionAction } from '../actions'; 

const initialActionState: ActionResponse = { success: false };

export default function ManagePromotionsPage() {
  const { toast } = useToast();
  
  const [addState, addAction, isAddPending] = useActionState(addPromotionAction, initialActionState);
  const [removeState, removeAction, isRemovePending] = useActionState(removePromotionAction, initialActionState);

  const [promotedItems, setPromotedItems] = useState<PromotedItemIdentifier[]>(currentPromotedItems);
  const [services, setServices] = useState<Service[]>(allServices);
  const [products, setProducts] = useState<Product[]>(allProducts);

  useEffect(() => {
    setPromotedItems(currentPromotedItems);
    setServices(allServices);
    setProducts(allProducts);
  }, [currentPromotedItems, allServices, allProducts]);


  useEffect(() => {
    if (addState !== initialActionState && addState.message) {
      if (addState.success) {
        toast({ title: "Promotion Added!", description: addState.message, className: "bg-primary text-primary-foreground border-accent" });
      } else {
        toast({ variant: "destructive", title: "Failed to Add", description: addState.message });
      }
    }
  }, [addState, toast]);

  useEffect(() => {
     if (removeState !== initialActionState && removeState.message) {
      if (removeState.success) {
        toast({ title: "Promotion Removed!", description: removeState.message, className: "bg-primary text-primary-foreground border-accent" });
      } else {
        toast({ variant: "destructive", title: "Failed to Remove", description: removeState.message });
      }
    }
  }, [removeState, toast]);


  const availableServices = services.filter(service => !promotedItems.some(p => p.id === service.id && p.type === 'service'));
  const availableProducts = products.filter(product => !promotedItems.some(p => p.id === product.id && p.type === 'product'));

  const promotedServices = promotedItems
    .filter(p => p.type === 'service')
    .map(p => {
        const service = services.find(s => s.id === p.id);
        return service ? { ...service, ...p } : null;
    })
    .filter(s => s !== null) as (Service & PromotedItemIdentifier)[];

  const promotedProducts = promotedItems
    .filter(p => p.type === 'product')
    .map(p => {
        const product = products.find(prod => prod.id === p.id);
        return product ? { ...product, ...p } : null;
    })
    .filter(prod => prod !== null) as (Product & PromotedItemIdentifier)[];

  const isLoading = isAddPending || isRemovePending;

  return (
    <AppShell>
      <PageHeader 
        title="Manage Promotions"
        description="Select which services and products are featured in the 'Magical Deals & Delights' section on the homepage."
      />
      <div className="container py-12 md:py-16">
        <div className="mb-8">
          <Button asChild variant="outline" className="group text-md py-5 px-6 border-primary text-primary hover:bg-primary/10 transition-all duration-300 ease-out">
            <Link href="/admin/dashboard">
              <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-xl border-primary/30">
            <CardHeader>
              <CardTitle className="text-2xl text-accent flex items-center"><PlusCircle className="mr-3 h-7 w-7"/>Add to Promotions</CardTitle>
              <CardDescription>Select items to feature and set a discount percentage.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">Available Services</h3>
                {availableServices.length > 0 ? (
                  <ul className="space-y-2">
                    {availableServices.map(service => (
                      <li key={service.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-md hover:bg-secondary/50 transition-colors">
                        <span>{service.name}</span>
                        <form action={addAction} className="flex items-center">
                            <input type="hidden" name="itemId" value={service.id} />
                            <input type="hidden" name="itemType" value="service" />
                            <Input name="discountPercentage" type="number" placeholder="%" className="w-20 mx-2 text-base py-1 h-9" required />
                            <Button type="submit" size="sm" variant="outline" className="border-accent text-accent hover:bg-accent/10" disabled={isLoading}>
                                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Tag className="mr-2 h-4 w-4"/>}
                                Promote
                            </Button>
                        </form>
                      </li>
                    ))}
                  </ul>
                ) : <p className="text-muted-foreground">No more services to promote.</p>}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">Available Products</h3>
                {availableProducts.length > 0 ? (
                  <ul className="space-y-2">
                    {availableProducts.map(product => (
                      <li key={product.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-md hover:bg-secondary/50 transition-colors">
                        <span>{product.name}</span>
                         <form action={addAction} className="flex items-center">
                            <input type="hidden" name="itemId" value={product.id} />
                            <input type="hidden" name="itemType" value="product" />
                            <Input name="discountPercentage" type="number" placeholder="%" className="w-20 mx-2 text-base py-1 h-9" required />
                            <Button type="submit" size="sm" variant="outline" className="border-accent text-accent hover:bg-accent/10" disabled={isLoading}>
                                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Tag className="mr-2 h-4 w-4"/>}
                                Promote
                            </Button>
                        </form>
                      </li>
                    ))}
                  </ul>
                ) : <p className="text-muted-foreground">No more products to promote.</p>}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-destructive/30">
            <CardHeader>
              <CardTitle className="text-2xl text-destructive flex items-center"><Megaphone className="mr-3 h-7 w-7"/>Current Promotions</CardTitle>
              <CardDescription>Manage items currently featured on the homepage.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div>
                <h3 className="text-xl font-semibold text-destructive mb-3">Promoted Services</h3>
                {promotedServices.length > 0 ? (
                  <ul className="space-y-2">
                    {promotedServices.map(service => (
                      <li key={service.id} className="flex items-center justify-between p-3 bg-red-500/10 rounded-md hover:bg-red-500/20 transition-colors">
                        <span>{service.name} <span className="font-bold text-destructive">({service.discountPercentage}% off)</span></span>
                        <form action={removeAction}>
                            <input type="hidden" name="itemId" value={service.id} />
                            <input type="hidden" name="itemType" value="service" />
                            <Button type="submit" size="sm" variant="outline" className="border-destructive text-destructive hover:bg-destructive/10" disabled={isLoading}>
                                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4"/>}
                                Remove
                            </Button>
                        </form>
                      </li>
                    ))}
                  </ul>
                ) : <p className="text-muted-foreground">No services are currently promoted.</p>}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-destructive mb-3">Promoted Products</h3>
                {promotedProducts.length > 0 ? (
                  <ul className="space-y-2">
                    {promotedProducts.map(product => (
                      <li key={product.id} className="flex items-center justify-between p-3 bg-red-500/10 rounded-md hover:bg-red-500/20 transition-colors">
                        <span>{product.name} <span className="font-bold text-destructive">({product.discountPercentage}% off)</span></span>
                        <form action={removeAction}>
                            <input type="hidden" name="itemId" value={product.id} />
                            <input type="hidden" name="itemType" value="product" />
                            <Button type="submit" size="sm" variant="outline" className="border-destructive text-destructive hover:bg-destructive/10" disabled={isLoading}>
                                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4"/>}
                                Remove
                            </Button>
                        </form>
                      </li>
                    ))}
                  </ul>
                ) : <p className="text-muted-foreground">No products are currently promoted.</p>}
              </div>
              {(promotedServices.length === 0 && promotedProducts.length === 0) && (
                <p className="text-muted-foreground text-center py-4">No items are currently promoted.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
