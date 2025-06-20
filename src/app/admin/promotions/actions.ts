
'use server';

import { promotedItems, services, products } from '@/data/mockData';
import type { ActionResponse, PromotedItemIdentifier } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const AddPromotionSchema = z.object({
  itemId: z.string().min(1, { message: 'Item ID is required.' }),
  itemType: z.enum(['service', 'product']),
  discountPercentage: z.coerce
    .number({ invalid_type_error: "Discount must be a number." })
    .min(1, { message: "Discount must be at least 1%." })
    .max(99, { message: "Discount cannot be more than 99%." }),
});

export async function addPromotionAction(
  prevState: ActionResponse | undefined,
  formData: FormData
): Promise<ActionResponse> {
  const rawData = {
    itemId: formData.get('itemId'),
    itemType: formData.get('itemType'),
    discountPercentage: formData.get('discountPercentage'),
  };
  
  const parseResult = AddPromotionSchema.safeParse(rawData);

  if (!parseResult.success) {
    const error = parseResult.error.flatten().fieldErrors.discountPercentage?.[0];
    return { success: false, message: error || 'Invalid discount percentage.' };
  }

  const { itemId, itemType, discountPercentage } = parseResult.data;

  const alreadyPromoted = promotedItems.find(p => p.id === itemId && p.type === itemType);
  if (alreadyPromoted) {
    return { success: false, message: 'This item is already promoted.' };
  }

  if (itemType === 'service' && !services.find(s => s.id === itemId)) {
    return { success: false, message: 'Service not found.' };
  }
  if (itemType === 'product' && !products.find(p => p.id === itemId)) {
    return { success: false, message: 'Product not found.' };
  }
  
  promotedItems.push({ id: itemId, type: itemType, discountPercentage });

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
