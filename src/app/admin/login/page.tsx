import { AdminLoginForm } from '@/components/admin/AdminLoginForm';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100 p-4 relative">
      <div className="absolute top-4 left-4">
        <Link href="/" className="flex items-center space-x-2 group text-primary hover:text-accent transition-colors">
          <Sparkles className="h-6 w-6 transition-transform group-hover:scale-110 group-hover:animate-sparkle-pulse" />
          <span className="font-headline text-xl">Born@Beautiful</span>
        </Link>
      </div>
      <div className="w-full content-animate-in">
        <AdminLoginForm />
      </div>
      <p className="mt-8 text-center text-muted-foreground">
        &copy; {new Date().getFullYear()} Born@Beautiful. Admin Portal.
      </p>
    </div>
  );
}
