/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Rutas donde TailwindCSS buscará clases para eliminar las no utilizadas (purga)
    "./index.html", // Archivo HTML principal
    "./src/**/*.{js,ts,jsx,tsx}", // Archivos JS, TS, JSX, TSX dentro de la carpeta src
    "./public/**/*.html", // Archivos HTML en la carpeta public (si los tienes)
  ],
  theme: {
    extend: {
      // Personalización de colores
      colors: {
        customRed: '#FF5733', // Color personalizado (puedes cambiarlo)
        customBlue: '#1E3A8A', // Otro color personalizado
        customYellow: '#FFC107', // Ejemplo de otro color (amarillo)
      },
      // Personalización de la fuente
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Fuente personalizada para el texto
        serif: ['Georgia', 'serif'], // Ejemplo de fuente serif
        mono: ['Courier New', 'monospace'], // Ejemplo de fuente monoespaciada
      },
      // Personalización del espaciado
      spacing: {
        '128': '32rem', // Un valor de espaciado personalizado
        '144': '36rem', // Otro valor de espaciado
        '160': '40rem', // Otro valor de espaciado extra grande
      },
      // Personalización de breakpoints (pantallas grandes, etc.)
      screens: {
        'xl2': '1600px', // Un breakpoint más grande para pantallas grandes
        'xxl': '1800px', // Otro breakpoint extra grande
        'xxxl': '2000px', // Agregado un breakpoint aún más grande
      },
      // Personalización del tamaño de la tipografía
      fontSize: {
        'tiny': '.625rem', // Agrega un tamaño de fuente extra pequeño
        'huge': '4rem', // Un tamaño de fuente más grande (puedes usarlo para títulos)
      },
      // Personalización de las sombras
      boxShadow: {
        'custom': '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)', // Sombra personalizada
      },
    },
  },
  plugins: [
    // Plugins de Tailwind
    require('@tailwindcss/forms'),      // Mejora la apariencia de formularios
    require('@tailwindcss/typography'), // Mejora la tipografía (para textos largos)
    require('@tailwindcss/aspect-ratio'), // Para manejar relaciones de aspecto en los elementos
    require('@tailwindcss/line-clamp'),  // Para manejar recortes de líneas (útil para textos largos)
    require('@tailwindcss/container-queries'), // Para consultas de contenedores (útil para diseño responsivo)
  ],
  corePlugins: {
    // Habilitar o deshabilitar plugins básicos de Tailwind
    preflight: true, // Estilo global predeterminado de Tailwind
    container: true, // Activar el contenedor fluido
    float: false, // Desactivar los estilos de flotado (si no los necesitas)
    objectFit: false, // Desactivar el estilo object-fit si no lo usas
  },
  darkMode: 'class', // Para usar el modo oscuro basado en una clase (en lugar de 'media')
  // Configuración futura (por ejemplo, enableDarkMode, etc.)
  future: {
    // Activar características de TailwindCSS que aún no están habilitadas por defecto
    purgeLayersByDefault: true, // Purga automáticamente las capas que no se usan
  },
}
