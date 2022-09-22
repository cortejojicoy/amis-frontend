export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "UPLB AMIS",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: "/auth/login", method: "post" },
          logout: { url: "/auth/logout", method: "post" },
          user: { url: "/auth/user", method: "get", propertyName: false },
        },
      },
    },
    redirect: {
      login: "/auth/login",
      home: "/",
    },
  },

  router: {
    // mode: 'hash',
    middleware: ["auth"],
    fullPathRedirect: false,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [{ src: "~assets/drawer.css", lang: "css" }, { src: "~assets/toggleButton.css", lang: "css" }],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/auth',
    '~/plugins/vs-pagination',
    '~/plugins/vue-select',
    '~/plugins/vue-final-modal.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    "@nuxtjs/dotenv",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/auth-next"],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.API_BASE_URL,
    credentials: true
  },

  env: {
    apiBaseUrl: process.env.API_BASE_URL
  },

  publicRuntimeConfig: {
    APP_MAINTENANCE: process.env.APP_MAINTENANCE,
    loginAdvisory: process.env.LOGIN_ADVISORY,
    COI_ENABLED: process.env.COI_ENABLED,
    PREROG_ENABLED: process.env.PREROG_ENABLED
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
  },
};
