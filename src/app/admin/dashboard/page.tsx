
import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Users, DollarSign, ShoppingBag, CalendarDays, CheckCircle, XCircle, AlertCircle, Edit3, Trash2, PlusCircle, ListChecks, UserCheck, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { bookings as mockBookings } from '@/data/mockData'; 
import Link from 'next/link';

export default function AdminDashboardPage() {
  const stats = [
    { title: "Total Revenue", value: "R12,345", icon: DollarSign, color: "text-green-500", bgColor: "bg-green-100" },
    { title: "New Clients", value: "67", icon: Users, color: "text-blue-500", bgColor: "bg-blue-100" },
    { title: "Services Booked", value: "234", icon: BarChart, color: "text-purple-500", bgColor: "bg-purple-100" },
    { title: "Products Sold", value: "102", icon: ShoppingBag, color: "text-orange-500", bgColor: "bg-orange-100" },
  ];

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'completed':
        return 'outline'; 
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'completed':
         return <CheckCircle className="h-5 w-5 text-blue-500" />; 
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <CalendarDays className="h-5 w-5 text-muted-foreground" />;
    }
  };


  return (
    <AppShell>
      <PageHeader 
        title="Admin Dashboard"
        description="Welcome back, Admin! Here's an overview of Born@Beautiful."
      />
      <div className="container py-12 md:py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12 content-animate-in">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <p className="text-xs text-muted-foreground pt-1">
                  +10.5% from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-3">
            <Card className="shadow-lg content-animate-in animate-in fade-in slide-in-from-left-10 duration-500 delay-200 md:col-span-2">
                <CardHeader>
                    <CardTitle className="text-2xl text-accent flex items-center"><CalendarDays className="mr-3 h-7 w-7"/>Manage Bookings</CardTitle>
                    <CardDescription>View and manage upcoming and past appointments.</CardDescription>
                </CardHeader>
                <CardContent>
                    {mockBookings.length > 0 ? (
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Status</TableHead>
                            <TableHead>Client</TableHead>
                            <TableHead>Service</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {mockBookings.map((booking) => (
                            <TableRow key={booking.id} className="hover:bg-primary/5 transition-colors">
                            <TableCell>
                                <Badge variant={getStatusBadgeVariant(booking.status)} className="flex items-center gap-1.5 capitalize">
                                {getStatusIcon(booking.status)}
                                {booking.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="font-medium">{booking.clientName}</TableCell>
                            <TableCell>{booking.serviceName}</TableCell>
                            <TableCell>{booking.date}</TableCell>
                            <TableCell>{booking.time}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="icon" className="hover:bg-accent/20 text-accent hover:text-accent mr-1">
                                    <Edit3 className="h-4 w-4" />
                                    <span className="sr-only">Edit</span>
                                </Button>
                                <Button variant="ghost" size="icon" className="hover:bg-destructive/20 text-destructive hover:text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Cancel</span>
                                </Button>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    ) : (
                        <p className="text-muted-foreground text-center py-8">No bookings found.</p>
                    )}
                </CardContent>
            </Card>
            <Card className="shadow-lg content-animate-in animate-in fade-in slide-in-from-right-10 duration-500 delay-400">
                <CardHeader>
                    <CardTitle className="text-2xl text-accent">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col space-y-3">
                    <Button asChild variant="outline" className="w-full justify-start text-lg py-6 border-primary text-primary hover:bg-primary/10 transition-all duration-300 ease-out group">
                        <Link href="/admin/services/list">
                            <Settings className="mr-3 h-5 w-5 group-hover:animate-pulse"/> Manage Services
                        </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-start text-lg py-6 border-primary text-primary hover:bg-primary/10 transition-all duration-300 ease-out group">
                        <Link href="/admin/products/manage">
                            <ListChecks className="mr-3 h-5 w-5 group-hover:animate-pulse"/> Manage Products
                        </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-start text-lg py-6 border-primary text-primary hover:bg-primary/10 transition-all duration-300 ease-out group">
                         <Link href="/admin/clients/list">
                            <UserCheck className="mr-3 h-5 w-5 group-hover:animate-pulse"/> View Client List
                         </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>

        <div className="mt-12 content-animate-in animate-in fade-in slide-in-from-bottom-10 duration-500 delay-600">
             <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl text-accent">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        <li className="flex items-center justify-between p-3 bg-secondary/30 rounded-md hover:bg-secondary/50 transition-colors">
                            <span>New booking: Signature Haircut</span>
                            <span className="text-sm text-muted-foreground">10 min ago</span>
                        </li>
                        <li className="flex items-center justify-between p-3 bg-secondary/30 rounded-md hover:bg-secondary/50 transition-colors">
                            <span>Product Sold: Sparkle Shine Shampoo</span>
                            <span className="text-sm text-muted-foreground">1 hour ago</span>
                        </li>
                        <li className="flex items-center justify-between p-3 bg-secondary/30 rounded-md hover:bg-secondary/50 transition-colors">
                            <span>Client 'Anna B.' registered</span>
                            <span className="text-sm text-muted-foreground">3 hours ago</span>
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </div>
      </div>
    </AppShell>
  );
}
