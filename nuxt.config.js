
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  env: {
    baseURL: (process.env.NODE_ENV === 'production' ? 'https//quran.urusan.id' : 'http://localhost:3000')
  },
  head: {
    title: 'Al Qur\'an Interaktif' || process.env.npm_package_name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { hid: 'og:title', name: 'og:title', content: 'Al Qur\'an Interaktif' },
      { hid: 'og:description', name: 'og:description', content: process.env.npm_package_description || '' },
      { hid: 'og:image', name: 'og:image', content: 'https://quran.urusan.id/icon.png' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    ['@nuxtjs/google-analytics', {
      id: process.env.GA_ID || ''
    }]
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    loaders: {
      vue: {
        transformAssetUrls: {
          audio: 'src'
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      // if (ctx.dev && ctx.isClient) {
      config.module.rules.push({
        enforce : 'pre',
        test    : /\.(js|vue)$/,
        loader  : 'eslint-loader',
        exclude : /(node_modules)/,
        options : {
            fix : true
        }
      }),
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      }),
      config.node = {
        fs: "empty"
    };
      // }
    }
  },
  generate: {
    routes: Array(114).fill().map((_, i) => `/tadarus/${i+1}`) // generate /tadarus/1 to /tadarus/114
  }
}
