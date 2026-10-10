'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldAlert, Store, Building2, Sparkles } from 'lucide-react';

export function PitchModeSwitcher() {
  const pathname = usePathname();
  const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

  if (!isDemo) return null;

  return (
    <aside aria-label="Control de Demostración" className="w-full bg-slate-900 border-b border-slate-800 text-white z-50 sticky top-0 shadow-md">
      {/* Banner de advertencia roja obligatorio */}
      <div className="bg-rose-600 text-white text-xs font-semibold px-4 py-1 flex items-center justify-center gap-2 text-center uppercase tracking-wider">
        <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0" />
        <span>MODO DEMO ACTIVO · DATOS FICTICIOS PARA PITCH COMERCIAL · NO USAR EN PRODUCCIÓN</span>
      </div>

      {/* Selector rápido de roles ejecutivos */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-300 font-medium">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline">DEMO ROLE SWITCHER (1-Click):</span>
        </div>

        <nav aria-label="Roles de demostración" className="flex items-center gap-2 flex-wrap">
          <Link
            href="/store/dashboard"
            className={`px-3 py-1 rounded-md font-medium transition-all flex items-center gap-1.5 ${
              pathname.startsWith('/store')
                ? 'bg-blue-600 text-white shadow'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Gerente ZARA (Store OS)</span>
          </Link>

          <Link
            href="/mall/dashboard"
            className={`px-3 py-1 rounded-md font-medium transition-all flex items-center gap-1.5 ${
              pathname.startsWith('/mall')
                ? 'bg-indigo-600 text-white shadow'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Gerencia Sambil Chacao (Mall Executive)</span>
          </Link>

          <Link
            href="/"
            className="px-2.5 py-1 rounded-md text-slate-400 hover:text-white transition-colors"
          >
            Ver Landing
          </Link>
        </nav>
      </div>
    </aside>
  );
}
