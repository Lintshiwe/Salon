
"use client";

import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Sparkles, Send, Clock } from "lucide-react";
import { useSearchParams } from 'next/navigation';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const bookingFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  service: z.string(),
  date: z.date({ required_error: "A date for the booking is required." }),
  time: z.string({ required_error: "A time for the booking is required." }),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

// Example time slots - in a real app, these might be dynamic
const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM"
];

export default function BookingPage() {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const initialServiceName = searchParams.get('service') || "Unknown Service";
  const initialServicePrice = searchParams.get('price') || "N/A";
  const initialServiceDuration = searchParams.get('duration');
  
  const displayPrice = initialServicePrice.startsWith('R') ? initialServicePrice : `R${initialServicePrice.replace('$', '')}`;


  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      service: initialServiceName,
      date: undefined,
      time: undefined,
    },
  });

  async function onSubmit(data: BookingFormValues) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log({
      ...data,
      date: format(data.date, "PPP"), // Format date for logging/API
    });
    toast({
      title: "Booking Request Sent! 💖",
      description: "We've received your booking request and will confirm shortly. Get ready to sparkle!",
      className: "bg-primary text-primary-foreground border-accent",
    });
    form.reset({
      name: "",
      email: "",
      service: initialServiceName, // Keep service name
      date: undefined,
      time: undefined
    });
  }

  return (
    <AppShell>
      <PageHeader 
        title="Book Your Glam Session"
        description={`You're one step away from booking your ${initialServiceName} experience! Fill out the details below and get ready to be pampered.`}
      />
      <div className="container py-12 md:py-16">
        <Card className="w-full max-w-3xl mx-auto shadow-2xl border-primary/50 bg-card content-animate-in">
           <CardHeader className="text-center">
            <Sparkles className="h-12 w-12 mx-auto text-primary mb-4 animate-pulse" />
            <CardTitle className="font-headline text-4xl text-primary">Confirm Your Booking</CardTitle>
            <CardDescription className="text-lg text-foreground/70">
              Service: <span className="font-semibold text-accent">{initialServiceName}</span>
              {initialServicePrice !== "N/A" && ` - Price: ${displayPrice}`}
              {initialServiceDuration && ` - Duration: ${initialServiceDuration}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
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
                </div>
                
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem className="hidden">
                      <FormControl>
                        <Input type="hidden" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-lg text-accent mb-1">Preferred Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full text-lg py-6 pl-3 text-left font-normal border-input-border focus:border-primary focus:ring-primary",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-5 w-5 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date(new Date().setHours(0,0,0,0)) // Disable past dates
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg text-accent">Preferred Time</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="text-lg py-6 border-input-border focus:border-primary focus:ring-primary">
                               <Clock className="mr-2 h-5 w-5 opacity-50 -ml-1" />
                              <SelectValue placeholder="Select a time slot" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {timeSlots.map(slot => (
                              <SelectItem key={slot} value={slot} className="text-md">
                                {slot}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full text-xl py-7 sparkle-hover group transition-all duration-300 ease-out" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Submitting Request..." : "Request Booking"}
                  {!form.formState.isSubmitting && <Send className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
