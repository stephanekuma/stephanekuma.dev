interface ContactPayload {
  name?: string
  email?: string
  type?: string
  message?: string
  locale?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const MESSAGES = {
  fr: {
    required: 'Merci de remplir tous les champs obligatoires.',
    invalidEmail: 'Adresse email invalide.',
    defaultType: 'nouveau projet'
  },
  en: {
    required: 'Please fill in all required fields.',
    invalidEmail: 'Invalid email address.',
    defaultType: 'new project'
  }
} as const

export default defineEventHandler(async (event) => {
  const body = await readBody<ContactPayload>(event)
  const copy = body?.locale === 'en' ? MESSAGES.en : MESSAGES.fr

  const name = body?.name?.trim()
  const email = body?.email?.trim()
  const message = body?.message?.trim()
  const type = body?.type?.trim() || copy.defaultType

  if (!name || !email || !message) {
    throw createError({ statusCode: 400, statusMessage: copy.required })
  }

  if (!EMAIL_RE.test(email)) {
    throw createError({ statusCode: 400, statusMessage: copy.invalidEmail })
  }

  // TODO: brancher un vrai envoi (email/backend externe) une fois disponible.
  console.log('[contact]', { name, email, type, message })

  return { ok: true }
})
