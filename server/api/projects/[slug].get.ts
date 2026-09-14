export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    throw createError({ statusCode: 404, statusMessage: 'Projet introuvable' })
  }

  return project
})
