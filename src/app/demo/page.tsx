'use client';
import AuthGuard from '@/components/auth/AuthGuard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Search, Users } from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const data = [
  { month: 'Jan', value: 1500 },
  { month: 'Feb', value: 3000 },
  { month: 'Mar', value: 2000 },
  { month: 'Apr', value: 1000 },
  { month: 'May', value: 4000 },
  { month: 'Jun', value: 1000 },
  { month: 'Jul', value: 2500 },
  { month: 'Aug', value: 5000 },
  { month: 'Sep', value: 1500 },
  { month: 'Oct', value: 4000 },
  { month: 'Nov', value: 1000 },
  { month: 'Dec', value: 2500 },
];

const recentSales = [
  {
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
  },
  {
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
  },
  {
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
  },
  {
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
  },
  {
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
  },
];

export default function Demo() {
  return (
    <AuthGuard>
      <div className="flex min-h-screen flex-col">
        <header className="border-b">
          <div className="flex h-16 items-center px-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-02-04%2023-58-05-ffwqaEcihrVagaLLGk507wunI17hRj.png"
                  alt="User"
                />
                <AvatarFallback>AK</AvatarFallback>
              </Avatar>
              <div className="text-sm font-medium">Admin </div>
            </div>
            <nav className="ml-8 flex items-center space-x-4">
              <Button variant="ghost" className="text-sm font-medium">
                Overview
              </Button>
              <Button
                variant="ghost"
                className="text-sm font-medium text-muted-foreground"
              >
                Customers
              </Button>
              <Button
                variant="ghost"
                className="text-sm font-medium text-muted-foreground"
              >
                Products
              </Button>
              <Button
                variant="ghost"
                className="text-sm font-medium text-muted-foreground"
              >
                Settings
              </Button>
            </nav>
            <div className="ml-auto flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-96 pl-8"
                />
              </div>
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-02-04%2023-58-05-ffwqaEcihrVagaLLGk507wunI17hRj.png"
                  alt="User"
                />
                <AvatarFallback>AK</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-4">
              <Button variant="outline">Jan 20, 2023 - Feb 09, 2023</Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Subscriptions
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2350</div>
                  <p className="text-xs text-muted-foreground">
                    +180.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sales</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12,234</div>
                  <p className="text-xs text-muted-foreground">
                    +19% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Now
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+573</div>
                  <p className="text-xs text-muted-foreground">
                    +201 since last hour
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={data}>
                      <XAxis
                        dataKey="month"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Bar
                        dataKey="value"
                        fill="currentColor"
                        radius={[4, 4, 0, 0]}
                        className="fill-primary"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <div className="text-sm text-muted-foreground">
                    You made 265 sales this month.
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {recentSales.map((sale) => (
                      <div className="flex items-center" key={sale.email}>
                        <Avatar className="h-9 w-9">
                          <AvatarFallback>
                            {sale.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {sale.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {sale.email}
                          </p>
                        </div>
                        <div className="ml-auto font-medium">{sale.amount}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </Tabs>
        </div>
      </div>
    </AuthGuard>
  );
}
