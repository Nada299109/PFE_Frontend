# Design System Guidelines

This project uses **shadcn/ui** with **Tailwind CSS** for a modern, accessible, and customizable design system.

## Overview

- **Design System**: shadcn/ui (default style variant)
- **Styling**: Tailwind CSS
- **Component Base**: Radix UI (headless, accessible primitives)
- **Icons**: Lucide React
- **Theming**: CSS Variables (light/dark mode support)

## Core Principles

### 1. Component Ownership

- Components are **copied into your codebase** (not installed as dependencies)
- You own and can customize every component
- No runtime overhead - components are just React + Tailwind classes

### 2. Accessibility First

- Built on Radix UI primitives (WCAG compliant)
- Keyboard navigation built-in
- Screen reader support
- Focus management handled automatically

### 3. Tailwind Native

- All styling uses Tailwind utility classes
- CSS Variables for theming
- No CSS-in-JS runtime overhead
- Easy to customize and extend

## Component Usage

### Import Pattern

Always use lowercase file names (shadcn/ui convention):

```typescript
// ✅ Correct
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

// ❌ Incorrect
import { Button } from '@/components/ui/Button';
```

### Basic Component Example

```typescript
import { Button } from '@/components/ui/button';

export function MyComponent() {
  return (
    <Button variant="default" size="lg">
      Click me
    </Button>
  );
}
```

## Available Components

### Form Components

- `button` - Button with multiple variants
- `input` - Text input field
- `textarea` - Multi-line text input
- `select` - Dropdown select
- `checkbox` - Checkbox input
- `radio-group` - Radio button group
- `switch` - Toggle switch
- `slider` - Range slider
- `label` - Form label
- `form` - Form wrapper with validation

### Layout Components

- `card` - Card container
- `separator` - Divider line
- `scroll-area` - Custom scrollable area
- `resizable` - Resizable panels
- `accordion` - Collapsible sections
- `collapsible` - Expandable content

### Overlay Components

- `dialog` - Modal dialog
- `alert-dialog` - Confirmation dialog
- `sheet` - Side panel
- `popover` - Popover menu
- `hover-card` - Hover card
- `tooltip` - Tooltip
- `dropdown-menu` - Dropdown menu
- `context-menu` - Right-click menu

### Feedback Components

- `alert` - Alert message
- `toast` / `sonner` - Toast notifications
- `skeleton` - Loading skeleton
- `progress` - Progress bar

### Data Display

- `table` - Data table
- `badge` - Status badge
- `avatar` - User avatar
- `tabs` - Tab navigation

### Navigation

- `breadcrumb` - Breadcrumb navigation
- `pagination` - Pagination controls
- `navigation-menu` - Navigation menu
- `menubar` - Menu bar
- `command` - Command palette

### Other

- `calendar` - Date picker calendar
- `chart` - Chart components (when needed)

## Adding New Components

Use the shadcn/ui CLI to add components:

```bash
# Add a component
npx shadcn@latest add [component-name]

# Examples
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add table

# Overwrite existing component (to update or change style)
npx shadcn@latest add button --overwrite
```

## Theming

### Color System

Colors are defined using CSS variables in `src/styles/globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 239 84% 67%;
  --secondary: 142 76% 36%;
  /* ... */
}
```

### Customizing Colors

1. Edit CSS variables in `globals.css`
2. Colors use HSL format (hue, saturation, lightness)
3. Dark mode variables are in `.dark` selector

### Using Theme Colors

```typescript
// In Tailwind classes
<div className="bg-primary text-primary-foreground">
<div className="bg-secondary text-secondary-foreground">
<div className="border-border">

// In custom CSS
.custom-class {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}
```

## Component Variants

### Button Variants

```typescript
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon</Button>
```

### Card Variants

```typescript
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

## Customization

### Extending Components

Since components are in your codebase, you can:

1. **Modify directly** - Edit the component file
2. **Extend with className** - Add custom classes via props
3. **Create variants** - Add new variants using CVA (Class Variance Authority)

### Example: Custom Button Variant

```typescript
// In button.tsx, add to variants:
variant: {
  // ... existing variants
  gradient: 'bg-gradient-to-r from-indigo-500 to-emerald-500 text-white',
}
```

### Custom Utility Classes

Add custom utilities in `globals.css`:

```css
@layer utilities {
  .gradient-primary {
    background: linear-gradient(135deg, #818cf8 0%, #10b981 100%);
  }

  .glass {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
  }
}
```

## Icons

Use **Lucide React** for icons:

```typescript
import { Search, User, Settings } from 'lucide-react';

<Button>
  <Search className="mr-2 h-4 w-4" />
  Search
</Button>
```

Browse all icons: https://lucide.dev/icons

## Best Practices

### 1. Component Composition

```typescript
// ✅ Good - Compose components
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>

// ❌ Avoid - Custom divs when components exist
<div className="rounded-lg border p-6">
  <h3>Title</h3>
  <div>Content</div>
</div>
```

### 2. Consistent Spacing

```typescript
// Use Tailwind spacing scale
<div className="space-y-4">  // 1rem gap
<div className="gap-2">      // 0.5rem gap
<div className="p-6">        // 1.5rem padding
```

### 3. Responsive Design

```typescript
// Mobile-first approach
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
<div className="text-sm md:text-base lg:text-lg">
```

### 4. Dark Mode Support

```typescript
// Components automatically support dark mode via CSS variables
// No additional code needed - just toggle .dark class on html/body
```

### 5. Accessibility

- Always use semantic HTML
- Include proper ARIA labels when needed
- Test keyboard navigation
- Components from shadcn/ui handle most a11y concerns automatically

## File Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   └── layout/           # Layout components
├── styles/
│   └── globals.css      # Global styles & CSS variables
└── lib/
    └── utils.ts         # cn() utility for className merging
```

## Resources

- **shadcn/ui Docs**: https://ui.shadcn.com
- **Radix UI Docs**: https://www.radix-ui.com
- **Tailwind CSS Docs**: https://tailwindcss.com
- **Lucide Icons**: https://lucide.dev
- **Class Variance Authority**: https://cva.style

## Updating Components

To update a component to the latest version:

```bash
npx shadcn@latest add [component-name] --overwrite
```

**Note**: This will overwrite your customizations. Consider:

1. Backing up your customizations
2. Using git to track changes
3. Extending components instead of modifying when possible

## Style Variant

This project uses the **"default"** style variant, which provides:

- Clean, minimal aesthetic
- Lighter visual weight
- More neutral design
- Better for professional/business applications

To switch to "New York" style (more rounded, decorative):

1. Update `components.json`: `"style": "new-york"`
2. Re-add components with `--overwrite` flag
