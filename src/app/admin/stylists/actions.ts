
'use server';

import { stylists } from '@/data/mockData';
import type { Stylist, ActionResponse } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const StylistSchema = z.object({
  name: z.string().min(3, { message: "Stylist name must be at least 3 characters." }),
  bio: z.string().min(10, { message: "Bio must be at least 10 characters." }),
  specializations: z.string().min(3, { message: "Please provide at least one specialization." }),
  imageHint: z.string().min(2, { message: "Image hint must be at least 2 characters." }).max(50, { message: "Image hint must be less than 50 characters." }),
});

const StylistUpdateSchema = StylistSchema.extend({
  id: z.string().min(1, { message: "Stylist ID is required for an update." }),
});


export async function addStylistAction(
  prevState: ActionResponse | undefined,
  formData: FormData
): Promise<ActionResponse> {
  const rawData = {
    name: formData.get('name'),
    bio: formData.get('bio'),
    specializations: formData.get('specializations'),
    imageHint: formData.get('imageHint'),
  };

  const parseResult = StylistSchema.safeParse(rawData);

  if (!parseResult.success) {
    return {
      success: false,
      errors: parseResult.error.flatten().fieldErrors,
      message: "Validation failed. Please check the fields.",
      fieldValues: rawData as Record<string, string>,
    };
  }
  
  const newStylistData = parseResult.data;

  const newStylist: Stylist = {
    id: String(Date.now() + Math.random()),
    name: newStylistData.name,
    bio: newStylistData.bio,
    specializations: newStylistData.specializations.split(',').map(s => s.trim()).filter(Boolean),
    imageHint: newStylistData.imageHint,
  };

  stylists.unshift(newStylist);

  revalidatePath('/admin/stylists/manage');
  revalidatePath('/stylists');

  return { success: true, message: `Stylist "${newStylist.name}" added successfully!` };
}

export async function updateStylistAction(
  prevState: ActionResponse | undefined,
  formData: FormData
): Promise<ActionResponse> {
  const rawData = {
    id: formData.get('id'),
    name: formData.get('name'),
    bio: formData.get('bio'),
    specializations: formData.get('specializations'),
    imageHint: formData.get('imageHint'),
  };

  const parseResult = StylistUpdateSchema.safeParse(rawData);

  if (!parseResult.success) {
    return {
      success: false,
      errors: parseResult.error.flatten().fieldErrors,
      message: "Validation failed. Please check the fields.",
      fieldValues: rawData as Record<string, string>,
    };
  }
  
  const updatedData = parseResult.data;
  const stylistIndex = stylists.findIndex(p => p.id === updatedData.id);

  if (stylistIndex === -1) {
    return { success: false, message: 'Stylist not found to update.' };
  }

  stylists[stylistIndex] = {
    ...stylists[stylistIndex],
    name: updatedData.name,
    bio: updatedData.bio,
    specializations: updatedData.specializations.split(',').map(s => s.trim()).filter(Boolean),
    imageHint: updatedData.imageHint,
  };

  revalidatePath('/admin/stylists/manage');
  revalidatePath('/stylists');

  redirect('/admin/stylists/manage');
}

export async function deleteStylistAction(stylistId: string): Promise<ActionResponse> {
  const index = stylists.findIndex(p => p.id === stylistId);
  if (index > -1) {
    const deletedStylistName = stylists[index].name;
    stylists.splice(index, 1);
    
    revalidatePath('/admin/stylists/manage');
    revalidatePath('/stylists');
    return { success: true, message: `Stylist "${deletedStylistName}" deleted successfully!` };
  }
  return { success: false, message: 'Stylist not found.' };
}
