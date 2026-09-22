export default defineEventHandler((event) => {
  const { locale } = getQuery(event)
  return getBlogPosts(locale as string | undefined).map(({ body, ...summary }) => summary)
})
