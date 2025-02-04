// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01', // Projenizin uyumluluk tarihi
  devtools: { enabled: true }, // Geliştirme araçları aktif
  css: [
    'bootstrap/dist/css/bootstrap.min.css', // Bootstrap CSS
    'bootstrap-icons/font/bootstrap-icons.css', // Bootstrap Icons için CSS
    '~/styles/top-navbar.scss', // Özel stil dosyası
  ],
  app: {
    head: {
      meta: [
        {
          charset: 'utf-8', // UTF-8 karakter seti
        },
        {
          name: 'viewport', // Responsive tasarım için gerekli
          content: 'width=device-width, initial-scale=1',
        },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Jost:wght@400&display=swap', // Jost fontu
        },
      ],
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
          defer: true, // Performans için JavaScript yüklemesini erteler
        },
      ],
    },
  },
  modules: [
    '@nuxt/devtools', // Nuxt geliştirme araçları
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'storeToRefs'],
      },
    ],
  ],
  imports: {
    dirs: ['stores'],
  },
  typescript: {
    strict: true
  }
});
