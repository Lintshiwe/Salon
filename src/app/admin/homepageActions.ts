
'use server';

import { setHeroImageSrc } from '@/data/mockData';
import { revalidatePath } from 'next/cache';
import type { ActionResponse } from '@/lib/types';

export async function updateHomepageHeroImageAction(
  prevState: ActionResponse | undefined,
  formData: FormData
): Promise<ActionResponse> {
  const file = formData.get('heroImage') as File | null;

  if (!file || file.size === 0) {
    return { success: false, message: 'No image file provided or file is empty.' };
  }

  if (file.size > 5 * 1024 * 1024) { // 5MB limit
    return { success: false, message: 'Image file is too large (max 5MB).' };
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    return { success: false, message: 'Invalid file type. Only JPG, PNG, WEBP, GIF are allowed.' };
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const dataUri = `data:${file.type};base64,${buffer.toString('base64')}`;
    
    setHeroImageSrc(dataUri); 

    revalidatePath('/'); 
    return { success: true, message: 'Homepage hero image updated successfully! The change will be visible on the homepage.' };
  } catch (error) {
    console.error('Error processing image for homepage hero:', error);
    return { success: false, message: 'Failed to process image.' };
  }
}
