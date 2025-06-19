
import { AdminLoginForm } from '@/components/admin/AdminLoginForm';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100 p-4 relative overflow-hidden">
      <div className="absolute top-4 left-4 z-10">
        <Link href="/" className="flex items-center space-x-2 group text-primary hover:text-accent transition-colors">
          <Sparkles className="h-6 w-6 transition-transform group-hover:scale-110 group-hover:animate-sparkle-pulse" />
          <span className="font-headline text-xl">Born@Beautiful</span>
        </Link>
      </div>
      <div className="w-full max-w-md content-animate-in animate-in fade-in slide-in-from-bottom-10 duration-700 z-10">
        <AdminLoginForm />
      </div>
      <p className="mt-8 text-center text-muted-foreground z-10">
        &copy; {new Date().getFullYear()} Born@Beautiful. Admin Portal.
      </p>
       {/* Optional: Decorative elements for more flair */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-accent/10 rounded-full filter blur-3xl opacity-50 animate-pulse animation-delay-2000"></div>
    </div>
  );
}

