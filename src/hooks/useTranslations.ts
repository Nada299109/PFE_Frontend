import { useTranslations as useNextIntlTranslations } from 'next-intl';

/**
 * Custom useTranslations hook
 * Wrapper around next-intl's useTranslations for easier usage
 */

export function useTranslations(namespace: string = 'common') {
  return useNextIntlTranslations(namespace);
}

// Export other useful i18n hooks
export { useLocale, useFormatter } from 'next-intl';
