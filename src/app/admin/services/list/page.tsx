
"use client";
import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { services as initialServices } from '@/data/mockData';
import type { Service } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, PlusCircle, Edit3, Trash2, Eye, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { deleteServiceAction } from '@/app/admin/services/actions';
import React, { useState, useTransition } from 'react';

export default function ListServicesPage() {
  const { toast } = useToast();
  // initialServices will be updated by server action revalidation
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDeleteService = async (serviceId: string) => {
    setDeletingId(serviceId);
    startTransition(async () => {
      const result = await deleteServiceAction(serviceId);
      if (result.success) {
        toast({
          title: "Service Deleted!",
          description: result.message,
          className: "bg-primary text-primary-foreground border-accent",
        });
        // Data is revalidated by server action
      } else {
        toast({
          variant: "destructive",
          title: "Deletion Failed",
          description: result.message,
        });
      }
      setDeletingId(null);
    });
  };

  const handleViewService = (serviceName: string) => {
    toast({
      title: "View Service",
      description: `Simulating: Viewing details for "${serviceName}"... (Full feature coming soon!)`,
      className: "bg-primary text-primary-foreground border-accent",
    });
  };

  return (
    <AppShell>
      <PageHeader 
        title="Manage Services"
        description="Oversee all the glamorous services offered at Born2bBeautiful."
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
            <Link href="/admin/services/add">
              <PlusCircle className="mr-2 h-5 w-5 group-hover:animate-pulse" />
              Add New Service
            </Link>
          </Button>
        </div>

        <Card className="shadow-xl border-primary/30">
          <CardHeader>
            <CardTitle className="text-2xl text-accent">Current Services</CardTitle>
            <CardDescription>View, edit, or delete existing services. Data is updated from server memory.</CardDescription>
          </CardHeader>
          <CardContent>
            {initialServices.length > 0 ? ( 
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {initialServices.map((service: Service) => (
                    <TableRow key={service.id} className="hover:bg-primary/5 transition-colors">
                      <TableCell>
                        <Image
                          src={`https://placehold.co/100x100.png`}
                          alt={service.name}
                          width={60}
                          height={60}
                          className="rounded-md object-cover"
                          data-ai-hint={service.imageHint}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{service.name}</TableCell>
                      <TableCell>{service.price}</TableCell>
                      <TableCell>{service.duration || 'N/A'}</TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="hover:bg-blue-500/20 text-blue-500 hover:text-blue-600" 
                          title="View Details"
                          onClick={() => handleViewService(service.name)}
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        <Button 
                          asChild
                          variant="ghost" 
                          size="icon" 
                          className="hover:bg-accent/20 text-accent hover:text-accent" 
                          title="Edit Service"
                        >
                          <Link href={`/admin/services/edit/${service.id}`}>
                            <Edit3 className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Link>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="hover:bg-destructive/20 text-destructive hover:text-destructive"
                          onClick={() => handleDeleteService(service.id)}
                          disabled={isPending && deletingId === service.id}
                          title="Delete Service"
                        >
                          {isPending && deletingId === service.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                          <span className="sr-only">Delete</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-muted-foreground text-center py-8">No services found. Add one to get started!</p>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
