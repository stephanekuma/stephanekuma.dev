export default defineEventHandler(() => {
  return blogPosts.map(({ body, ...summary }) => summary)
})
