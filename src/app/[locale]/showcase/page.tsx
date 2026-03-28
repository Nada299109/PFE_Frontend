'use client';

import Link from 'next/link';
import { useState } from 'react';

import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ShowcasePage() {
  const [inputValue, setInputValue] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50">
      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link
            href="/en"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-emerald-500 font-bold text-white">
              SB
            </div>
            <span className="bg-gradient-to-r from-indigo-600 to-emerald-600 bg-clip-text text-xl font-bold text-transparent">
              Shadcn Boilerplate
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/en/demo">
              <Button variant="ghost" size="sm">
                Demo
              </Button>
            </Link>

            <LanguageSwitcher />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  Menu
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="animate-fade-in space-y-6 text-center">
          <Badge className="mb-4">UI Components Showcase</Badge>
          <h1 className="bg-gradient-to-r from-indigo-600 to-emerald-600 bg-clip-text text-5xl font-bold tracking-tight text-transparent">
            Beautiful, Simple & Clear
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            A complete Next.js boilerplate with shadcn/ui components, ready for
            production
          </p>

          <div className="flex justify-center gap-4 pt-4">
            <Button size="lg" className="gradient-primary">
              Get Started
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Welcome to Shadcn Boilerplate</DialogTitle>
                  <DialogDescription>
                    This is a production-ready Next.js boilerplate with
                    beautiful UI components, internationalization,
                    authentication, and more.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <h4 className="mb-2 font-semibold">Features:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>✅ Next.js 15 + React 19</li>
                      <li>✅ shadcn/ui Components (50+ components)</li>
                      <li>✅ TypeScript + Tailwind CSS</li>
                      <li>✅ React Query + Axios</li>
                      <li>✅ NextAuth.js</li>
                      <li>✅ Internationalization (i18n)</li>
                      <li>✅ Vitest + Testing Library</li>
                      <li>✅ Beautiful Custom Theme</li>
                    </ul>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Close
                  </Button>
                  <Button onClick={() => setIsDialogOpen(false)}>
                    Got it!
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {[
            {
              label: 'Components',
              value: '50+',
              color: 'from-indigo-500 to-purple-500',
            },
            {
              label: 'Projects',
              value: '1.2K',
              color: 'from-emerald-500 to-teal-500',
            },
            {
              label: 'Users',
              value: '50K+',
              color: 'from-orange-500 to-red-500',
            },
            {
              label: 'Rating',
              value: '★ 4.9',
              color: 'from-yellow-500 to-amber-500',
            },
          ].map((stat, i) => (
            <Card
              key={i}
              className="text-center transition-shadow hover:shadow-lg"
            >
              <CardContent className="pt-6">
                <div
                  className={`bg-gradient-to-r text-4xl font-bold ${stat.color} mb-2 bg-clip-text text-transparent`}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-8" />

      {/* Components Showcase */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Component Library
        </h2>

        <Tabs defaultValue="forms" className="w-full">
          <TabsList className="mx-auto mb-8 grid w-full max-w-3xl grid-cols-6">
            <TabsTrigger value="forms">Forms</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="navigation">Navigation</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
          </TabsList>

          {/* Forms Tab */}
          <TabsContent value="forms" className="space-y-8">
            <Card className="mx-auto max-w-2xl">
              <CardHeader>
                <CardTitle>Contact Form</CardTitle>
                <CardDescription>
                  All form components in one place
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Text Input */}
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Textarea - Will be added */}
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Input id="message" placeholder="Your message here..." />
                  <p className="text-xs text-muted-foreground">
                    Install textarea component for multi-line input
                  </p>
                </div>

                {/* Checkbox - Will be added */}
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="terms" />
                  <Label htmlFor="terms">Accept terms and conditions</Label>
                </div>

                {/* Switch - Will be added */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications">Email notifications</Label>
                  <input type="checkbox" id="notifications" />
                </div>
              </CardContent>
              <CardFooter className="flex gap-4">
                <Button className="w-full">Submit</Button>
                <Button variant="outline" className="w-full">
                  Cancel
                </Button>
              </CardFooter>
            </Card>

            {/* Select & Radio - Will be added */}
            <Card className="mx-auto max-w-2xl">
              <CardHeader>
                <CardTitle>Selection Components</CardTitle>
                <CardDescription>Select, Radio, and more</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Country</Label>
                  <p className="text-sm text-muted-foreground">
                    Install select component: npx shadcn@latest add select
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Subscription Plan</Label>
                  <p className="text-sm text-muted-foreground">
                    Install radio-group component: npx shadcn@latest add
                    radio-group
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cards Tab */}
          <TabsContent value="cards">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  title: 'Basic Plan',
                  price: '$9',
                  features: [
                    '10 Projects',
                    '5GB Storage',
                    'Basic Support',
                    'Email Support',
                  ],
                  badge: 'Popular',
                  badgeVariant: 'default' as const,
                },
                {
                  title: 'Pro Plan',
                  price: '$29',
                  features: [
                    'Unlimited Projects',
                    '50GB Storage',
                    'Priority Support',
                    '24/7 Chat',
                  ],
                  badge: 'Best Value',
                  badgeVariant: 'secondary' as const,
                },
                {
                  title: 'Enterprise',
                  price: '$99',
                  features: [
                    'Everything',
                    'Unlimited Storage',
                    'Dedicated Support',
                    'Custom Features',
                  ],
                  badge: 'Premium',
                  badgeVariant: 'destructive' as const,
                },
              ].map((plan, i) => (
                <Card
                  key={i}
                  className="relative overflow-hidden transition-all hover:scale-105 hover:shadow-xl"
                >
                  {i === 1 && (
                    <div className="absolute right-0 top-0 -mr-16 -mt-16 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-500/20 to-emerald-500/20" />
                  )}
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle>{plan.title}</CardTitle>
                      <Badge variant={plan.badgeVariant}>{plan.badge}</Badge>
                    </div>
                    <CardDescription className="mt-4 text-3xl font-bold">
                      {plan.price}
                      <span className="text-sm font-normal text-muted-foreground">
                        /month
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, j) => (
                        <li key={j} className="flex items-center gap-2">
                          <span className="text-emerald-500">✓</span>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      variant={i === 1 ? 'default' : 'outline'}
                    >
                      Choose Plan
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Feature Cards */}
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              {[
                {
                  icon: '⚡',
                  title: 'Lightning Fast',
                  desc: 'Optimized for speed and performance',
                },
                {
                  icon: '🔐',
                  title: 'Secure by Default',
                  desc: 'Built-in security best practices',
                },
                {
                  icon: '🎨',
                  title: 'Beautiful Design',
                  desc: 'Modern and professional UI',
                },
                {
                  icon: '📱',
                  title: 'Fully Responsive',
                  desc: 'Works on all devices',
                },
              ].map((feature, i) => (
                <Card key={i} className="transition-shadow hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{feature.icon}</div>
                      <div>
                        <CardTitle className="text-lg">
                          {feature.title}
                        </CardTitle>
                        <CardDescription>{feature.desc}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Data Tab */}
          <TabsContent value="data">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>
                  Manage your team members and their roles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: 'Sarah Johnson',
                      role: 'Product Manager',
                      email: 'sarah@example.com',
                      status: 'Active',
                    },
                    {
                      name: 'Michael Chen',
                      role: 'Senior Developer',
                      email: 'michael@example.com',
                      status: 'Active',
                    },
                    {
                      name: 'Emily Davis',
                      role: 'UX Designer',
                      email: 'emily@example.com',
                      status: 'Away',
                    },
                    {
                      name: 'James Wilson',
                      role: 'DevOps Engineer',
                      email: 'james@example.com',
                      status: 'Active',
                    },
                    {
                      name: 'Lisa Anderson',
                      role: 'QA Engineer',
                      email: 'lisa@example.com',
                      status: 'Offline',
                    },
                  ].map((member, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                    >
                      <Avatar>
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`}
                        />
                        <AvatarFallback>
                          {member.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-semibold">{member.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {member.email}
                        </div>
                      </div>
                      <Badge
                        variant={
                          member.status === 'Active' ? 'default' : 'secondary'
                        }
                      >
                        {member.status}
                      </Badge>
                      <Badge variant="outline">{member.role}</Badge>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Table Component */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Data Table</CardTitle>
                <CardDescription>
                  Install table component for advanced data display
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Run: npx shadcn@latest add table
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Alert Component */}
              <Card>
                <CardHeader>
                  <CardTitle>Alert Component</CardTitle>
                  <CardDescription>
                    Install: npx shadcn@latest add alert
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-md border border-blue-200 bg-blue-50 p-4">
                    <div className="font-semibold text-blue-900">
                      Info Alert
                    </div>
                    <div className="text-sm text-blue-800">
                      This is an informational message.
                    </div>
                  </div>
                  <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4">
                    <div className="font-semibold text-emerald-900">
                      Success Alert
                    </div>
                    <div className="text-sm text-emerald-800">
                      Operation completed successfully!
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Progress & Skeleton */}
              <Card>
                <CardHeader>
                  <CardTitle>Loading States</CardTitle>
                  <CardDescription>
                    Progress & Skeleton components
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Progress Bar</Label>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                      <div className="gradient-primary h-full w-3/4" />
                    </div>
                  </div>
                  <div>
                    <Label>Skeleton Loader</Label>
                    <div className="mt-2 space-y-2">
                      <div className="h-4 animate-pulse rounded bg-muted" />
                      <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Toast Component */}
              <Card>
                <CardHeader>
                  <CardTitle>Toast Notifications</CardTitle>
                  <CardDescription>
                    Install: npx shadcn@latest add sonner
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button className="w-full" variant="outline">
                      Show Success Toast
                    </Button>
                    <Button className="w-full" variant="outline">
                      Show Error Toast
                    </Button>
                    <Button className="w-full" variant="outline">
                      Show Info Toast
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Tooltip & Popover */}
              <Card>
                <CardHeader>
                  <CardTitle>Tooltip & Popover</CardTitle>
                  <CardDescription>Overlay components</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Tooltip</Label>
                    <p className="text-sm text-muted-foreground">
                      Install: npx shadcn@latest add tooltip
                    </p>
                  </div>
                  <div>
                    <Label>Popover</Label>
                    <p className="text-sm text-muted-foreground">
                      Install: npx shadcn@latest add popover
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Navigation Tab */}
          <TabsContent value="navigation" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Breadcrumb */}
              <Card>
                <CardHeader>
                  <CardTitle>Breadcrumb</CardTitle>
                  <CardDescription>
                    Install: npx shadcn@latest add breadcrumb
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="cursor-pointer text-muted-foreground hover:text-foreground">
                      Home
                    </span>
                    <span>/</span>
                    <span className="cursor-pointer text-muted-foreground hover:text-foreground">
                      Products
                    </span>
                    <span>/</span>
                    <span className="font-semibold">Details</span>
                  </div>
                </CardContent>
              </Card>

              {/* Pagination */}
              <Card>
                <CardHeader>
                  <CardTitle>Pagination</CardTitle>
                  <CardDescription>
                    Install: npx shadcn@latest add pagination
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center gap-2">
                    <Button variant="outline" size="sm">
                      Previous
                    </Button>
                    <Button variant="ghost" size="sm">
                      1
                    </Button>
                    <Button size="sm">2</Button>
                    <Button variant="ghost" size="sm">
                      3
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Command Menu */}
              <Card>
                <CardHeader>
                  <CardTitle>Command Menu</CardTitle>
                  <CardDescription>
                    Install: npx shadcn@latest add command
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Press <Badge variant="outline">Cmd+K</Badge> to open command
                    palette
                  </p>
                </CardContent>
              </Card>

              {/* Context Menu */}
              <Card>
                <CardHeader>
                  <CardTitle>Context Menu</CardTitle>
                  <CardDescription>
                    Install: npx shadcn@latest add context-menu
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border-2 border-dashed p-8 text-center text-sm text-muted-foreground">
                    Right-click here for context menu
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Layout Tab */}
          <TabsContent value="layout" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Accordion */}
              <Card>
                <CardHeader>
                  <CardTitle>Accordion</CardTitle>
                  <CardDescription>
                    Install: npx shadcn@latest add accordion
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="rounded-md border p-4">
                      <div className="cursor-pointer font-semibold">
                        Is it accessible?
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground">
                        Yes. It adheres to the WAI-ARIA design pattern.
                      </div>
                    </div>
                    <div className="rounded-md border p-4">
                      <div className="cursor-pointer font-semibold">
                        Is it styled?
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Collapsible */}
              <Card>
                <CardHeader>
                  <CardTitle>Collapsible</CardTitle>
                  <CardDescription>
                    Install: npx shadcn@latest add collapsible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Toggle Content ▼
                  </Button>
                </CardContent>
              </Card>

              {/* Resizable */}
              <Card>
                <CardHeader>
                  <CardTitle>Resizable Panels</CardTitle>
                  <CardDescription>
                    Install: npx shadcn@latest add resizable
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid h-40 grid-cols-2 gap-2">
                    <div className="rounded-md border bg-muted/50 p-4">
                      Panel 1
                    </div>
                    <div className="rounded-md border bg-muted/50 p-4">
                      Panel 2
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Installation Guide */}
      <section className="container mx-auto px-4 py-16">
        <Card className="mx-auto max-w-4xl">
          <CardHeader>
            <CardTitle className="text-2xl">
              How to Add More Components
            </CardTitle>
            <CardDescription>
              Install any component you need from shadcn/ui
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-semibold">Forms & Input</h4>
                <code className="block rounded bg-muted p-2 text-xs">
                  npx shadcn@latest add form select checkbox radio-group switch
                  textarea slider calendar
                </code>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Data Display</h4>
                <code className="block rounded bg-muted p-2 text-xs">
                  npx shadcn@latest add table data-table skeleton progress
                  scroll-area
                </code>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Feedback</h4>
                <code className="block rounded bg-muted p-2 text-xs">
                  npx shadcn@latest add alert alert-dialog sheet popover tooltip
                  sonner
                </code>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Navigation</h4>
                <code className="block rounded bg-muted p-2 text-xs">
                  npx shadcn@latest add breadcrumb pagination command menubar
                </code>
              </div>
            </div>
            <Separator />
            <div className="text-center">
              <Button asChild>
                <a
                  href="https://ui.shadcn.com/docs/components"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View All Components →
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="mt-16 border-t bg-muted/30">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>Built with Next.js, shadcn/ui, and Tailwind CSS</p>
          <p className="mt-2">
            © 2024 Shadcn Boilerplate. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
