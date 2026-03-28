/**
 * Environment configuration
 * Access environment variables in a type-safe manner
 */
export const config = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'Next.js App',
    env: process.env.NODE_ENV,
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
    timeout: 30000,
  },
} as const;
