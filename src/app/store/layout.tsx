'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Store, LayoutDashboard, ShoppingBag, Tag, QrCode, LogOut, ChevronRight } from 'lucide-react';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { href: '/store/dashboard', label: 'Resumen Tienda', icon: LayoutDashboard },
    { href: '/store/catalog', label: 'Catálogo de Productos', icon: ShoppingBag },
    { href: '/store/offers', label: 'Ofertas y Cupones', icon: Tag },
    { href: '/store/validator', label: 'Validador de Canjes', icon: QrCode },
  ];

  return (
    <div className="flex-1 flex min-h-screen bg-slate-50">
      {/* Sidebar Desktop de Tienda */}
      <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col p-4 shadow-sm">
        {/* Cabecera del Local */}
        <div className="p-3 bg-slate-900 rounded-xl text-white mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Store className="w-4 h-4 text-blue-400" />
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
              STORE OS · LOCAL
            </span>
          </div>
          <h2 className="font-bold text-base leading-tight">ZARA</h2>
          <p className="text-xs text-slate-400">Nivel Libertador · Sambil Chacao</p>
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
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
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
        <div className="pt-4 border-t border-slate-100">
          <Link
            href="/login"
            className="flex items-center gap-2.5 text-xs font-semibold text-slate-500 hover:text-red-600 p-2 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </Link>
        </div>
      </aside>

      {/* Contenido Principal */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-16 bg-white border-b border-slate-200/80 px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Store OS</span>
            <span>/</span>
            <span className="font-semibold text-slate-900">
              {navItems.find((n) => n.href === pathname)?.label || 'Panel'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              ● Tienda Abierta
            </span>
            <span className="text-xs text-slate-500">Horario: 10:00 - 21:00</span>
          </div>
        </header>

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
