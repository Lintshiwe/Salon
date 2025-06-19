
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
import { useToast } from "@/hooks/use-toast";
import { UploadCloud, Loader2, Wand2 } from "lucide-react";
import NextImage from "next/image";
import { useState, ChangeEvent, useEffect } from "react";
import type { Service, ActionResponse } from "@/lib/types";
import { addServiceAction } from "@/app/admin/services/actions";
import { useFormState } from "react-dom";

const serviceFormSchema = z.object({
  name: z.string().min(3, { message: "Service name must be at least 3 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  price: z.string().regex(/^R\d+(\.\d{2})?$/, { message: "Price must be in 'RXXX.XX' format (e.g., R100 or R150.50)." }),
  duration: z.string().optional(),
  imageFile: z.instanceof(File).optional().nullable()
    .refine(file => !file || file.size <= 5 * 1024 * 1024, { message: "Image must be less than 5MB." })
    .refine(file => !file || ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type), { message: "Only .jpg, .png, .webp, .gif formats are supported." }),
  imageHint: z.string().min(2, { message: "Image hint must be at least 2 characters." }).max(50, { message: "Image hint must be less than 50 characters." }),
});

type ServiceFormValues = z.infer<typeof serviceFormSchema>;

interface ServiceFormProps {
  initialData?: Partial<Service>;
  onSubmitSuccess?: () => void;
}

const initialState: ActionResponse = { success: false };

export function ServiceForm({ initialData, onSubmitSuccess }: ServiceFormProps) {
  const { toast } = useToast();
  const [state, formAction] = useFormState(addServiceAction, initialState);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageHint ? `https://placehold.co/600x400.png?text=${initialData.name}` : null);
 
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      name: initialData?.name || state?.fieldValues?.name || "",
      description: initialData?.description || state?.fieldValues?.description || "",
      price: initialData?.price || state?.fieldValues?.price || "",
      duration: initialData?.duration || state?.fieldValues?.duration || "",
      imageFile: null,
      imageHint: initialData?.imageHint || state?.fieldValues?.imageHint ||"",
    },
  });

 useEffect(() => {
    if (state.success) {
      toast({
        title: "Service Added! ✨",
        description: state.message,
        className: "bg-primary text-primary-foreground border-accent",
      });
      form.reset({ name: "", description: "", price: "", duration: "", imageFile: null, imageHint: "" });
      setImagePreview(null);
      if (onSubmitSuccess) onSubmitSuccess();
    } else if (state.message && !state.success) {
       toast({
        variant: "destructive",
        title: "Operation Failed",
        description: state.message,
      });
      if (state.errors) {
        Object.entries(state.errors).forEach(([field, messages]) => {
          if (messages && messages.length > 0) {
            form.setError(field as keyof ServiceFormValues, { type: 'server', message: messages.join(', ') });
          }
        });
      }
    }
  }, [state, toast, form, onSubmitSuccess]);


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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg text-accent">Service Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Signature Haircut & Style" {...field} className="text-base py-5 focus:border-primary focus:ring-primary" />
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
                  placeholder="Describe the service in detail..."
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
                  <Input type="text" placeholder="e.g., R750 or R750.00" {...field} className="text-base py-5 focus:border-primary focus:ring-primary" />
                </FormControl>
                <FormDescription>Enter price starting with 'R' (e.g., R100 or R120.50).</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg text-accent">Duration (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 60 mins" {...field} className="text-base py-5 focus:border-primary focus:ring-primary" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
            control={form.control}
            name="imageHint"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="text-lg text-accent">Image AI Hint</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., haircut styling" {...field} className="text-base py-5 focus:border-primary focus:ring-primary" />
                </FormControl>
                <FormDescription>
                    Provide 1-2 keywords for AI to find a suitable placeholder image later (e.g., "manicure hands"). This is used if no image is uploaded.
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
              <FormLabel className="text-lg text-accent">Service Image (Optional)</FormLabel>
              <FormControl>
                <div className="flex flex-col items-center space-y-4">
                  <label htmlFor="imageUploadService" className="w-full cursor-pointer">
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
                    id="imageUploadService"
                    type="file"
                    accept="image/png, image/jpeg, image/webp, image/gif"
                    onChange={handleImageChange}
                    className="hidden"
                    {...restField} 
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" size="lg" className="w-full text-xl py-7 sparkle-hover group" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              {initialData ? "Updating Service..." : "Adding Service..."}
            </>
          ) : (
            <>
              <Wand2 className="mr-3 h-6 w-6 group-hover:animate-pulse transition-transform" />
              {initialData ? "Update Service" : "Add Service to Menu"}
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
