import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Users, Tag, CheckCircle2, TrendingUp, Plus, ArrowUpRight, ArrowRight } from 'lucide-react';

export default function StoreDashboardPage() {
  const stats = [
    { label: 'Productos en Vitrina', value: '42', change: '+8 este mes', icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Visitas al Perfil (App)', value: '1,840', change: '+24% sem.', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Cupones Activados', value: '128', change: '85% canjeados', icon: Tag, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Canjes Validados en Caja', value: '109', change: 'Efectividad 85%', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const recentProducts = [
    { id: '1', name: 'Blazer Entallado Lino', price: '$45.00 - $55.00', sizes: ['S', 'M', 'L'], colors: ['Beige', 'Negro'], status: 'Activo' },
    { id: '2', name: 'Pantalón Wide Leg Denim', price: '$35.00 - $42.00', sizes: ['36', '38', '40'], colors: ['Azul Claro'], status: 'Activo' },
    { id: '3', name: 'Vestido Midi Plisado', price: '$48.00 - $60.00', sizes: ['XS', 'S', 'M'], colors: ['Esmeralda', 'Floral'], status: 'Activo' },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Panel de Gestión · ZARA</h1>
          <p className="text-sm text-slate-500 mt-1">
            Gestión de catálogo de alta conversión, tallas, colores y ofertas para la App Móvil.
          </p>
        </div>

        <Link
          href="/store/catalog"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          Añadir Producto
        </Link>
      </div>

      {/* Tarjetas de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{s.label}</span>
                <div className={`w-8 h-8 rounded-lg ${s.bg} ${s.color} flex items-center justify-center`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900 mb-1">{s.value}</div>
              <span className="text-xs text-emerald-600 font-semibold">{s.change}</span>
            </div>
          );
        })}
      </div>

      {/* Productos Destacados */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-base text-slate-900">Productos en Catálogo con Rangos y Variantes</h2>
            <p className="text-xs text-slate-500">Diseñados para elevar la decisión de compra sobre el 75% antes de llegar al local.</p>
          </div>
          <Link href="/store/catalog" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
            Gestionar todos <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/80 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="py-3 px-6">Producto</th>
                <th className="py-3 px-6">Rango Referencial</th>
                <th className="py-3 px-6">Tallas Disponibles</th>
                <th className="py-3 px-6">Colores</th>
                <th className="py-3 px-6">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-6 font-semibold text-slate-900">{p.name}</td>
                  <td className="py-3.5 px-6 text-slate-700 font-mono text-xs font-bold">{p.price}</td>
                  <td className="py-3.5 px-6">
                    <div className="flex gap-1">
                      {p.sizes.map((s) => (
                        <span key={s} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-semibold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-6 text-slate-600 text-xs">{p.colors.join(', ')}</td>
                  <td className="py-3.5 px-6">
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
