
'use server';

import { products } from '@/data/mockData';
import type { Product, ActionResponse } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const ProductSchema = z.object({
  name: z.string().min(3, { message: "Product name must be at least 3 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  price: z.string().regex(/^R\d+(\.\d{2})?$/, { message: "Price must be in 'RXXX.XX' format (e.g., R100 or R150.50)." }),
  category: z.string().min(2, { message: "Category must be at least 2 characters." }),
  stockStatus: z.enum(['In Stock', 'Out of Stock']),
  imageHint: z.string().min(2, { message: "Image hint must be at least 2 characters." }).max(50, { message: "Image hint must be less than 50 characters." }),
});

export async function addProductAction(
  prevState: ActionResponse | undefined,
  formData: FormData
): Promise<ActionResponse> {
  const rawData = {
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    category: formData.get('category'),
    stockStatus: formData.get('stockStatus'),
    imageHint: formData.get('imageHint'),
  };

  const parseResult = ProductSchema.safeParse(rawData);

  if (!parseResult.success) {
    console.error("Validation failed:", parseResult.error.flatten().fieldErrors);
    return {
      success: false,
      errors: parseResult.error.flatten().fieldErrors,
      message: "Validation failed. Please check the fields.",
      fieldValues: rawData as Record<string, string>,
    };
  }
  
  const newProductData = parseResult.data;

  const newProduct: Product = {
    id: String(Date.now() + Math.random()), // More unique ID for mock
    name: newProductData.name,
    description: newProductData.description,
    price: newProductData.price,
    category: newProductData.category,
    stockStatus: newProductData.stockStatus,
    imageHint: newProductData.imageHint,
  };

  products.unshift(newProduct); // Add to the beginning

  revalidatePath('/admin/products/manage');
  revalidatePath('/products'); // Public products page
  revalidatePath('/'); // Homepage might feature products

  return { success: true, message: `Product "${newProduct.name}" added successfully!` };
}

export async function updateProductStockAction(productId: string, newStatus: 'In Stock' | 'Out of Stock'): Promise<ActionResponse> {
  const productIndex = products.findIndex(p => p.id === productId);
  if (productIndex > -1) {
    products[productIndex].stockStatus = newStatus;
    
    revalidatePath('/admin/products/manage');
    revalidatePath('/products');
    revalidatePath('/');
    return { success: true, message: `Stock status for "${products[productIndex].name}" updated to ${newStatus}.` };
  }
  return { success: false, message: 'Product not found.' };
}

export async function deleteProductAction(productId: string): Promise<ActionResponse> {
  const index = products.findIndex(p => p.id === productId);
  if (index > -1) {
    const deletedProductName = products[index].name;
    products.splice(index, 1);
    
    revalidatePath('/admin/products/manage');
    revalidatePath('/products');
    revalidatePath('/');
    return { success: true, message: `Product "${deletedProductName}" deleted successfully!` };
  }
  return { success: false, message: 'Product not found.' };
}
