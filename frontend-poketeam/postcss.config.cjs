// postcss.config.cjs
module.exports = {
  plugins: [
    // Usamos el nuevo plugin de PostCSS para TailwindCSS
    require('@tailwindcss/postcss'),  // Asegúrate de tener este plugin instalado

    // También instalamos y configuramos Autoprefixer para la compatibilidad con navegadores
    require('autoprefixer'),
  ],
}
