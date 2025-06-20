
"use client";

import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { stylists as initialStylistsData } from '@/data/mockData';
import type { Stylist } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Edit3, PlusCircle, Trash2, Loader2, Paintbrush } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import React, { useState, useTransition, useEffect } from 'react';
import { deleteStylistAction } from '@/app/admin/stylists/actions';

export default function ManageStylistsPage() {
  const { toast } = useToast();
  const [stylists, setStylists] = useState<Stylist[]>(initialStylistsData);
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    setStylists(initialStylistsData);
  }, [initialStylistsData]);

  const handleDeleteStylist = (stylistId: string) => {
    setDeletingId(stylistId);
    startTransition(async () => {
      const result = await deleteStylistAction(stylistId);
      if (result.success) {
        toast({
          title: "Stylist Deleted!",
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
      setDeletingId(null);
    });
  };

  return (
    <AppShell>
      <PageHeader 
        title="Manage Stylists"
        description="Oversee your team of talented artists. Add, edit, or remove stylist profiles."
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
            <Link href="/admin/stylists/add">
              <PlusCircle className="mr-2 h-5 w-5 group-hover:animate-pulse" />
              Add New Stylist
            </Link>
          </Button>
        </div>

        <Card className="shadow-xl border-primary/30">
          <CardHeader>
            <CardTitle className="text-2xl text-accent flex items-center">
              <Paintbrush className="mr-3 h-6 w-6" /> Current Stylists
            </CardTitle>
            <CardDescription>View, edit, or delete stylist profiles.</CardDescription>
          </CardHeader>
          <CardContent>
            {stylists.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Bio</TableHead>
                    <TableHead>Specializations</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stylists.map((stylist: Stylist) => (
                    <TableRow key={stylist.id} className="hover:bg-primary/5 transition-colors">
                      <TableCell>
                        <Image
                          src={`https://placehold.co/100x100.png`}
                          alt={stylist.name}
                          width={60}
                          height={60}
                          className="rounded-full object-cover"
                          data-ai-hint={stylist.imageHint}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{stylist.name}</TableCell>
                      <TableCell className="max-w-sm truncate">{stylist.bio}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {stylist.specializations.map((spec, i) => <Badge key={i} variant="secondary">{spec}</Badge>)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button asChild variant="ghost" size="icon" className="hover:bg-accent/20 text-accent hover:text-accent" title="Edit">
                          <Link href={`/admin/stylists/edit/${stylist.id}`}>
                            <Edit3 className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Link>
                        </Button>
                         <Button 
                          variant="ghost" 
                          size="icon" 
                          className="hover:bg-destructive/20 text-destructive hover:text-destructive"
                          onClick={() => handleDeleteStylist(stylist.id)}
                          disabled={isPending && deletingId === stylist.id}
                          title="Delete Stylist"
                        >
                          {isPending && deletingId === stylist.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                          <span className="sr-only">Delete Stylist</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-muted-foreground text-center py-8">No stylists found. Add one to get started!</p>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
