# Public Folder

This folder contains static assets that are served directly by Next.js.

## Structure

```
public/
├── images/          # Image files (logos, icons, etc.)
├── fonts/           # Custom font files
└── locales/         # Translation files
    ├── en/          # English translations
    │   └── common.json
    └── ar/          # Arabic translations
        └── common.json
```

## Usage

### Images

Place your images in the `images/` folder and reference them in your code:

```tsx
import Image from 'next/image';

<Image src="/images/logo.png" alt="Logo" width={200} height={100} />;
```

Or in CSS:

```css
background-image: url('/images/background.jpg');
```

### Fonts

Place custom font files in the `fonts/` folder and reference them in your CSS:

```css
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/CustomFont.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}
```

### Locales

Translation files are organized by locale (language):

- `en/common.json` - English translations
- `ar/common.json` - Arabic translations

Add new translation keys to these files:

```json
{
  "common": {
    "welcome": "Welcome",
    "goodbye": "Goodbye"
  }
}
```

Use in components:

```tsx
import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations('common');

  return <div>{t('welcome')}</div>;
}
```

## Best Practices

1. **Optimize Images**: Use WebP format when possible
2. **Compress Files**: Compress images and fonts before adding them
3. **Use SVG**: For icons and simple graphics, prefer SVG format
4. **Lazy Load**: Use Next.js Image component for automatic optimization
5. **CDN**: Consider using a CDN for large assets in production

## Notes

- Files in this folder are publicly accessible
- Do not store sensitive information here
- All files are served from the root URL (e.g., `/images/logo.png`)
- This folder is not processed by webpack
