
'use server';

import { services } from '@/data/mockData';
import type { Service, ActionResponse } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const ServiceSchema = z.object({
  name: z.string().min(3, { message: "Service name must be at least 3 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  price: z.string().regex(/^R\d+(\.\d{2})?$/, { message: "Price must be in 'RXXX.XX' format (e.g., R100 or R150.50)." }),
  duration: z.string().optional(),
  imageHint: z.string().min(2, { message: "Image hint must be at least 2 characters." }).max(50, { message: "Image hint must be less than 50 characters." }),
});

const ServiceUpdateSchema = ServiceSchema.extend({
  id: z.string().min(1, { message: "Service ID is required for an update." }),
});

export async function addServiceAction(
  prevState: ActionResponse | undefined,
  formData: FormData
): Promise<ActionResponse> {
  const rawData = {
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    duration: formData.get('duration'),
    imageHint: formData.get('imageHint'),
  };

  const parseResult = ServiceSchema.safeParse(rawData);

  if (!parseResult.success) {
    console.error("Validation failed:", parseResult.error.flatten().fieldErrors);
    return {
      success: false,
      errors: parseResult.error.flatten().fieldErrors,
      message: "Validation failed. Please check the fields.",
      fieldValues: rawData as Record<string, string>,
    };
  }

  const newServiceData = parseResult.data;

  const newService: Service = {
    id: String(Date.now() + Math.random()), // More unique ID for mock
    name: newServiceData.name,
    description: newServiceData.description,
    price: newServiceData.price,
    duration: newServiceData.duration || undefined,
    imageHint: newServiceData.imageHint,
    // imageFile handling would be more complex; for now, we rely on imageHint
  };

  services.unshift(newService); // Add to the beginning of the array for visibility

  revalidatePath('/admin/services/list');
  revalidatePath('/services'); // Public services page
  revalidatePath('/'); // Homepage might feature services

  return { success: true, message: `Service "${newService.name}" added successfully!` };
}

export async function updateServiceAction(
  prevState: ActionResponse | undefined,
  formData: FormData
): Promise<ActionResponse> {
  const rawData = {
    id: formData.get('id'),
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    duration: formData.get('duration'),
    imageHint: formData.get('imageHint'),
  };

  const parseResult = ServiceUpdateSchema.safeParse(rawData);

  if (!parseResult.success) {
    console.error("Validation failed:", parseResult.error.flatten().fieldErrors);
    return {
      success: false,
      errors: parseResult.error.flatten().fieldErrors,
      message: "Validation failed. Please check the fields.",
      fieldValues: rawData as Record<string, string>,
    };
  }

  const updatedServiceData = parseResult.data;
  const serviceIndex = services.findIndex(s => s.id === updatedServiceData.id);

  if (serviceIndex === -1) {
    return { success: false, message: 'Service not found to update.' };
  }

  services[serviceIndex] = {
    ...services[serviceIndex],
    ...updatedServiceData,
    duration: updatedServiceData.duration || undefined,
  };

  revalidatePath('/admin/services/list');
  revalidatePath('/services');
  revalidatePath('/');

  // Redirect to the list page after a successful update
  redirect('/admin/services/list');
}

export async function deleteServiceAction(serviceId: string): Promise<ActionResponse> {
  const index = services.findIndex(s => s.id === serviceId);
  if (index > -1) {
    const deletedServiceName = services[index].name;
    services.splice(index, 1);
    
    revalidatePath('/admin/services/list');
    revalidatePath('/services');
    revalidatePath('/');
    return { success: true, message: `Service "${deletedServiceName}" deleted successfully!` };
  }
  return { success: false, message: 'Service not found.' };
}
