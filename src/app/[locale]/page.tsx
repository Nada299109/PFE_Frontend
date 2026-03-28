import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { Button } from '@/components/ui/button';

export default function Home() {
  const t = useTranslations('common');

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50">
      <div className="absolute right-4 top-4">
        <LanguageSwitcher />
      </div>

      <div className="flex min-h-screen flex-col items-center justify-center p-8">
        <div className="z-10 w-full max-w-5xl space-y-8 text-center">
          {/* Logo/Icon */}
          <div className="mb-8 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-emerald-500 text-3xl font-bold text-white shadow-xl">
              SB
            </div>
          </div>

          {/* Title */}
          <h1 className="bg-gradient-to-r from-indigo-600 to-emerald-600 bg-clip-text text-6xl font-bold tracking-tight text-transparent">
            {t('appName')}
          </h1>

          {/* Description */}
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Production-ready Next.js application with TypeScript, Tailwind CSS,
            shadcn/ui components, and best practices
          </p>

          {/* Features Grid */}
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 pt-8 md:grid-cols-4">
            {[
              { icon: '⚡', text: 'Next.js 15' },
              { icon: '🎨', text: 'shadcn/ui' },
              { icon: '🌍', text: 'i18n Ready' },
              { icon: '🔐', text: 'Auth Built-in' },
            ].map((feature, i) => (
              <div
                key={i}
                className="rounded-lg border border-gray-200 bg-white/50 p-4 backdrop-blur transition-shadow hover:shadow-lg"
              >
                <div className="mb-2 text-3xl">{feature.icon}</div>
                <div className="text-sm font-medium text-gray-700">
                  {feature.text}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex justify-center gap-4 pt-8">
            <Link href="/en/showcase">
              <Button size="lg" className="gradient-primary text-white">
                View Showcase
              </Button>
            </Link>
            <Link href="/en/demo">
              <Button size="lg" variant="outline">
                Demo Page
              </Button>
            </Link>
          </div>

          {/* Tech Stack */}
          <div className="pt-12 text-sm text-gray-500">
            <p className="mb-2">Built with:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Next.js',
                'React Query',
                'shadcn/ui',
                'Tailwind CSS',
                'TypeScript',
                'NextAuth',
                'Vitest',
              ].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-gray-200 bg-white px-3 py-1"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
