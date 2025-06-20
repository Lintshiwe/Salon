
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
import { Loader2, Paintbrush } from "lucide-react";
import type { Stylist, ActionResponse } from "@/lib/types";
import { useActionState, useEffect } from "react";

const stylistFormSchema = z.object({
  name: z.string().min(3, { message: "Stylist name must be at least 3 characters." }),
  bio: z.string().min(10, { message: "Bio must be at least 10 characters." }),
  specializations: z.string().min(3, { message: "Please provide at least one specialization." }),
  imageHint: z.string().min(2, { message: "Image hint must be at least 2 characters." }).max(50, { message: "Image hint must be less than 50 characters." }),
});

type StylistFormValues = z.infer<typeof stylistFormSchema>;

interface StylistFormProps {
  initialData?: Stylist;
  action: (prevState: ActionResponse | undefined, formData: FormData) => Promise<ActionResponse>;
}

const initialState: ActionResponse = { success: false };

export function StylistForm({ initialData, action }: StylistFormProps) {
  const { toast } = useToast();
  const [state, formAction, isPending] = useActionState(action, initialState);

  const form = useForm<StylistFormValues>({
    resolver: zodResolver(stylistFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      bio: initialData?.bio || "",
      specializations: initialData?.specializations?.join(', ') || "",
      imageHint: initialData?.imageHint || "",
    },
  });

  useEffect(() => {
    if (state.success) {
      if (!initialData) {
        toast({
          title: "Stylist Added! ✨",
          description: state.message,
          className: "bg-primary text-primary-foreground border-accent",
        });
        form.reset({ name: "", bio: "", specializations: "", imageHint: "" });
      } else {
        toast({
          title: "Stylist Updated! ✨",
          description: state.message || "Stylist details have been successfully updated.",
          className: "bg-primary text-primary-foreground border-accent",
        });
      }
    } else if (state.message && !state.success && state !== initialState) {
      toast({
        variant: "destructive",
        title: "Operation Failed",
        description: state.message,
      });
      if (state.errors) {
        Object.entries(state.errors).forEach(([field, messages]) => {
          if (messages && messages.length > 0) {
            form.setError(field as keyof StylistFormValues, { type: 'server', message: messages.join(', ') });
          }
        });
      }
    }
  }, [state, toast, form, initialData]);
  
  return (
    <Form {...form}>
      <form action={formAction} className="space-y-8">
        {initialData?.id && <input type="hidden" name="id" value={initialData.id} />}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg text-accent">Stylist Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Bella Sparkle" {...field} className="text-base py-5 focus:border-primary focus:ring-primary" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg text-accent">Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the stylist's experience and passion..."
                  {...field}
                  className="text-base min-h-[120px] focus:border-primary focus:ring-primary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="specializations"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg text-accent">Specializations</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Creative Coloring, Updos" {...field} className="text-base py-5 focus:border-primary focus:ring-primary" />
              </FormControl>
              <FormDescription>
                Enter a comma-separated list of specializations.
              </FormDescription>
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
                    <Input placeholder="e.g., hairstylist portrait" {...field} className="text-base py-5 focus:border-primary focus:ring-primary" />
                </FormControl>
                <FormDescription>
                    Provide 1-2 keywords for AI to find a suitable placeholder image later.
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
        />
        
        <Button type="submit" size="lg" className="w-full text-xl py-7 sparkle-hover group" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              {initialData ? "Updating Stylist..." : "Adding Stylist..."}
            </>
          ) : (
            <>
              <Paintbrush className="mr-3 h-6 w-6 group-hover:animate-pulse transition-transform" />
              {initialData ? "Update Stylist" : "Add Stylist to Team"}
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
