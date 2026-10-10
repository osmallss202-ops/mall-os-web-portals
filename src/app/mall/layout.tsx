'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, LayoutDashboard, Store, Calendar, Trophy, Bell, ShieldCheck, LogOut, ChevronRight } from 'lucide-react';

export default function MallLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { href: '/mall/dashboard', label: 'Dashboard Ejecutivo', icon: LayoutDashboard },
    { href: '/mall/stores', label: 'Directorio de Tiendas', icon: Store },
    { href: '/mall/events', label: 'Agenda de Eventos', icon: Calendar },
    { href: '/mall/contests', label: 'Concursos y Sorteos', icon: Trophy },
    { href: '/mall/concierge', label: 'Avisos del Conserje', icon: Bell },
    { href: '/mall/audit', label: 'Bitácora de Auditoría', icon: ShieldCheck },
  ];

  return (
    <div className="flex-1 flex min-h-screen bg-slate-50">
      {/* Sidebar Desktop Mall Executive */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col p-4 text-white shadow-xl">
        {/* Cabecera del Centro Comercial */}
        <div className="p-3 bg-slate-800/80 rounded-xl mb-6 border border-slate-700/60">
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="w-4 h-4 text-indigo-400" />
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
              MALL EXECUTIVE OS
            </span>
          </div>
          <h2 className="font-extrabold text-base leading-tight">SAMBIL CHACAO</h2>
          <p className="text-xs text-slate-400">Grupo Sambil · 4 Niveles</p>
        </div>

        {/* Navegación */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer Sidebar */}
        <div className="pt-4 border-t border-slate-800">
          <Link
            href="/login"
            className="flex items-center gap-2.5 text-xs font-semibold text-slate-400 hover:text-red-400 p-2 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </Link>
        </div>
      </aside>

      {/* Contenido Principal */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-16 bg-white border-b border-slate-200/80 px-8 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Consola Gerencial</span>
            <span>/</span>
            <span className="font-semibold text-slate-900">
              {navItems.find((n) => n.href === pathname)?.label || 'Panel'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
              Consorcio Nacional · Sambil
            </span>
          </div>
        </header>

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
