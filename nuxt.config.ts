// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon', '@nuxtjs/i18n'],

  css: ['~/assets/css/main.css'],

  icon: {
    // Lucide icons are resolved from the locally installed @iconify-json/lucide
    // collection and rendered as inline SVG (not the CSS-mask default) so they
    // work with zero client JS/CSS generation — safest for `pnpm generate`.
    mode: 'svg',
    provider: 'iconify'
  },

  i18n: {
    baseUrl: 'https://stephane.dev',
    locales: [
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' }
    ],
    defaultLocale: 'fr',
    strategy: 'prefix_except_default',
    langDir: 'locales/',
    lazy: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },

  app: {
    head: {
      htmlAttrs: {
        'data-theme': 'dark'
      },
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'alternate', type: 'application/rss+xml', title: 'stephane.dev — blog', href: '/rss.xml' }
      ],
      script: [
        {
          key: 'theme-init',
          innerHTML: '(function(){try{var t=localStorage.getItem("theme")||"dark";document.documentElement.setAttribute("data-theme",t);}catch(e){}})();',
          tagPosition: 'head',
          tagPriority: 0
        }
      ]
    }
  }
})
