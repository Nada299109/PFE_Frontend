# Project Architecture

This project follows a **modular, feature-based architecture** that organizes code by business domains/features rather than by technical layers.

## Directory Structure

```
src/
├── app/                          # Next.js App Router pages
│   └── [locale]/                 # Internationalized routes
│       ├── demo/                 # Demo feature pages
│       ├── example/              # Example feature pages
│       ├── showcase/             # Showcase feature pages
│       └── layout.tsx            # Locale layout
│
├── modules/                       # Feature modules (self-contained)
│   ├── auth/                     # Authentication module
│   │   ├── components/           # Auth-specific components
│   │   ├── hooks/                # Auth-specific hooks (useAuth, useLogin, etc.)
│   │   ├── services/             # Auth service (auth.service.ts)
│   │   ├── types/                # Auth-specific types
│   │   └── index.ts              # Module exports
│   │
│   ├── users/                    # Users module
│   │   ├── components/           # User-specific components
│   │   ├── hooks/                # User hooks (useUsers, useUser, etc.)
│   │   ├── services/             # User service (user.service.ts)
│   │   ├── types/                # User-specific types
│   │   └── index.ts              # Module exports
│   │
│   ├── demo/                     # Demo module
│   │   ├── components/           # Demo-specific components
│   │   └── index.ts              # Module exports
│   │
│   ├── example/                  # Example module
│   │   ├── components/           # Example-specific components
│   │   └── index.ts              # Module exports
│   │
│   └── showcase/                 # Showcase module
│       ├── components/           # Showcase-specific components
│       └── index.ts              # Module exports
│
├── components/                   # Shared components
│   ├── layout/                   # Layout components (LanguageSwitcher, etc.)
│   └── ui/                       # Shared UI components (shadcn/ui)
│
├── lib/                          # Shared libraries and utilities
│   ├── network/                  # HTTP client, interceptors
│   ├── react-query/              # React Query configuration
│   ├── auth.ts                   # NextAuth configuration
│   └── utils.ts                  # Utility functions
│
├── hooks/                        # Shared hooks (non-module specific)
│   ├── api/                      # Legacy API hooks (re-exports from modules)
│   ├── use-toast.ts
│   ├── useTranslations.ts
│   └── useWindowSize.ts
│
├── services/                     # Legacy services (re-exports from modules)
│   ├── api.service.ts            # Base API service (shared)
│   ├── auth.service.ts           # Re-exports from @/modules/auth
│   └── user.service.ts           # Re-exports from @/modules/users
│
├── types/                        # Shared types
│   └── index.ts                  # Common types + re-exports from modules
│
├── config/                       # Configuration files
├── styles/                       # Global styles
└── test/                         # Test utilities
```

## Module Structure

Each module is **self-contained** and follows this structure:

```
modules/[feature-name]/
├── components/       # Feature-specific React components
├── hooks/           # Feature-specific React hooks
├── services/        # Feature-specific API services
├── types/           # Feature-specific TypeScript types
└── index.ts         # Barrel export file
```

### Example: Auth Module

```typescript
// modules/auth/types/index.ts
export interface LoginCredentials { ... }
export interface AuthResponse { ... }

// modules/auth/services/auth.service.ts
export class AuthService extends BaseApiService { ... }

// modules/auth/hooks/useAuth.ts
export function useLogin() { ... }
export function useAuth() { ... }

// modules/auth/index.ts
export * from './hooks/useAuth';
export * from './services/auth.service';
export * from './types';
```

## Import Patterns

### ✅ Recommended: Import from modules

```typescript
// Import from specific module
import { useLogin, useAuth } from '@/modules/auth';
import { useUsers, useCreateUser } from '@/modules/users';
import { ExampleCard } from '@/modules/example';
```

### ✅ Also supported: Import from legacy paths (backward compatibility)

```typescript
// These still work but are deprecated
import { useLogin } from '@/hooks/api';
import { authService } from '@/services/auth.service';
```

### ✅ Shared components and utilities

```typescript
// Shared UI components
import { Button } from '@/components/ui/button';

// Shared utilities
import { cn } from '@/lib/utils';

// Shared types
import type { ApiResponse } from '@/types';
```

## Benefits of This Architecture

1. **Modularity**: Each feature is self-contained and can be developed independently
2. **Scalability**: Easy to add new features without affecting existing code
3. **Maintainability**: Related code is grouped together, making it easier to find and maintain
4. **Testability**: Modules can be tested in isolation
5. **Team Collaboration**: Different teams can work on different modules without conflicts
6. **Code Reusability**: Shared code is clearly separated from feature-specific code

## Adding a New Module

1. Create the module directory structure:

   ```bash
   mkdir -p src/modules/[feature-name]/{components,hooks,services,types}
   ```

2. Create module files:
   - `types/index.ts` - Define feature-specific types
   - `services/[feature].service.ts` - Create API service (extends BaseApiService)
   - `hooks/use[Feature].ts` - Create React Query hooks
   - `components/` - Add feature-specific components
   - `index.ts` - Export everything from the module

3. Create pages in `app/[locale]/[feature-name]/`

4. Import from the module:
   ```typescript
   import { useFeature, featureService } from '@/modules/[feature-name]';
   ```

## Migration Notes

- Old imports from `@/hooks/api` and `@/services/*` still work (they re-export from modules)
- Gradually migrate to using `@/modules/*` imports
- Module-specific types are in their respective modules, not in `@/types`
- Shared types remain in `@/types` and re-export module types for convenience

## Best Practices

1. **Keep modules independent**: Avoid cross-module dependencies when possible
2. **Use shared code**: Put reusable code in `lib/`, `components/ui/`, or `components/layout/`
3. **Barrel exports**: Always use `index.ts` files for clean imports
4. **Type safety**: Define types in the module's `types/` directory
5. **Service layer**: All API calls go through services that extend `BaseApiService`
6. **React Query**: Use hooks for all data fetching and mutations
