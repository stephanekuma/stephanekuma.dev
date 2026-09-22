const SITE_URL = 'https://stephane.dev'

const CHANNEL_COPY = {
  fr: {
    title: 'stephane.dev — blog',
    description: "Notes techniques de Kossi Stéphane Kuma sur l'architecture logicielle et le développement web & mobile."
  },
  en: {
    title: 'stephane.dev — blog',
    description: 'Technical notes by Kossi Stéphane Kuma on software architecture and web & mobile development.'
  }
} as const

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')

  const { locale: rawLocale } = getQuery(event)
  const locale = rawLocale === 'en' ? 'en' : 'fr'
  const copy = CHANNEL_COPY[locale]
  const basePath = locale === 'en' ? '/en/blog' : '/blog'

  const items = getBlogPosts(locale)
    .map((post) => {
      const pubDate = new Date(post.date).toUTCString()
      return `  <item>
    <title>${escapeXml(post.title)}</title>
    <link>${SITE_URL}${basePath}/${post.slug}</link>
    <description>${escapeXml(post.excerpt)}</description>
    <pubDate>${pubDate}</pubDate>
  </item>`
    })
    .join('\n\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${escapeXml(copy.title)}</title>
  <link>${SITE_URL}${basePath}</link>
  <description>${escapeXml(copy.description)}</description>
  <language>${locale}</language>

${items}

</channel>
</rss>
`
})
