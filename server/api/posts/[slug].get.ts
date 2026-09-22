export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')
  const { locale } = getQuery(event)
  const post = getBlogPost(slug ?? '', locale as string | undefined)

  if (!post) {
    throw createError({ statusCode: 404, statusMessage: 'Article introuvable' })
  }

  return post
})
