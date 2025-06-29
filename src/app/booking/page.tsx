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
import { CalendarIcon, Sparkles, Send, Clock, CreditCard, ArrowLeft } from "lucide-react";
import { useSearchParams } from 'next/navigation';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PaymentForm } from "@/components/ui/payment-form";
import { useState } from "react";
import Link from "next/link";

const bookingFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  service: z.string(),
  date: z.date({ required_error: "A date for the booking is required." }),
  time: z.string({ required_error: "A time for the booking is required." }),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM"
];

export default function BookingPage() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [showPayment, setShowPayment] = useState(false);
  const [bookingData, setBookingData] = useState<BookingFormValues | null>(null);

  const initialServiceName = searchParams.get('service') || "Unknown Service";
  const initialServicePrice = searchParams.get('price') || "N/A";
  const initialServiceDuration = searchParams.get('duration');
  
  const displayPrice = initialServicePrice.startsWith('R') ? initialServicePrice : `R${initialServicePrice.replace('$', '')}`;

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: initialServiceName,
      date: undefined,
      time: undefined,
    },
  });

  async function onSubmit(data: BookingFormValues) {
    setBookingData(data);
    setShowPayment(true);
  }

  const handlePaymentSuccess = () => {
    toast({
      title: "Booking Confirmed! 💖✨",
      description: "Your payment was successful and your appointment is confirmed. We can't wait to pamper you!",
      className: "bg-primary text-primary-foreground border-accent",
    });
    
    // Reset form and hide payment
    form.reset({
      name: "",
      email: "",
      phone: "",
      service: initialServiceName,
      date: undefined,
      time: undefined
    });
    setShowPayment(false);
    setBookingData(null);
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
    setBookingData(null);
  };

  if (showPayment && bookingData) {
    return (
      <AppShell>
        <PageHeader 
          title="Complete Your Payment"
          description="Secure your appointment with our encrypted payment system"
        />
        <div className="container py-12 md:py-16">
          <div className="mb-8">
            <Button asChild variant="outline" className="group text-md py-5 px-6 border-primary text-primary hover:bg-primary/10 transition-all duration-300 ease-out">
              <button onClick={handlePaymentCancel}>
                <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                Back to Booking
              </button>
            </Button>
          </div>
          <PaymentForm
            amount={displayPrice}
            serviceName={initialServiceName}
            onPaymentSuccess={handlePaymentSuccess}
            onCancel={handlePaymentCancel}
          />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PageHeader 
        title="Book Your Glam Session"
        description={`You're one step away from booking your ${initialServiceName} experience! Fill out the details below and get ready to be pampered.`}
      />
      <div className="container py-12 md:py-16">
        <Card className="w-full max-w-4xl mx-auto shadow-2xl border-primary/50 bg-gradient-to-br from-card via-card to-primary/5 content-animate-in">
          <CardHeader className="text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 animate-pulse"></div>
            <div className="relative z-10">
              <Sparkles className="h-12 w-12 mx-auto text-primary mb-4 animate-pulse" />
              <CardTitle className="font-headline text-4xl text-primary">Confirm Your Booking</CardTitle>
              <CardDescription className="text-lg text-foreground/70 mt-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 inline-block shadow-lg">
                  <p className="font-semibold text-accent text-xl">{initialServiceName}</p>
                  {initialServicePrice !== "N/A" && (
                    <p className="text-2xl font-bold text-primary mt-2">{displayPrice}</p>
                  )}
                  {initialServiceDuration && (
                    <p className="text-sm text-muted-foreground mt-1">Duration: {initialServiceDuration}</p>
                  )}
                </div>
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-8">
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
                          <Input placeholder="Barbie Doll" {...field} className="text-lg py-6 focus:border-primary focus:ring-primary bg-white/80 backdrop-blur-sm" />
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
                          <Input type="email" placeholder="barbie@dreamhouse.com" {...field} className="text-lg py-6 focus:border-primary focus:ring-primary bg-white/80 backdrop-blur-sm" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg text-accent">Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+27 71 451 3588" {...field} className="text-lg py-6 focus:border-primary focus:ring-primary bg-white/80 backdrop-blur-sm" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
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
                                  "w-full text-lg py-6 pl-3 text-left font-normal border-input-border focus:border-primary focus:ring-primary bg-white/80 backdrop-blur-sm",
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
                                date < new Date(new Date().setHours(0,0,0,0))
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
                            <SelectTrigger className="text-lg py-6 border-input-border focus:border-primary focus:ring-primary bg-white/80 backdrop-blur-sm">
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

                <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg border border-primary/20">
                  <h3 className="text-xl font-semibold text-primary mb-4 flex items-center">
                    <CreditCard className="mr-2 h-6 w-6" />
                    Payment Information
                  </h3>
                  <p className="text-foreground/80 mb-4">
                    After confirming your booking details, you'll be redirected to our secure payment page to complete your reservation.
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span>256-bit SSL encryption</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 ml-4"></div>
                    <span>Secure payment processing</span>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full text-xl py-7 sparkle-hover group transition-all duration-300 ease-out shadow-xl" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Processing..." : "Proceed to Payment"}
                  {!form.formState.isSubmitting && <CreditCard className="ml-3 h-6 w-6 group-hover:scale-110 transition-transform" />}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}