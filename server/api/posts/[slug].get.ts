export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    throw createError({ statusCode: 404, statusMessage: 'Article introuvable' })
  }

  return post
})
