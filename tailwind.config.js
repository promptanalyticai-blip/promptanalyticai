module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   extend: {
  colors: {
    brand: {
      DEFAULT: "#3B82F6",   // Azul principal
      dark: "#1E40AF",      // Azul profundo
      light: "#93C5FD",     // Azul suave
    },
    accent: {
      DEFAULT: "#8B5CF6",   // Morado premium
      dark: "#5B21B6",
      light: "#C4B5FD",
    },
    neutral: {
      DEFAULT: "#64748B",   // Gris profesional
      dark: "#1E293B",
      light: "#CBD5E1",
    },
  },
}
