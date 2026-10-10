import React from 'react';
import Link from 'next/link';
import { Building2, Store, Smartphone, ShieldCheck, ArrowRight, BarChart3, Users, Sparkles } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header institucional */}
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 to-indigo-900 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              M
            </div>
            <div>
              <span className="font-bold text-slate-900 tracking-tight text-lg">MALL OS</span>
              <span className="text-xs text-blue-600 block font-semibold tracking-wider">PLATAFORMA B2B</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 rounded-lg transition-colors"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/store/dashboard"
              className="text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition-all"
            >
              Portal Gerente
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          Suite Empresarial de Gestión Retail para Consorcios
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl leading-tight">
          El Sistema Operativo para los Grandes <span className="text-blue-600">Centros Comerciales</span>
        </h1>

        <p className="mt-6 text-lg text-slate-600 max-w-2xl leading-relaxed">
          Conectamos la experiencia física de los visitantes con consolas de escritorio de alta eficiencia para más de 1.000 locales comerciales y juntas directivas.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/mall/dashboard"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all hover:scale-105"
          >
            <Building2 className="w-4 h-4" />
            Consola Mall Executive
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/store/dashboard"
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all hover:scale-105"
          >
            <Store className="w-4 h-4" />
            Consola Store OS (Locatarios)
          </Link>
        </div>
      </section>

      {/* Módulos Principales */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-6">
                <Store className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Store OS para Locatarios</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                Catálogo de productos con rangos referenciales, tallas y colores que llevan la certeza de compra sobre el 75%. Gestión de ofertas y validador atómico de canjes QR.
              </p>
              <Link href="/store/dashboard" className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:underline">
                Abrir portal de tienda →
              </Link>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-6">
                <Building2 className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Mall Executive OS</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                Directorio comercial de más de 1.000 locales, moderación de promociones, agenda de eventos de plaza y avisos proactivos con la voz humana del Conserje.
              </p>
              <Link href="/mall/dashboard" className="text-indigo-600 font-bold text-sm flex items-center gap-1 hover:underline">
                Ver consola de gerencia →
              </Link>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6">
                <Smartphone className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">App Móvil de Visitantes</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                Navegación 2.5D GPU, asistente conversacional de compras, Modo Niño interactivo y onboarding ultra-rápido con Google OAuth 1-tap para adquisición a escala récord.
              </p>
              <span className="text-emerald-700 font-bold text-sm flex items-center gap-1">
                ✓ APK Android compilado y activo
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 border-t border-slate-100 text-center text-xs text-slate-400">
        © 2026 Mall OS Platform. Todos los derechos reservados. Diseñado para consorcios comerciales líderes.
      </footer>
    </div>
  );
}
