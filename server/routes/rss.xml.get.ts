const SITE_URL = 'https://stephane.dev'

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')

  const items = blogPosts
    .map((post) => {
      const pubDate = new Date(post.date).toUTCString()
      return `  <item>
    <title>${escapeXml(post.title)}</title>
    <link>${SITE_URL}/blog/${post.slug}</link>
    <description>${escapeXml(post.excerpt)}</description>
    <pubDate>${pubDate}</pubDate>
  </item>`
    })
    .join('\n\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>stephane.dev — blog</title>
  <link>${SITE_URL}/blog</link>
  <description>Notes techniques de Kossi Stéphane Kuma sur l'architecture logicielle et le développement web &amp; mobile.</description>
  <language>fr</language>

${items}

</channel>
</rss>
`
})
