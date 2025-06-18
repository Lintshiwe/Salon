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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof formSchema>;

interface ContactFormProps {
  initialService?: string;
}

export function ContactFormComponent({ initialService }: ContactFormProps) {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: initialService ? `Inquiry about ${initialService}` : "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(data);
    toast({
      title: "Message Sent! ✨",
      description: "Thank you for contacting us. We'll get back to you soon!",
      className: "bg-primary text-primary-foreground border-accent",
    });
    form.reset();
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl border-primary/50 bg-card">
      <CardHeader className="text-center">
        <Sparkles className="h-12 w-12 mx-auto text-primary mb-4 animate-pulse" />
        <CardTitle className="font-headline text-4xl text-primary">Get In Touch!</CardTitle>
        <CardDescription className="text-lg text-foreground/70">
          We'd love to hear from you. Send us a message or book an appointment.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg text-accent">Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Barbie Doll" {...field} className="text-lg py-6 focus:border-primary focus:ring-primary" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg text-accent">Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="barbie@dreamhouse.com" {...field} className="text-lg py-6 focus:border-primary focus:ring-primary" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg text-accent">Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Booking Inquiry" {...field} className="text-lg py-6 focus:border-primary focus:ring-primary" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg text-accent">Your Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us how we can make your day beautiful..."
                      {...field}
                      className="text-lg min-h-[150px] focus:border-primary focus:ring-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="w-full text-xl py-7 sparkle-hover group" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Sending..." : "Send Message"}
              {!form.formState.isSubmitting && <Send className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
