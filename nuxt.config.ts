// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss'],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: {
        lang: 'fr',
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
