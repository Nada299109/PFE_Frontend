# Complete Learning Guide - Understanding the Boilerplate

## Table of Contents

1. [Next.js 15 Fundamentals](#nextjs-15-fundamentals)
2. [TypeScript Basics](#typescript-basics)
3. [Tailwind CSS](#tailwind-css)
4. [React Query](#react-query)
5. [Network Layer (Axios + Interceptors)](#network-layer)
6. [NextAuth.js](#nextauth)
7. [Radix UI](#radix-ui)
8. [Internationalization (i18n)](#internationalization-i18n)
9. [Project Architecture](#project-architecture)
10. [Testing with Vitest](#testing)
11. [Common Patterns](#common-patterns)

---

## Next.js 15 Fundamentals

### What is Next.js?

Next.js is a **React framework** that gives you:

- **Server-side rendering** (SSR) - Pages render on the server
- **Static generation** - Pre-build pages at build time
- **File-based routing** - Folders = routes
- **API routes** - Backend endpoints in the same project
- **Automatic code splitting** - Faster page loads

### App Router (Next.js 13+)

The project uses the **App Router** (new way):

```
src/app/
├── page.tsx          → /
├── demo/
│   └── page.tsx      → /demo
├── users/
│   ├── page.tsx      → /users
│   └── [id]/
│       └── page.tsx  → /users/123
└── api/
    └── hello/
        └── route.ts  → /api/hello
```

**Key concept:** Folders = routes, files define behavior

### Server vs Client Components

**SERVER COMPONENTS (default):**

```typescript
// No 'use client' at top = Server Component
export default async function Page() {
  const data = await fetch('https://api.example.com/data');
  return <div>{data}</div>;
}
```

✅ Can fetch data directly  
✅ Access database  
✅ Keep sensitive info on server  
❌ Cannot use React hooks (useState, useEffect)  
❌ Cannot use browser APIs  
❌ Cannot use event handlers (onClick)

**CLIENT COMPONENTS:**

```typescript
'use client'; // THIS MAKES IT A CLIENT COMPONENT

import { useState } from 'react';

export default function Page() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

✅ Can use React hooks  
✅ Can use browser APIs  
✅ Can use event handlers  
❌ Cannot directly access database  
❌ Runs in browser (larger bundle)

### When to Use Each?

**Server Components for:**

- Fetching data
- Accessing backend resources
- Keeping sensitive info secure
- Reducing client-side JavaScript

**Client Components for:**

- Interactivity (buttons, forms)
- State management (useState, useReducer)
- Effects (useEffect)
- Browser APIs (localStorage, window)
- Event listeners (onClick, onChange)

### Layouts

**Root Layout** (`app/layout.tsx`):

```typescript
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {/* This wraps ALL pages */}
        {children}
      </body>
    </html>
  );
}
```

**Nested Layouts:**

```
app/
├── layout.tsx        # Root layout
└── dashboard/
    ├── layout.tsx    # Dashboard layout
    └── page.tsx      # Dashboard page
```

### Data Fetching

**Server Component (preferred):**

```typescript
async function getUsers() {
  const res = await fetch('https://api.example.com/users');
  return res.json();
}

export default async function UsersPage() {
  const users = await getUsers();
  return <div>{users.map(u => <div>{u.name}</div>)}</div>;
}
```

**Client Component with React Query:**

```typescript
'use client';

import { useUsers } from '@/hooks/api';

export default function UsersPage() {
  const { data, isLoading } = useUsers();

  if (isLoading) return <div>Loading...</div>;

  return <div>{data.map(u => <div>{u.name}</div>)}</div>;
}
```

### API Routes

```typescript
// app/api/hello/route.ts
export async function GET(request: Request) {
  return Response.json({ message: 'Hello' });
}

export async function POST(request: Request) {
  const body = await request.json();
  return Response.json({ received: body });
}
```

Call it:

```typescript
fetch('/api/hello')
  .then((res) => res.json())
  .then((data) => console.log(data));
```

---

## TypeScript Basics

### What is TypeScript?

JavaScript + **Types** = TypeScript

**JavaScript:**

```javascript
function add(a, b) {
  return a + b;
}

add(5, 3); // 8
add('5', '3'); // '53' (string concatenation - bug!)
```

**TypeScript:**

```typescript
function add(a: number, b: number): number {
  return a + b;
}

add(5, 3); // 8
add('5', '3'); // ERROR: Type 'string' is not assignable to type 'number'
```

### Basic Types

```typescript
// Primitives
let name: string = 'John';
let age: number = 30;
let isActive: boolean = true;
let data: any = 'anything'; // Avoid 'any'!

// Arrays
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ['John', 'Jane'];

// Objects
let user: { name: string; age: number } = {
  name: 'John',
  age: 30,
};

// Functions
function greet(name: string): string {
  return `Hello ${name}`;
}

const add = (a: number, b: number): number => a + b;
```

### Interfaces

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  age?: number; // Optional property
  role: 'admin' | 'user'; // Union type (only these values)
}

const user: User = {
  id: '1',
  name: 'John',
  email: 'john@example.com',
  role: 'admin',
};

// Function with interface
function getUser(id: string): User {
  // ... fetch user
  return user;
}
```

### Generics

```typescript
// Without generics (bad)
function getFirst(arr: any[]): any {
  return arr[0];
}

// With generics (good)
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

const numbers = [1, 2, 3];
const first = getFirst(numbers); // TypeScript knows it's a number!

const names = ['John', 'Jane'];
const firstName = getFirst(names); // TypeScript knows it's a string!
```

### Type vs Interface

```typescript
// Interface (for objects)
interface User {
  name: string;
}

// Type (for anything)
type ID = string | number;
type Status = 'pending' | 'active' | 'inactive';
type User = {
  name: string;
};
```

### In This Project

```typescript
// src/types/index.ts
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Usage
const response: ApiResponse<User> = {
  data: {
    id: '1',
    email: 'user@example.com',
    name: 'John',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  success: true,
};
```

---

## Tailwind CSS

### What is Tailwind?

Instead of writing CSS:

```css
/* styles.css */
.button {
  background-color: blue;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
}
```

You use **utility classes**:

```html
<button class="rounded bg-blue-600 px-4 py-2 text-white">Click me</button>
```

### Common Classes

**Spacing:**

```html
<!-- Padding -->
<div class="p-4">
  <!-- padding: 1rem (16px) -->
  <div class="px-4 py-2">
    <!-- padding-x: 1rem, padding-y: 0.5rem -->
    <div class="pt-8">
      <!-- padding-top: 2rem -->

      <!-- Margin -->
      <div class="m-4">
        <!-- margin: 1rem -->
        <div class="mx-auto">
          <!-- margin-left: auto, margin-right: auto (center) -->
          <div class="mb-8"><!-- margin-bottom: 2rem --></div>
        </div>
      </div>
    </div>
  </div>
</div>
```

**Sizing:**

```html
<div class="w-full">
  <!-- width: 100% -->
  <div class="w-1/2">
    <!-- width: 50% -->
    <div class="w-64">
      <!-- width: 16rem (256px) -->
      <div class="h-screen">
        <!-- height: 100vh -->
        <div class="min-h-screen"><!-- min-height: 100vh --></div>
      </div>
    </div>
  </div>
</div>
```

**Flexbox:**

```html
<div class="flex">
  <!-- display: flex -->
  <div class="flex items-center">
    <!-- align-items: center -->
    <div class="flex justify-between">
      <!-- justify-content: space-between -->
      <div class="flex flex-col">
        <!-- flex-direction: column -->
        <div class="flex gap-4"><!-- gap: 1rem --></div>
      </div>
    </div></div
  >
</div>
```

**Grid:**

```html
<div class="grid">
  <!-- display: grid -->
  <div class="grid grid-cols-3">
    <!-- 3 columns -->
    <div class="grid grid-cols-1 md:grid-cols-3">
      <!-- Responsive: 1 col on mobile, 3 on desktop -->
      <div class="grid gap-4"><!-- gap: 1rem --></div>
    </div></div
  >
</div>
```

**Typography:**

```html
<p class="text-sm"><!-- font-size: 0.875rem --></p>
<p class="text-base"><!-- font-size: 1rem --></p>
<p class="text-lg"><!-- font-size: 1.125rem --></p>
<p class="text-xl"><!-- font-size: 1.25rem --></p>
<p class="text-3xl"><!-- font-size: 1.875rem --></p>

<p class="font-normal"><!-- font-weight: 400 --></p>
<p class="font-medium"><!-- font-weight: 500 --></p>
<p class="font-bold"><!-- font-weight: 700 --></p>

<p class="text-gray-600"><!-- color: gray-600 --></p>
<p class="text-blue-500"><!-- color: blue-500 --></p>
```

**Colors:**

```html
<div class="bg-blue-600">
  <!-- background: blue -->
  <div class="text-white">
    <!-- color: white -->
    <div class="border-gray-300"><!-- border-color: gray-300 --></div>
  </div>
</div>
```

**Borders & Rounded:**

```html
<div class="border">
  <!-- border: 1px solid -->
  <div class="border-2">
    <!-- border: 2px solid -->
    <div class="rounded">
      <!-- border-radius: 0.25rem -->
      <div class="rounded-lg">
        <!-- border-radius: 0.5rem -->
        <div class="rounded-full"><!-- border-radius: 9999px (circle) --></div>
      </div>
    </div>
  </div>
</div>
```

**Hover, Focus, Active:**

```html
<button class="bg-blue-600 hover:bg-blue-700">
  <!-- background changes on hover -->
</button>

<input class="border focus:ring-2 focus:ring-blue-600">
  <!-- ring appears on focus -->
</input>

<button class="bg-blue-600 active:bg-blue-800">
  <!-- background changes when clicked -->
</button>
```

**Responsive Design:**

```html
<!-- Mobile first: default = mobile, add breakpoints for larger -->
<div class="text-sm md:text-base lg:text-lg">
  <!-- Small text on mobile, larger on tablets/desktop -->
</div>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  <!-- 1 column on mobile, 2 on tablet, 4 on desktop -->
</div>
```

**Breakpoints:**

- `sm:` - 640px and up (tablet)
- `md:` - 768px and up (laptop)
- `lg:` - 1024px and up (desktop)
- `xl:` - 1280px and up (large desktop)

### The `cn()` Helper

In this project, we use a helper function to merge Tailwind classes:

```typescript
import { cn } from '@/lib/utils';

// Problem: Conflicting classes
<div className="p-4 p-8"> {/* Which padding wins? */}

// Solution: cn() helper
<div className={cn('p-4', 'p-8')}> {/* p-8 wins (last one) */}

// Conditional classes
<div className={cn(
  'base-class',
  isActive && 'active-class',
  isPrimary ? 'bg-blue-600' : 'bg-gray-600'
)}>
```

### Example: Building a Button

```typescript
import { cn } from '@/lib/utils';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', size = 'md', children }: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles (always applied)
        'rounded font-medium transition-colors',

        // Variant styles
        variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700',
        variant === 'secondary' && 'bg-gray-600 text-white hover:bg-gray-700',

        // Size styles
        size === 'sm' && 'px-3 py-1 text-sm',
        size === 'md' && 'px-4 py-2 text-base',
        size === 'lg' && 'px-6 py-3 text-lg'
      )}
    >
      {children}
    </button>
  );
}

// Usage
<Button variant="primary" size="lg">Click me</Button>
```

---

## React Query

### What is React Query?

React Query manages **server state** (data from APIs).

**Without React Query:**

```typescript
'use client';

import { useState, useEffect } from 'react';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return <div>{users.map(u => <div>{u.name}</div>)}</div>;
}
```

Problems:

- ❌ No caching (refetches every time)
- ❌ No background updates
- ❌ Lots of boilerplate
- ❌ Hard to handle loading/error states
- ❌ No request deduplication

**With React Query:**

```typescript
'use client';

import { useQuery } from '@tanstack/react-query';

export default function UsersPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(res => res.json()),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return <div>{data.map(u => <div>{u.name}</div>)}</div>;
}
```

Benefits:

- ✅ Automatic caching
- ✅ Background refetching
- ✅ Request deduplication
- ✅ Loading/error states built-in
- ✅ Optimistic updates
- ✅ Much less code!

### Key Concepts

**1. Queries (GET data)**

```typescript
import { useQuery } from '@tanstack/react-query';

const { data, isLoading, error, refetch } = useQuery({
  queryKey: ['users'], // Unique identifier
  queryFn: () => fetchUsers(), // Function that returns data
  staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
  gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  retry: 1, // Retry once on failure
});
```

**2. Mutations (POST, PUT, DELETE)**

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';

const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: (newUser) => createUser(newUser),
  onSuccess: () => {
    // Invalidate and refetch users list
    queryClient.invalidateQueries({ queryKey: ['users'] });
  },
});

// Use it
mutation.mutate({ name: 'John', email: 'john@example.com' });
```

**3. Query Keys**

Query keys identify cached data:

```typescript
// Simple key
['users'][
  // Key with parameters
  ('users', { page: 1, status: 'active' })
][
  // Nested keys
  ('users', 'list')
][('users', 'detail', '123')];

// Best practice: Use a factory
const queryKeys = {
  users: {
    all: ['users'],
    lists: () => [...queryKeys.users.all, 'list'],
    list: (filters) => [...queryKeys.users.lists(), filters],
    details: () => [...queryKeys.users.all, 'detail'],
    detail: (id) => [...queryKeys.users.details(), id],
  },
};
```

### In This Project

**1. Setup (already done in layout.tsx):**

```typescript
// src/app/layout.tsx
import { QueryProvider } from '@/lib/react-query';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
```

**2. Create a Service:**

```typescript
// src/services/user.service.ts
import { BaseApiService } from './api.service';

class UserService extends BaseApiService {
  async getUsers() {
    return this.get('/users');
  }

  async getUser(id: string) {
    return this.get(`/users/${id}`);
  }

  async createUser(data: any) {
    return this.post('/users', data);
  }
}

export const userService = new UserService();
```

**3. Create React Query Hooks:**

```typescript
// src/hooks/api/useUser.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/services/user.service';

// Query hook (GET)
export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getUsers(),
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => userService.getUser(id),
  });
}

// Mutation hook (POST)
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => userService.createUser(data),
    onSuccess: () => {
      // Refetch users list
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
```

**4. Use in Components:**

```typescript
'use client';

import { useUsers, useCreateUser } from '@/hooks/api/useUser';

export default function UsersPage() {
  const { data, isLoading, error, refetch } = useUsers();
  const createUser = useCreateUser();

  const handleCreate = async () => {
    await createUser.mutateAsync({
      name: 'John',
      email: 'john@example.com',
    });
    // Users list automatically refetches!
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={handleCreate}>Create User</button>
      <button onClick={() => refetch()}>Refresh</button>

      {data?.data?.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

### Advanced Patterns

**Optimistic Updates:**

```typescript
const updateUser = useMutation({
  mutationFn: (data) => userService.updateUser(id, data),
  onMutate: async (newData) => {
    // Cancel outgoing queries
    await queryClient.cancelQueries({ queryKey: ['users', id] });

    // Snapshot previous value
    const previousUser = queryClient.getQueryData(['users', id]);

    // Optimistically update
    queryClient.setQueryData(['users', id], (old) => ({
      ...old,
      ...newData,
    }));

    return { previousUser };
  },
  onError: (err, newData, context) => {
    // Rollback on error
    queryClient.setQueryData(['users', id], context.previousUser);
  },
});
```

**Dependent Queries:**

```typescript
// Fetch user first
const { data: user } = useUser(userId);

// Then fetch their posts (only when user is loaded)
const { data: posts } = usePosts(
  { authorId: user?.data.id },
  { enabled: !!user?.data.id } // Only run when user exists
);
```

**Prefetching:**

```typescript
const queryClient = useQueryClient();

// Prefetch on hover
const handleMouseEnter = () => {
  queryClient.prefetchQuery({
    queryKey: ['users', userId],
    queryFn: () => userService.getUser(userId),
  });
};

<Link
  href={`/users/${userId}`}
  onMouseEnter={handleMouseEnter}
>
  View User
</Link>
```

---

## Network Layer

### Architecture Overview

```
Component → React Query → Service → HTTP Client → Interceptors → API
```

### 1. HTTP Client

**Location:** `src/lib/network/http-client.ts`

This is the core of all API requests:

```typescript
import { httpClient } from '@/lib/network';

// GET request
const users = await httpClient.get('/users');

// POST request
const newUser = await httpClient.post('/users', { name: 'John' });

// PUT request
const updated = await httpClient.put('/users/123', { name: 'Jane' });

// DELETE request
await httpClient.delete('/users/123');
```

### 2. Interceptors

Interceptors run automatically on every request/response:

**Request Pipeline:**

```
1. Logging Interceptor → Logs request (dev only)
2. Auth Interceptor    → Adds Bearer token
3. API Request         → Goes to server
```

**Response Pipeline:**

```
1. Logging Interceptor   → Logs response (dev only)
2. Token Refresh         → Auto-refreshes on 401
3. Retry Interceptor     → Retries on failure
4. Error Handler         → Parses errors
5. Returns to Component
```

### 3. Authentication Interceptor

**What it does:** Automatically adds auth token to every request

```typescript
// You don't need to do this manually:
fetch('/api/users', {
  headers: {
    Authorization: 'Bearer your-token-here',
  },
});

// The interceptor does it automatically:
httpClient.get('/users');
// Headers automatically include: Authorization: Bearer <token>
```

**Token Management:**

```typescript
import { tokenManager } from '@/lib/network';

// Login
const response = await authService.login({ email, password });
tokenManager.setAccessToken(response.data.accessToken);
tokenManager.setRefreshToken(response.data.refreshToken);

// Logout
tokenManager.clearTokens();

// Check token
const token = tokenManager.getAccessToken();
```

### 4. Token Refresh Interceptor

**What it does:** Automatically refreshes expired tokens

**Flow:**

```
1. Make request to /api/users
2. Server returns 401 (Unauthorized - token expired)
3. Interceptor catches the 401
4. Calls /auth/refresh with refresh token
5. Gets new access token
6. Retries original request with new token
7. Returns data to component

All of this happens automatically - user never knows!
```

**Request Queuing:**

If multiple requests fail simultaneously, the interceptor:

1. Queues all failed requests
2. Refreshes token once
3. Retries all queued requests with new token

### 5. Retry Interceptor

**What it does:** Automatically retries failed requests

```typescript
// Request fails (network error or 5xx server error)
// Interceptor retries 3 times with exponential backoff:
// - 1st retry: Wait 1 second
// - 2nd retry: Wait 2 seconds
// - 3rd retry: Wait 4 seconds
// If still fails, return error to component
```

### 6. Error Handler Interceptor

**What it does:** Parses API errors into consistent format

```typescript
// API returns error:
{
  message: "User not found",
  status: 404
}

// Interceptor converts to:
{
  message: "User not found",
  code: "HTTP_404",
  status: 404,
  timestamp: "2024-01-16T10:30:00Z"
}
```

**Status Code Handling:**

- `401`: Clears tokens, redirects to login
- `403`: Forbidden access
- `404`: Not found
- `422`: Validation errors
- `5xx`: Server errors

### 7. Logging Interceptor

**What it does:** Logs all requests and responses (dev only)

```typescript
// Console output:
🚀 Request: {
  method: 'GET',
  url: '/users',
  headers: { ... },
  data: { ... }
}

✅ Response: {
  status: 200,
  duration: '245ms',
  data: [ ... ]
}

❌ Error: {
  status: 404,
  message: 'Not found'
}
```

### Complete Flow Example

```typescript
// 1. Component makes request
'use client';
import { useUsers } from '@/hooks/api';

export default function Page() {
  const { data } = useUsers();  // This triggers everything below
  return <div>{JSON.stringify(data)}</div>;
}

// 2. React Query checks cache
// Cache miss → calls query function

// 3. Query function calls service
// src/hooks/api/useUser.ts
export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getUsers(),  // ← Calls this
  });
}

// 4. Service calls HTTP client
// src/services/user.service.ts
class UserService extends BaseApiService {
  async getUsers() {
    return this.get('/users');  // ← Calls HTTP client
  }
}

// 5. HTTP client runs through interceptors
// REQUEST PIPELINE:
// → Logging: Console logs the request
// → Auth: Adds "Authorization: Bearer <token>" header
// → Sends to API server

// 6. API responds (or errors)

// 7. RESPONSE PIPELINE:
// → Logging: Console logs the response
// → Token Refresh: If 401, refreshes token and retries
// → Retry: If network error, retries 3 times
// → Error Handler: Parses any errors
// → Returns to React Query

// 8. React Query updates cache and component re-renders
```

---

## NextAuth

### What is NextAuth?

NextAuth handles:

- User login/logout
- Session management
- Token/JWT handling
- Social logins (Google, GitHub, etc.)
- Credential-based login (email/password)

### How It Works in This Project

**1. Configuration (`src/lib/auth.ts`):**

```typescript
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        // Call your API to validate credentials
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
        });

        if (response.ok) {
          const user = await response.json();
          return user; // Return user object
        }

        return null; // Login failed
      },
    }),
  ],
  session: {
    strategy: 'jwt', // Use JWT tokens
  },
  pages: {
    signIn: '/login', // Custom login page
  },
});
```

**2. API Route (`src/app/api/auth/[...nextauth]/route.ts`):**

```typescript
import { handlers } from '@/lib/auth';

export const { GET, POST } = handlers;
// This creates:
// GET  /api/auth/session
// POST /api/auth/signin
// POST /api/auth/signout
// etc.
```

**3. Server-Side Usage:**

```typescript
// In Server Component or API Route
import { auth } from '@/lib/auth';

export default async function ProtectedPage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return <div>Welcome {session.user.name}</div>;
}
```

**4. Client-Side Usage:**

```typescript
'use client';

import { signIn, signOut } from 'next-auth/react';

export function LoginButton() {
  return (
    <button onClick={() => signIn()}>
      Sign In
    </button>
  );
}

export function LogoutButton() {
  return (
    <button onClick={() => signOut()}>
      Sign Out
    </button>
  );
}
```

### Login Flow

```
1. User fills form with email/password
2. Click "Login" button
3. signIn() is called
4. NextAuth calls your authorize() function
5. authorize() validates credentials with your API
6. If valid: Creates session, stores JWT in cookie
7. User is redirected to dashboard
8. All future requests include session cookie
```

### Session Management

**JWT Strategy:**

- Token stored in encrypted cookie
- Token contains user info (id, email, role)
- Token expires after 30 days (configurable)
- No database needed for sessions

**Checking Session:**

```typescript
// Server Component
const session = await auth();
if (session) {
  console.log(session.user.name);
  console.log(session.user.email);
  console.log(session.user.role);
}

// Client Component
'use client';
import { useSession } from 'next-auth/react';

export function Profile() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <div>Loading...</div>;
  if (!session) return <div>Not logged in</div>;

  return <div>Welcome {session.user.name}</div>;
}
```

### Protecting Routes

**Server Component:**

```typescript
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return <div>Dashboard content</div>;
}
```

**Middleware (protect multiple routes):**

```typescript
// middleware.ts
import { auth } from '@/lib/auth';

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname.startsWith('/dashboard')) {
    return Response.redirect(new URL('/login', req.url));
  }
});

export const config = {
  matcher: ['/dashboard/:path*'],
};
```

---

## Radix UI

### What is Radix UI?

Radix provides **unstyled, accessible** UI components.

**Key features:**

- ✅ Fully accessible (keyboard navigation, screen readers)
- ✅ Unstyled (you add your own styles)
- ✅ Composable (build complex UIs)
- ✅ No JavaScript runtime

### Components in This Project

#### 1. Dialog (Modal)

```typescript
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/Dialog';

export function MyDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>Open Dialog</button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div>
          <button>Cancel</button>
          <button>Confirm</button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

#### 2. Toast (Notifications)

```typescript
import { useToast } from '@/hooks/useToast';

export function MyComponent() {
  const { toast } = useToast();

  const showToast = () => {
    toast({
      title: 'Success!',
      description: 'Your changes have been saved.',
    });
  };

  const showError = () => {
    toast({
      title: 'Error',
      description: 'Something went wrong.',
      variant: 'destructive',
    });
  };

  return (
    <>
      <button onClick={showToast}>Show Success</button>
      <button onClick={showError}>Show Error</button>
    </>
  );
}
```

#### 3. Input & Label

```typescript
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

export function LoginForm() {
  return (
    <div>
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        placeholder="john@example.com"
      />

      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        type="password"
        placeholder="••••••••"
      />
    </div>
  );
}
```

### How Radix Works

**Radix provides the behavior:**

- Keyboard navigation
- Focus management
- ARIA attributes
- State management

**You provide the styles:**

- Tailwind classes
- Custom CSS
- Variants (with CVA)

**Example - Button component:**

```typescript
// Radix provides: <Button> with accessibility
// You add: Styles, variants, sizes

import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-11 px-8 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export function Button({ variant, size, children, ...props }) {
  return (
    <button className={buttonVariants({ variant, size })} {...props}>
      {children}
    </button>
  );
}
```

---

## Internationalization (i18n)

### What is i18n?

i18n (internationalization) means supporting multiple languages in your app.

**Why "i18n"?**

- "i" + 18 letters + "n" = internationalization

### How It Works in This Project

This project uses **next-intl** for internationalization.

**Supported Languages:**

- English (en) - Default
- Arabic (ar) - With RTL (right-to-left) support

### URL Structure

```
/en/          → English version
/en/dashboard → English dashboard

/ar/          → Arabic version (RTL)
/ar/dashboard → Arabic dashboard (RTL)
```

The language is part of the URL!

### Translation Files

**Location:** `public/locales/`

```
public/locales/
├── en/
│   └── common.json    # English translations
└── ar/
    └── common.json    # Arabic translations
```

**Example - English (`en/common.json`):**

```json
{
  "common": {
    "welcome": "Welcome",
    "goodbye": "Goodbye",
    "save": "Save",
    "cancel": "Cancel"
  },
  "auth": {
    "login": "Login",
    "logout": "Logout"
  }
}
```

**Example - Arabic (`ar/common.json`):**

```json
{
  "common": {
    "welcome": "مرحباً",
    "goodbye": "وداعاً",
    "save": "حفظ",
    "cancel": "إلغاء"
  },
  "auth": {
    "login": "تسجيل الدخول",
    "logout": "تسجيل الخروج"
  }
}
```

### Using Translations in Components

**1. Client Components:**

```typescript
'use client';

import { useTranslations } from 'next-intl';

export function WelcomeMessage() {
  const t = useTranslations('common');

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <button>{t('save')}</button>
      <button>{t('cancel')}</button>
    </div>
  );
}
```

**2. With Different Namespaces:**

```typescript
'use client';

import { useTranslations } from 'next-intl';

export function LoginForm() {
  const t = useTranslations('auth');  // Use 'auth' namespace

  return (
    <form>
      <button>{t('login')}</button>
      <button>{t('logout')}</button>
    </form>
  );
}
```

**3. Server Components:**

```typescript
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('common');

  return <h1>{t('welcome')}</h1>;
}
```

### Language Switcher

The `LanguageSwitcher` component lets users change languages:

```typescript
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';

export function Header() {
  return (
    <header>
      <nav>
        <LanguageSwitcher />
      </nav>
    </header>
  );
}
```

**How it works:**

1. User clicks language switcher
2. Dropdown shows available languages
3. User selects new language
4. URL updates (e.g., `/en/page` → `/ar/page`)
5. Page reloads with new language
6. All text updates automatically

### RTL (Right-to-Left) Support

Arabic is automatically displayed right-to-left!

**How it works:**

```typescript
// Layout automatically sets dir="rtl" for Arabic
<html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
```

**CSS adjustments:**

Tailwind automatically handles RTL:

```tsx
// This works for both LTR and RTL:
<div className="ml-4">  // margin-left in LTR, margin-right in RTL
<div className="text-left">  // text-left in LTR, text-right in RTL
```

Use logical properties:

```tsx
<div className="ms-4">  // margin-start (left in LTR, right in RTL)
<div className="me-4">  // margin-end (right in LTR, left in RTL)
```

### Adding a New Language

**1. Add locale to config:**

```typescript
// src/i18n.ts
export const locales = ['en', 'ar', 'fr'] as const; // Add 'fr' for French
```

**2. Create translation file:**

```bash
mkdir public/locales/fr
touch public/locales/fr/common.json
```

**3. Add translations:**

```json
{
  "common": {
    "welcome": "Bienvenue",
    "goodbye": "Au revoir"
  }
}
```

**4. Update language switcher:**

```typescript
// src/components/layout/LanguageSwitcher.tsx
const languageNames: Record<string, string> = {
  en: t('english'),
  ar: t('arabic'),
  fr: t('french'), // Add this
};
```

**5. Add translations for language names:**

```json
{
  "language": {
    "french": "Français"
  }
}
```

### Translation Keys Organization

**Best practices:**

```json
{
  "common": {
    // General UI elements
    "save": "Save",
    "cancel": "Cancel"
  },
  "auth": {
    // Authentication related
    "login": "Login",
    "register": "Register"
  },
  "users": {
    // User management
    "createUser": "Create User",
    "editUser": "Edit User"
  },
  "errors": {
    // Error messages
    "required": "This field is required",
    "invalidEmail": "Invalid email"
  }
}
```

### Dynamic Translations

**With variables:**

```typescript
const t = useTranslations('common');

// Translation with placeholder
t('greeting', { name: 'John' });
// English: "Hello, John!"
// Arabic: "مرحباً، John!"
```

Translation file:

```json
{
  "common": {
    "greeting": "Hello, {name}!"
  }
}
```

### Getting Current Locale

```typescript
'use client';

import { useLocale } from 'next-intl';

export function MyComponent() {
  const locale = useLocale();  // 'en' or 'ar'

  console.log('Current language:', locale);

  return <div>Current: {locale}</div>;
}
```

### Formatting Dates and Numbers

```typescript
import { useFormatter } from 'next-intl';

export function DateDisplay() {
  const format = useFormatter();
  const date = new Date();

  return (
    <div>
      {/* Automatically formats based on locale */}
      <p>{format.dateTime(date, { dateStyle: 'long' })}</p>

      {/* Numbers */}
      <p>{format.number(1234567.89)}</p>

      {/* Currency */}
      <p>{format.number(99.99, { style: 'currency', currency: 'USD' })}</p>
    </div>
  );
}
```

### Complete Flow Example

```
1. User visits /en/dashboard
2. Middleware detects locale: 'en'
3. Layout loads English translations
4. Components use useTranslations('namespace')
5. Text displays in English
6. User clicks language switcher
7. Selects Arabic
8. URL changes to /ar/dashboard
9. Layout loads Arabic translations
10. Sets dir="rtl"
11. All text updates to Arabic
12. Layout flips to right-to-left
```

### Debugging i18n

**Check current locale:**

```typescript
console.log('Locale:', useLocale());
```

**Check if translation exists:**

```typescript
const t = useTranslations('common');
console.log(t('key')); // Will show the key if translation missing
```

**Missing translations:**
If a key is missing, it will show the key itself:

```typescript
t('nonexistent'); // Shows: "nonexistent"
```

### Best Practices

1. **Organize by feature:**

   ```json
   {
     "auth": { ... },
     "users": { ... },
     "dashboard": { ... }
   }
   ```

2. **Use descriptive keys:**

   ```json
   // ✅ Good
   "createUserButton": "Create User"

   // ❌ Bad
   "btn1": "Create User"
   ```

3. **Keep translations short:**
   - Avoid long paragraphs in JSON
   - Use multiple keys if needed

4. **Test both languages:**
   - Check layout in RTL
   - Verify text doesn't overflow
   - Test forms and buttons

5. **Use variables for dynamic content:**
   ```json
   "itemCount": "You have {count} items"
   ```

---

## Project Architecture

### Folder Structure Explained

```
src/
├── app/                    # Next.js routes
│   ├── page.tsx           # Home page (/)
│   ├── layout.tsx         # Root layout
│   ├── demo/              # Demo page (/demo)
│   └── api/               # API routes
│
├── components/
│   ├── ui/                # Reusable components
│   │   ├── button.tsx     # Button component
│   │   ├── Input.tsx      # Input component
│   │   └── Dialog.tsx     # Dialog component
│   ├── features/          # Feature-specific components
│   └── layout/            # Layout components (Header, Footer)
│
├── lib/
│   ├── network/           # Network layer
│   │   ├── http-client.ts         # Main HTTP client
│   │   ├── axios.config.ts        # Axios setup
│   │   ├── interceptors/          # All interceptors
│   │   │   ├── auth.interceptor.ts
│   │   │   ├── refresh-token.interceptor.ts
│   │   │   ├── error.interceptor.ts
│   │   │   ├── retry.interceptor.ts
│   │   │   └── logging.interceptor.ts
│   │   └── types/                 # TypeScript types
│   │
│   ├── react-query/       # React Query setup
│   │   ├── QueryProvider.tsx      # Provider
│   │   ├── query-client.ts        # Configuration
│   │   └── hooks.ts               # Utilities
│   │
│   ├── auth.ts            # NextAuth config
│   └── utils.ts           # Utility functions (cn, etc.)
│
├── services/              # API services
│   ├── api.service.ts     # Base service class
│   ├── auth.service.ts    # Authentication service
│   └── user.service.ts    # User service
│
├── hooks/
│   ├── api/               # React Query hooks
│   │   ├── useAuth.ts     # Auth hooks
│   │   └── useUser.ts     # User hooks
│   ├── useToast.ts        # Toast notifications
│   └── useWindowSize.ts   # Custom hooks
│
├── types/
│   ├── index.ts           # Common types
│   └── next-auth.d.ts     # NextAuth types
│
├── config/
│   └── index.ts           # App configuration
│
├── constants/             # Constants
│
└── test/                  # Test setup
    ├── setup.ts           # Test configuration
    └── utils.tsx          # Test utilities
```

### Architecture Layers

**1. Presentation Layer (Components)**

- React components
- UI logic
- User interactions

**2. State Management Layer (React Query)**

- Caching
- Background refetching
- Optimistic updates

**3. Business Logic Layer (Services)**

- API integration
- Data transformation
- Validation

**4. Network Layer (HTTP Client + Interceptors)**

- HTTP requests
- Authentication
- Error handling
- Retries
- Logging

**5. API Server (External)**

- Your backend
- Database
- Business logic

### Data Flow

```
User clicks button
     ↓
Component calls React Query hook
     ↓
React Query checks cache
     ↓ (cache miss)
React Query calls service
     ↓
Service calls HTTP client
     ↓
HTTP client runs through interceptors
     ↓
Request sent to API
     ↓
API responds
     ↓
Response through interceptors
     ↓
React Query caches data
     ↓
Component updates
     ↓
User sees result
```

---

## Testing

### What is Vitest?

Vitest is a **fast test runner** for JavaScript/TypeScript.

Like Jest but:

- ✅ Faster
- ✅ Better TypeScript support
- ✅ Works with Vite/Next.js
- ✅ Compatible with Jest syntax

### Running Tests

```bash
# Run all tests
npm test

# Run with UI (visual test runner)
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### Writing Tests

**1. Basic Test:**

```typescript
import { describe, it, expect } from 'vitest';

describe('Math', () => {
  it('adds two numbers', () => {
    expect(1 + 1).toBe(2);
  });

  it('multiplies numbers', () => {
    expect(2 * 3).toBe(6);
  });
});
```

**2. Testing Components:**

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/utils';
import { Button } from '../Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);

    // Check if button is in document
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles clicks', () => {
    const handleClick = vi.fn();  // Mock function

    render(<Button onClick={handleClick}>Click</Button>);

    // Click the button
    screen.getByText('Click').click();

    // Check if function was called
    expect(handleClick).toHaveBeenCalled();
  });

  it('can be disabled', () => {
    render(<Button disabled>Disabled</Button>);

    expect(screen.getByText('Disabled')).toBeDisabled();
  });
});
```

**3. Testing with User Interaction:**

```typescript
import { render, screen } from '@/test/utils';
import userEvent from '@testing-library/user-event';

describe('LoginForm', () => {
  it('submits form', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(<LoginForm onSubmit={handleSubmit} />);

    // Type in email
    await user.type(
      screen.getByLabelText('Email'),
      'john@example.com'
    );

    // Type in password
    await user.type(
      screen.getByLabelText('Password'),
      'password123'
    );

    // Click submit
    await user.click(screen.getByText('Login'));

    // Check if submit was called with correct data
    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'john@example.com',
      password: 'password123',
    });
  });
});
```

**4. Testing Async Code:**

```typescript
import { waitFor } from '@testing-library/react';

describe('UserList', () => {
  it('loads users', async () => {
    render(<UserList />);

    // Initially shows loading
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for users to load
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });
});
```

### Test Utilities

The project includes custom test utilities in `src/test/utils.tsx`:

```typescript
import { render } from '@/test/utils';

// This render automatically wraps component with:
// - QueryClientProvider (React Query)
// - Other providers you add

render(<MyComponent />);
```

---

## Common Patterns

### Pattern 1: CRUD Operations

**Create:**

```typescript
const createUser = useCreateUser();

await createUser.mutateAsync({
  name: 'John',
  email: 'john@example.com',
});
```

**Read:**

```typescript
const { data } = useUsers();
const { data: user } = useUser(id);
```

**Update:**

```typescript
const updateUser = useUpdateUser();

await updateUser.mutateAsync({
  id: '123',
  data: { name: 'Jane' },
});
```

**Delete:**

```typescript
const deleteUser = useDeleteUser();

await deleteUser.mutateAsync('123');
```

### Pattern 2: Form Handling

```typescript
'use client';

import { useState } from 'react';
import { useCreateUser } from '@/hooks/api';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/hooks/useToast';

export function CreateUserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const createUser = useCreateUser();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createUser.mutateAsync({ name, email });

      toast({
        title: 'Success!',
        description: 'User created successfully.',
      });

      // Clear form
      setName('');
      setEmail('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create user.',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <Button type="submit" disabled={createUser.isPending}>
        {createUser.isPending ? 'Creating...' : 'Create User'}
      </Button>
    </form>
  );
}
```

### Pattern 3: Loading States

```typescript
const { data, isLoading, error } = useUsers();

if (isLoading) {
  return <div>Loading...</div>;
}

if (error) {
  return <div>Error: {error.message}</div>;
}

return <div>{/* Render data */}</div>;
```

### Pattern 4: Pagination

```typescript
'use client';

import { useState } from 'react';
import { useUsers } from '@/hooks/api';

export function UsersList() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useUsers({ page, pageSize: 10 });

  return (
    <div>
      {data?.data.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}

      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Previous
      </button>

      <span>Page {page}</span>

      <button onClick={() => setPage(page + 1)}>
        Next
      </button>
    </div>
  );
}
```

### Pattern 5: Search/Filter

```typescript
'use client';

import { useState } from 'react';
import { useUsers } from '@/hooks/api';
import { Input } from '@/components/ui/Input';

export function UsersSearch() {
  const [search, setSearch] = useState('');
  const { data, isLoading } = useUsers({ search });

  return (
    <div>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search users..."
      />

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {data?.data.map(user => (
            <div key={user.id}>{user.name}</div>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## Quick Reference

### Most Used Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Run production build

# Code Quality
npm run lint         # Check linting
npm run lint:fix     # Fix linting errors
npm run format       # Format code
npm run type-check   # Check types

# Testing
npm test             # Run tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Coverage report
```

### File Naming Conventions

- **Components:** PascalCase - `button.tsx`, `UserCard.tsx`
- **Hooks:** camelCase with 'use' - `useUsers.ts`, `useAuth.ts`
- **Services:** camelCase - `user.service.ts`, `auth.service.ts`
- **Types:** camelCase - `index.ts`, `api.types.ts`
- **Tests:** Same as file + `.test` - `Button.test.tsx`

### Import Order

```typescript
// 1. External libraries
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// 2. Internal libraries/utilities
import { cn } from '@/lib/utils';
import { httpClient } from '@/lib/network';

// 3. Components
import { Button } from '@/components/ui/Button';

// 4. Types
import type { User } from '@/types';

// 5. Hooks
import { useUsers } from '@/hooks/api';

// 6. Services
import { userService } from '@/services/user.service';
```

### Common Shortcuts

**Path Aliases:**

- `@/` = `src/`
- `@/components/` = `src/components/`
- `@/lib/` = `src/lib/`
- `@/hooks/` = `src/hooks/`

**React Query:**

- `useQuery` = Fetch data (GET)
- `useMutation` = Modify data (POST, PUT, DELETE)
- `queryClient.invalidateQueries()` = Refetch data

**NextAuth:**

- `auth()` = Get session (server)
- `signIn()` = Login (client)
- `signOut()` = Logout (client)

---

## Summary

You now understand:

✅ **Next.js** - Server/Client components, routing, data fetching  
✅ **TypeScript** - Types, interfaces, generics  
✅ **Tailwind CSS** - Utility classes, responsive design  
✅ **React Query** - Queries, mutations, caching  
✅ **Network Layer** - HTTP client, interceptors, token management  
✅ **NextAuth** - Authentication, sessions  
✅ **Radix UI** - Accessible components  
✅ **Architecture** - Project structure, data flow  
✅ **Testing** - Vitest, React Testing Library  
✅ **Patterns** - Common use cases and best practices

**Next Steps:**

1. Explore the `/demo` page
2. Read through the code files
3. Try creating a new feature
4. Write some tests
5. Build your app!

Good luck! 🚀
