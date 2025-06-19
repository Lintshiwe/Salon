
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
import { Lock, LogIn, Eye, EyeOff, ShieldAlert, PartyPopper, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(3, { message: "Password must be at least 3 characters." }), // Changed min to 3 for 'admin'
});

type LoginFormValues = z.infer<typeof formSchema>;

type LoginStatus = "idle" | "submitting" | "error" | "success";

export function AdminLoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [loginStatus, setLoginStatus] = useState<LoginStatus>("idle");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordToggleAnimating, setIsPasswordToggleAnimating] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setLoginStatus("submitting");
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

    if (data.email === "admin@admin.com" && data.password === "admin") {
      setLoginStatus("success");
      toast({
        title: "Login Successful! 🎉",
        description: "Redirecting to your dashboard...",
        className: "bg-green-500 text-white border-green-600",
      });
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 2000); 
    } else {
      setLoginStatus("error");
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid email or password. The website is mad!",
      });
      form.setError("root", { message: "Invalid credentials" });
      setTimeout(() => {
        if (loginStatus === 'error') setLoginStatus("idle");
      }, 2000);
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setIsPasswordToggleAnimating(true);
    setTimeout(() => setIsPasswordToggleAnimating(false), 300); 
  };

  const MainIcon = () => {
    if (loginStatus === 'error') return <ShieldAlert className="h-12 w-12 mx-auto text-destructive mb-4" />;
    if (loginStatus === 'success') return <PartyPopper className="h-12 w-12 mx-auto text-green-500 mb-4 animate-bounce" />;
    if (loginStatus === 'submitting') return <Loader2 className="h-12 w-12 mx-auto text-primary mb-4 animate-spin" />;
    return <Lock className="h-12 w-12 mx-auto text-primary mb-4" />;
  };
  
  const cardDescriptionText = () => {
    if (loginStatus === 'error') return "Oops! Wrong credentials. Try again!";
    if (loginStatus === 'success') return "Welcome back, Admin! Get ready to dazzle!";
    if (loginStatus === 'submitting') return "Checking your credentials...";
    return "Please enter your credentials to continue.";
  };


  return (
    <Card className={cn(
      "w-full max-w-md mx-auto shadow-2xl bg-card transition-all duration-500 ease-out",
      loginStatus === 'error' && 'border-destructive animate-shake',
      loginStatus === 'success' && 'border-green-500 animate-dance',
      loginStatus !== 'error' && loginStatus !== 'success' && 'border-primary/50'
    )}>
      <CardHeader className="text-center">
        <MainIcon />
        <CardTitle className="font-headline text-4xl text-primary">Admin Access</CardTitle>
        <CardDescription className={cn(
            "text-lg text-foreground/70",
            loginStatus === 'error' && 'text-destructive',
            loginStatus === 'success' && 'text-green-600'
          )}>
          {cardDescriptionText()}
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
                    <Input 
                      type="email" 
                      placeholder="admin@admin.com" 
                      {...field} 
                      className={cn("text-lg py-6 focus:border-primary focus:ring-primary", loginStatus === 'error' && 'border-destructive focus:border-destructive focus:ring-destructive')}
                      disabled={loginStatus === 'submitting' || loginStatus === 'success'}
                    />
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
                    <div className="relative">
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        {...field} 
                        className={cn("text-lg py-6 pr-12 focus:border-primary focus:ring-primary", loginStatus === 'error' && 'border-destructive focus:border-destructive focus:ring-destructive')}
                        disabled={loginStatus === 'submitting' || loginStatus === 'success'}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={togglePasswordVisibility}
                        className={cn(
                          "absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-primary",
                          isPasswordToggleAnimating && "animate-subtle-pulse"
                        )}
                        disabled={loginStatus === 'submitting' || loginStatus === 'success'}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             {form.formState.errors.root && (
              <p className="text-sm font-medium text-destructive text-center">{form.formState.errors.root.message}</p>
            )}
            <Button 
              type="submit" 
              size="lg" 
              className="w-full text-xl py-7 sparkle-hover group" 
              disabled={loginStatus === 'submitting' || loginStatus === 'success'}
            >
              {loginStatus === 'submitting' && <><Loader2 className="mr-2 h-6 w-6 animate-spin" /> Logging In...</>}
              {loginStatus === 'success' && <><PartyPopper className="mr-2 h-6 w-6" /> Success!</>}
              {loginStatus !== 'submitting' && loginStatus !== 'success' && <><LogIn className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" /> Log In</>}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
