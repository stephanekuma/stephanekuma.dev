export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')
  const { locale } = getQuery(event)
  const project = getProject(slug ?? '', locale as string | undefined)

  if (!project) {
    throw createError({ statusCode: 404, statusMessage: 'Projet introuvable' })
  }

  return project
})
