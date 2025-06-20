
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { UploadCloud, Loader2, PackagePlus } from "lucide-react";
import NextImage from "next/image";
import { useState, ChangeEvent, useEffect, useRef } from "react";
import type { Product, ActionResponse } from "@/lib/types";
import { useActionState } from "react";
import { useRouter } from "next/navigation";

const productFormSchema = z.object({
  name: z.string().min(3, { message: "Product name must be at least 3 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  price: z.string().regex(/^R\d+(\.\d{2})?$/, { message: "Price must be in 'RXXX.XX' format (e.g., R100 or R150.50)." }),
  category: z.string().min(2, { message: "Category must be at least 2 characters." }),
  stockStatus: z.enum(['In Stock', 'Out of Stock']),
  imageFile: z.instanceof(File).optional().nullable()
    .refine(file => !file || file.size <= 5 * 1024 * 1024, { message: "Image must be less than 5MB." })
    .refine(file => !file || ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type), { message: "Only .jpg, .png, .webp, .gif formats are supported." }),
  imageHint: z.string().min(2, { message: "Image hint must be at least 2 characters." }).max(50, { message: "Image hint must be less than 50 characters." }),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

interface ProductFormProps {
  initialData?: Product;
  action: (prevState: ActionResponse | undefined, formData: FormData) => Promise<ActionResponse>;
  onSuccess?: () => void;
}

const initialState: ActionResponse = { success: false };

export function ProductForm({ initialData, action, onSuccess }: ProductFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(action, initialState);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageHint ? `https://placehold.co/600x400.png?text=${initialData.name}` : null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: initialData?.name || state?.fieldValues?.name || "",
      description: initialData?.description || state?.fieldValues?.description || "",
      price: initialData?.price || state?.fieldValues?.price || "",
      category: initialData?.category || state?.fieldValues?.category || "",
      stockStatus: initialData?.stockStatus || (state?.fieldValues?.stockStatus as 'In Stock' | 'Out of Stock') || 'In Stock',
      imageFile: null,
      imageHint: initialData?.imageHint || state?.fieldValues?.imageHint || "",
    },
  });

  useEffect(() => {
    if (state.success) {
      // For updates, the action handles redirection. Toasts are for add page.
      if (!initialData) {
        toast({
          title: "Product Added! ✨",
          description: state.message,
          className: "bg-primary text-primary-foreground border-accent",
        });
        form.reset({ name: "", description: "", price: "", category: "", stockStatus: 'In Stock', imageFile: null, imageHint: "" });
        setImagePreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        toast({
          title: "Product Updated! ✨",
          description: state.message || "Product details have been successfully updated.",
          className: "bg-primary text-primary-foreground border-accent",
        });
      }
      if (onSuccess) onSuccess();

    } else if (state.message && !state.success && state !== initialState) {
      toast({
        variant: "destructive",
        title: "Operation Failed",
        description: state.message,
      });
      if (state.errors) {
        Object.entries(state.errors).forEach(([field, messages]) => {
          if (messages && messages.length > 0) {
            form.setError(field as keyof ProductFormValues, { type: 'server', message: messages.join(', ') });
          }
        });
      }
    }
  }, [state, toast, form, onSuccess, initialData]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("imageFile", file, { shouldValidate: true });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      form.setValue("imageFile", null);
      setImagePreview(null);
    }
  };
  
  return (
    <Form {...form}>
      <form action={formAction} className="space-y-8">
        {initialData?.id && <input type="hidden" name="id" value={initialData.id} />}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg text-accent">Product Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Sparkle Shine Shampoo" {...field} className="text-base py-5 focus:border-primary focus:ring-primary" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg text-accent">Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the product in detail..."
                  {...field}
                  className="text-base min-h-[120px] focus:border-primary focus:ring-primary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg text-accent">Price</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="e.g., R280 or R280.00" {...field} className="text-base py-5 focus:border-primary focus:ring-primary" />
                </FormControl>
                 <FormDescription>Enter price starting with 'R'.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg text-accent">Category</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Hair Care" {...field} className="text-base py-5 focus:border-primary focus:ring-primary" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="stockStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg text-accent">Stock Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="text-base py-5 focus:border-primary focus:ring-primary">
                    <SelectValue placeholder="Select stock status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="In Stock">In Stock</SelectItem>
                  <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
            control={form.control}
            name="imageHint"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="text-lg text-accent">Image AI Hint</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., shampoo bottle" {...field} className="text-base py-5 focus:border-primary focus:ring-primary" />
                </FormControl>
                <FormDescription>
                    Provide 1-2 keywords for AI to find a suitable placeholder image later (e.g., "pink lipstick"). This is used if no image is uploaded.
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
        />

        <FormField
          control={form.control}
          name="imageFile"
          render={({ field: { onChange, value, ...restField } }) => ( 
            <FormItem>
              <FormLabel className="text-lg text-accent">Product Image (Optional)</FormLabel>
              <FormControl>
                <div className="flex flex-col items-center space-y-4">
                  <label htmlFor="imageUploadProduct" className="w-full cursor-pointer">
                    <div className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-input-border rounded-lg hover:border-primary transition-colors bg-muted/50 hover:bg-muted">
                      {imagePreview ? (
                        <NextImage src={imagePreview} alt="Image Preview" width={150} height={150} className="max-h-44 w-auto object-contain rounded-md" />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                          <UploadCloud className="w-12 h-12 mb-2" />
                          <p className="text-sm">Click or drag & drop to upload</p>
                          <p className="text-xs">PNG, JPG, GIF, WEBP up to 5MB</p>
                        </div>
                      )}
                    </div>
                  </label>
                  <Input
                    id="imageUploadProduct"
                    name="imageFile" // Ensure name matches FormData key
                    type="file"
                    accept="image/png, image/jpeg, image/webp, image/gif"
                    onChange={handleImageChange} 
                    ref={fileInputRef} // Assign ref here
                    className="hidden"
                    // {...restField} // Not needed if manually handling
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" size="lg" className="w-full text-xl py-7 sparkle-hover group" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              {initialData ? "Updating Product..." : "Adding Product..."}
            </>
          ) : (
            <>
              <PackagePlus className="mr-3 h-6 w-6 group-hover:animate-pulse transition-transform" />
              {initialData ? "Update Product" : "Add Product to Catalog"}
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
