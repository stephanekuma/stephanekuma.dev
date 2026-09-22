import { getSiteContent } from '~/data/site'

export function useSiteContent() {
  const { locale } = useI18n()
  return computed(() => getSiteContent(locale.value))
}
