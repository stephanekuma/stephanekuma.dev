export default defineEventHandler((event) => {
  const { locale } = getQuery(event)
  return getProjects(locale as string | undefined)
})
