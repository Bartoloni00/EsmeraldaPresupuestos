/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          emerald: {
            light: '#50C878',   // Verde Esmeralda // Botones principales y enlaces
            dark: '#2E7D4F',    // Verde Oscuro // Hover o estados activos
          },
          cream: '#FFF9F0',     // Crema suave // Fondo general
          dark: '#333333',      // Gris oscuro // Textos
          gold: '#D4AF37',      // Dorado suave // Detalles o íconos destacados
        },
      },
    },
    plugins: [],
  }