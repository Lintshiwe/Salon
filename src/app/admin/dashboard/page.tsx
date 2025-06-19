
import { AppShell } from '@/components/layout/AppShell';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Users, DollarSign, ShoppingBag } from 'lucide-react';

export default function AdminDashboardPage() {
  const stats = [
    { title: "Total Revenue", value: "$12,345", icon: DollarSign, color: "text-green-500", bgColor: "bg-green-100" },
    { title: "New Clients", value: "67", icon: Users, color: "text-blue-500", bgColor: "bg-blue-100" },
    { title: "Services Booked", value: "234", icon: BarChart, color: "text-purple-500", bgColor: "bg-purple-100" },
    { title: "Products Sold", value: "102", icon: ShoppingBag, color: "text-orange-500", bgColor: "bg-orange-100" },
  ];

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

        <div className="grid gap-8 md:grid-cols-2">
            <Card className="shadow-lg content-animate-in animate-in fade-in slide-in-from-left-10 duration-500 delay-200">
                <CardHeader>
                    <CardTitle className="text-2xl text-accent">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        <li className="flex items-center justify-between p-3 bg-secondary/30 rounded-md">
                            <span>New booking: Signature Haircut</span>
                            <span className="text-sm text-muted-foreground">10 min ago</span>
                        </li>
                        <li className="flex items-center justify-between p-3 bg-secondary/30 rounded-md">
                            <span>Product Sold: Sparkle Shine Shampoo</span>
                            <span className="text-sm text-muted-foreground">1 hour ago</span>
                        </li>
                        <li className="flex items-center justify-between p-3 bg-secondary/30 rounded-md">
                            <span>Client 'Anna B.' registered</span>
                            <span className="text-sm text-muted-foreground">3 hours ago</span>
                        </li>
                    </ul>
                </CardContent>
            </Card>
            <Card className="shadow-lg content-animate-in animate-in fade-in slide-in-from-right-10 duration-500 delay-400">
                <CardHeader>
                    <CardTitle className="text-2xl text-accent">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col space-y-3">
                    <Button variant="outline" className="w-full justify-start text-lg py-6 border-primary text-primary hover:bg-primary/10">Manage Appointments</Button>
                    <Button variant="outline" className="w-full justify-start text-lg py-6 border-primary text-primary hover:bg-primary/10">View Client List</Button>
                    <Button variant="outline" className="w-full justify-start text-lg py-6 border-primary text-primary hover:bg-primary/10">Update Services</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </AppShell>
  );
}

