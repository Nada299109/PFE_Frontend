# Next.js Production Boilerplate

> A complete, production-ready Next.js boilerplate with TypeScript, Tailwind CSS, comprehensive network layer, state management, authentication, UI components, and testing setup.

## 🚀 Features

### Core Stack

- ⚡ **Next.js 15** - Latest App Router with React 19
- 🔷 **TypeScript** - Full type safety with strict mode
- 🎨 **Tailwind CSS** - Utility-first styling with automatic class sorting
- 📦 **Radix UI** - Headless, accessible UI components
- 🎭 **CVA** - Class Variance Authority for component variants
- 🌍 **next-intl** - Internationalization (i18n) with English & Arabic support

### Development Tools

- 📏 **ESLint** - Code quality (balanced, not overly strict)
- 💅 **Prettier** - Automatic code formatting with Tailwind plugin
- 🐶 **Husky** - Pre-commit hooks and commit message validation
- 🔍 **lint-staged** - Run linters only on staged files
- 🧪 **Vitest** - Fast unit testing with React Testing Library
- 📊 **Coverage** - Test coverage reports

### Network & State Management

- 🌐 **Axios** - HTTP client with comprehensive interceptor system
  - Authentication interceptor (auto token injection)
  - Refresh token interceptor (automatic token refresh)
  - Retry interceptor (exponential backoff)
  - Error handling interceptor
  - Logging interceptor (development only)
- 🔄 **React Query** - Server state management with caching
  - Automatic background refetching
  - Optimistic updates
  - Request deduplication
  - DevTools included

### Authentication & Security

- 🔐 **NextAuth.js v5** - Complete authentication solution
- 🎫 **JWT Strategy** - Secure token-based authentication
- 🔄 **Token Management** - Automatic refresh with request queuing
- 🛡️ **Type-safe Sessions** - Full TypeScript support

### Architecture

- 📁 **Clean Architecture** - Separation of concerns
- 🏗️ **Feature-based Structure** - Scalable organization
- 🎯 **Path Aliases** - Clean imports with `@/` prefix
- 📝 **Comprehensive Types** - Full type coverage

---

## 📦 Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Generate NextAuth secret
openssl rand -base64 32
# Copy the output to NEXTAUTH_SECRET in .env

# Initialize git hooks
npm run prepare

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)  
Demo page: [http://localhost:3000/demo](http://localhost:3000/demo)

---

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
├── components/
│   ├── ui/                      # Reusable UI components (Button, Input, Dialog, Toast)
│   ├── features/               # Feature-specific components
│   └── layout/                 # Layout components
├── lib/
│   ├── network/                # Network layer with interceptors
│   ├── react-query/           # React Query setup
│   └── auth.ts                # NextAuth configuration
├── services/                   # API services
├── hooks/
│   ├── api/                    # React Query hooks
│   └── useToast.ts            # Toast notifications
├── types/                      # TypeScript types
├── config/                     # App configuration
└── test/                       # Test setup and utilities
```

---

## 🎯 Available Scripts

| Command                 | Description               |
| ----------------------- | ------------------------- |
| `npm run dev`           | Start development server  |
| `npm run build`         | Build for production      |
| `npm run start`         | Start production server   |
| `npm run lint`          | Run ESLint                |
| `npm run lint:fix`      | Fix ESLint errors         |
| `npm run format`        | Format code with Prettier |
| `npm run type-check`    | Check TypeScript types    |
| `npm test`              | Run tests                 |
| `npm run test:ui`       | Run tests with UI         |
| `npm run test:coverage` | Generate coverage report  |

---

## 🏗️ Architecture

### Request Flow

```
Component → React Query → Service → HTTP Client → Interceptors → API
    ↑                                                               ↓
    └──────────── Cache Update ← Response ← Interceptors ←─────────┘
```

## 📝 Commit Convention

This project uses conventional commits. Format:

```
type(scope): subject
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements
- `ci`: CI/CD changes
- `build`: Build system changes
- `revert`: Revert previous commit

**Examples:**

```bash
git commit -m "feat(auth): add login functionality"
git commit -m "fix(ui): resolve button alignment issue"
git commit -m "docs: update README"
```

### Interceptor Pipeline

**Request:** Logging → Auth (token injection)  
**Response:** Logging → Token Refresh → Retry → Error Handler

### Token Refresh Flow

```
401 Error → Queue request → Refresh token → Retry all queued requests
```

---

## 💡 Quick Start Examples

### 1. Create a New Service

```typescript
// src/services/post.service.ts
import { BaseApiService } from './api.service';

class PostService extends BaseApiService {
  async getPosts() {
    return this.get('/posts');
  }

  async createPost(data) {
    return this.post('/posts', data);
  }
}

export const postService = new PostService();
```

### 2. Create React Query Hooks

```typescript
// src/hooks/api/usePost.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import { postService } from '@/services/post.service';

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => postService.getPosts(),
  });
}

export function useCreatePost() {
  return useMutation({
    mutationFn: (data) => postService.createPost(data),
  });
}
```

### 3. Use in Components

```typescript
'use client';

import { usePosts, useCreatePost } from '@/hooks/api/usePost';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/hooks/useToast';

export default function PostsPage() {
  const { data, isLoading } = usePosts();
  const createPost = useCreatePost();
  const { toast } = useToast();

  const handleCreate = async () => {
    try {
      await createPost.mutateAsync({ title: 'New Post' });
      toast({ title: 'Success!' });
    } catch (error) {
      toast({ title: 'Error', variant: 'destructive' });
    }
  };

  return (
    <div>
      <Button onClick={handleCreate}>Create</Button>
      {/* Your content */}
    </div>
  );
}
```

### 4. Use UI Components

```typescript
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

export function MyDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Title</DialogTitle>
        </DialogHeader>
        <div>
          <Label>Name</Label>
          <Input placeholder="Enter name" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

### 5. Authentication

```typescript
// Server component
import { auth } from '@/lib/auth';

export default async function Page() {
  const session = await auth();
  if (!session) redirect('/login');

  return <div>Welcome {session.user.name}</div>;
}

// Client component
import { signIn, signOut } from 'next-auth/react';

<Button onClick={() => signIn()}>Sign In</Button>
<Button onClick={() => signOut()}>Sign Out</Button>
```

### 6. Testing

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/utils';
import { Button } from '../Button';

describe('Button', () => {
  it('renders', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

### 7. Internationalization (i18n)

**Using translations in components:**

```typescript
import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations('common');

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

**Language Switcher:**

```typescript
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';

<LanguageSwitcher />
```

**Adding new translations:**

Edit `public/locales/en/common.json` and `public/locales/ar/common.json`:

```json
{
  "common": {
    "newKey": "New translation"
  }
}
```

**Supported languages:**

- English (en) - Default
- Arabic (ar) - RTL support included

---

## 🔧 Configuration

### Environment Variables

```env
# .env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000
```

### Network Settings

Edit `src/lib/network/axios.config.ts`:

- Timeout: 30 seconds
- Base URL: from environment
- Headers: JSON content type

### React Query Settings

Edit `src/lib/react-query/query-client.ts`:

- Stale time: 5 minutes
- Cache time: 10 minutes
- Retry: 1 attempt
- Refetch on window focus: disabled

---

## 📝 Commit Convention

```
type(scope): subject

Examples:
feat(auth): add login functionality
fix(ui): resolve button alignment
docs: update README
test: add button tests
```

Types: feat, fix, docs, style, refactor, test, chore, perf, ci, build, revert

---

## 🧪 Testing

```bash
# Run tests
npm test

# Run with UI
npm run test:ui

# Coverage report
npm run test:coverage
```

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

---

## 🐛 Troubleshooting

**Tokens not persisting:** Check localStorage in DevTools  
**401 not refreshing:** Verify `NEXT_PUBLIC_API_URL`  
**Tests failing:** Run `npm run test:ui` for details  
**Queries not refetching:** Check staleTime or manually invalidate

---

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Query Docs](https://tanstack.com/query/latest)
- [NextAuth Docs](https://next-auth.js.org)
- [Radix UI Docs](https://www.radix-ui.com)
- [Vitest Docs](https://vitest.dev)

---

## ✅ Production Checklist

- [ ] Set environment variables
- [ ] Generate strong NEXTAUTH_SECRET
- [ ] Configure CORS
- [ ] Set up error monitoring
- [ ] Enable rate limiting
- [ ] Run test suite
- [ ] Check type coverage
- [ ] Test authentication flow
- [ ] Verify token refresh
- [ ] Optimize images

---

## 🎯 What's Included

✅ Complete network layer with interceptors  
✅ Automatic token refresh  
✅ Smart caching with React Query  
✅ Full TypeScript coverage  
✅ Authentication with NextAuth  
✅ UI components with Radix  
✅ Testing setup with Vitest  
✅ Production-ready architecture

---

## 📄 License

MIT

---

**Built for production applications** 🚀
#   P F E _ F r o n t e n d  
 