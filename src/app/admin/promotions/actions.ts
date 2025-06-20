
'use server';

import { promotedItems, services, products } from '@/data/mockData';
import type { ActionResponse, PromotedItemIdentifier } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export async function addPromotionAction(
  prevState: ActionResponse | undefined,
  formData: FormData
): Promise<ActionResponse> {
  const itemId = formData.get('itemId') as string;
  const itemType = formData.get('itemType') as 'service' | 'product';

  if (!itemId || !itemType) {
    return { success: false, message: 'Missing item ID or type.' };
  }

  const alreadyPromoted = promotedItems.find(p => p.id === itemId && p.type === itemType);
  if (alreadyPromoted) {
    return { success: false, message: 'This item is already promoted.' };
  }

  // Validate item exists
  if (itemType === 'service' && !services.find(s => s.id === itemId)) {
    return { success: false, message: 'Service not found.' };
  }
  if (itemType === 'product' && !products.find(p => p.id === itemId)) {
    return { success: false, message: 'Product not found.' };
  }
  
  promotedItems.push({ id: itemId, type: itemType });

  revalidatePath('/admin/promotions/manage');
  revalidatePath('/'); 
  return { success: true, message: 'Item added to promotions successfully!' };
}

export async function removePromotionAction(
  prevState: ActionResponse | undefined,
  formData: FormData
): Promise<ActionResponse> {
  const itemId = formData.get('itemId') as string;
  const itemType = formData.get('itemType') as 'service' | 'product';

  if (!itemId || !itemType) {
    return { success: false, message: 'Missing item ID or type.' };
  }

  const index = promotedItems.findIndex(p => p.id === itemId && p.type === itemType);
  if (index > -1) {
    promotedItems.splice(index, 1);
    revalidatePath('/admin/promotions/manage');
    revalidatePath('/');
    return { success: true, message: 'Item removed from promotions successfully!' };
  }
  
  return { success: false, message: 'Promoted item not found.' };
}
