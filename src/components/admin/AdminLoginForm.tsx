"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lock, LogIn } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type LoginFormValues = z.infer<typeof formSchema>;

export function AdminLoginForm() {
  const { toast } = useToast();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    // Simulate API call for login
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Admin login attempt:", data);
    // In a real app, you would handle authentication here
    toast({
      title: "Login Attempted",
      description: "This is a demo. No actual login occurred.",
      variant: "default",
      className: "bg-primary text-primary-foreground"
    });
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-2xl border-primary/50 bg-card">
      <CardHeader className="text-center">
        <Lock className="h-12 w-12 mx-auto text-primary mb-4" />
        <CardTitle className="font-headline text-4xl text-primary">Admin Access</CardTitle>
        <CardDescription className="text-lg text-foreground/70">
          Please enter your credentials to continue.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg text-accent">Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="admin@bornatbeautiful.com" {...field} className="text-lg py-6 focus:border-primary focus:ring-primary" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg text-accent">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} className="text-lg py-6 focus:border-primary focus:ring-primary" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="w-full text-xl py-7 sparkle-hover group" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Logging In..." : "Log In"}
               {!form.formState.isSubmitting && <LogIn className="ml-3 h-6 w-6 group-hover:rotate-12 transition-transform" />}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
