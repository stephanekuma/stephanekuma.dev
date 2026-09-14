interface ContactPayload {
  name?: string
  email?: string
  type?: string
  message?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default defineEventHandler(async (event) => {
  const body = await readBody<ContactPayload>(event)

  const name = body?.name?.trim()
  const email = body?.email?.trim()
  const message = body?.message?.trim()
  const type = body?.type?.trim() || 'nouveau projet'

  if (!name || !email || !message) {
    throw createError({ statusCode: 400, statusMessage: 'Merci de remplir tous les champs obligatoires.' })
  }

  if (!EMAIL_RE.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Adresse email invalide.' })
  }

  // TODO: brancher un vrai envoi (email/backend externe) une fois disponible.
  console.log('[contact]', { name, email, type, message })

  return { ok: true }
})
