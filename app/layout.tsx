<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
  rel="stylesheet"
/>

import "./globals.css";

export const metadata = {
  title: "PromptAnalyticAI",
  description: "Análisis profesional de texto con IA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
