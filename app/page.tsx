"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved === "true") setDark(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", dark.toString());
  }, [dark]);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 fade-in">

        {/* Navbar con branding */}
        <header className="flex justify-between items-center px-8 py-6">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="logo" className="h-8" />
            <span className="text-2xl font-bold">PromptAnalyticAI</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/analizar"
              className="px-4 py-2 rounded-lg bg-brand text-white hover:bg-brand-dark hover-soft"
            >
              Ir al Dashboard
            </Link>

            <button
              onClick={() => setDark(!dark)}
              className="px-4 py-2 rounded-lg bg-neutral-dark text-white dark:bg-neutral-light dark:text-black hover-soft"
            >
              {dark ? "Modo claro" : "Modo oscuro"}
            </button>
          </div>
        </header>

        {/* Hero */}
        <section className="text-center px-8 py-20 fade-in">
          <h2 className="text-5xl font-extrabold mb-6">
            Analiza texto con IA de forma profesional
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
            Obtén resúmenes, análisis profundos, dashboards visuales, clasificación inteligente y contenido listo para PDF. Todo en un solo lugar.
          </p>

          <Link
            href="/dashboard/analizar"
            className="px-8 py-4 rounded-xl bg-brand text-white text-lg font-semibold hover:bg-brand-dark hover-soft"
          >
            Comenzar ahora
          </Link>
        </section>

        {/* Beneficios */}
        <section className="px-8 py-16 bg-white dark:bg-gray-800">
          <h3 className="text-3xl font-bold text-center mb-12">
            ¿Qué puedes hacer con PromptAnalyticAI?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-xl shadow card-anim hover-soft">
              <h4 className="text-xl font-bold mb-3">Resúmenes inteligentes</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Obtén resúmenes claros, precisos y adaptados al idioma del texto.
              </p>
            </div>

            <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-xl shadow card-anim hover-soft">
              <h4 className="text-xl font-bold mb-3">Análisis profundo</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Recibe análisis profesionales con hallazgos, recomendaciones y conclusiones.
              </p>
            </div>

            <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-xl shadow card-anim hover-soft">
              <h4 className="text-xl font-bold mb-3">Dashboard visual</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Visualiza cada sección del análisis en tarjetas separadas, estilo SaaS premium.
              </p>
            </div>
          </div>
        </section>

        {/* Características */}
        <section className="px-8 py-16">
          <h3 className="text-3xl font-bold text-center mb-12">
            Características avanzadas
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <div className="card-anim hover-soft">
              <h4 className="text-xl font-bold mb-3">Clasificación automática</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Identifica si el texto es emocional, técnico, legal, financiero, etc.
              </p>
            </div>

            <div className="card-anim hover-soft">
              <h4 className="text-xl font-bold mb-3">Contenido para PDF</h4>
