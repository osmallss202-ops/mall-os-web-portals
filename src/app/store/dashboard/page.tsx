import React from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Users, 
  Tag, 
  CheckCircle2, 
  Plus, 
  ArrowRight,
  Radio,
  Database
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export default async function StoreDashboardPage() {
  let isLive = false;
  let productCount = 4;
  let activeProducts: { id: string; name: string; price: string; sizes: string[]; colors: string[]; status: string }[] = [];

  try {
    const supabase = createClient();
    const { data: prods, count } = await supabase
      .from('products')
      .select('id, name, price_min, price_max, sizes_json, colors_json, is_active', { count: 'exact' })
      .limit(5);

    if (prods && prods.length > 0) {
      isLive = true;
      const typedProds = prods as unknown as {
        id: string;
        name: string;
        price_min: number;
        price_max: number;
        sizes_json: unknown;
        colors_json: unknown;
        is_active: boolean;
      }[];
      productCount = count ?? typedProds.length;
      activeProducts = typedProds.map((p) => {
        const rawSizes = p.sizes_json as unknown as string[];
        const rawColors = p.colors_json as unknown as { name: string }[] | string[];
        const colorNames = Array.isArray(rawColors) 
          ? rawColors.map((c) => (typeof c === 'string' ? c : c.name))
          : ['Estándar'];

        return {
          id: p.id,
          name: p.name,
          price: `$${Number(p.price_min).toFixed(2)} - $${Number(p.price_max).toFixed(2)}`,
          sizes: Array.isArray(rawSizes) ? rawSizes : ['S', 'M', 'L'],
          colors: colorNames,
          status: p.is_active ? 'Activo' : 'Pausado',
        };
      });
    }
  } catch (err) {
    console.warn('Usando catálogo demo en store dashboard:', err);
    isLive = false;
  }

  // Si no hay productos en la DB aún, usar los datos demo
  if (activeProducts.length === 0) {
    activeProducts = [
      { id: '1', name: 'Blazer Entallado Lino', price: '$45.00 - $55.00', sizes: ['S', 'M', 'L'], colors: ['Beige Arena', 'Negro Clásico'], status: 'Activo' },
      { id: '2', name: 'Vestido Midi Plisado', price: '$48.00 - $60.00', sizes: ['XS', 'S', 'M'], colors: ['Verde Esmeralda', 'Terracota Floral'], status: 'Activo' },
      { id: '3', name: 'Camisa Oxford Popelín', price: '$32.00 - $38.00', sizes: ['S', 'M', 'L', 'XL'], colors: ['Blanco Puro', 'Celeste Cielo'], status: 'Activo' },
    ];
  }

  const stats = [
    { label: 'Productos en Vitrina', value: `${productCount}`, change: '+8 este mes', icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Visitas al Perfil (App)', value: '1,840', change: '+24% sem.', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Cupones Activados', value: '128', change: '85% canjeados', icon: Tag, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Canjes Validados en Caja', value: '109', change: 'Efectividad 85%', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Panel de Gestión · ZARA</h1>
            {isLive ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
                Datos en Vivo (Supabase Cloud)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                <Database className="w-3 h-3 text-amber-600" />
                Modo Demo · Datos Referenciales
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500">
            Gestión de catálogo de alta conversión, tallas, colores y ofertas para la App Móvil.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/store/validator"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-3.5 py-2.5 rounded-xl shadow-sm transition-all"
          >
            Terminal Validador POS
          </Link>
          <Link
            href="/store/catalog"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            Añadir Producto
          </Link>
        </div>
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
              {activeProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-6 font-semibold text-slate-900">{p.name}</td>
                  <td className="py-3.5 px-6 text-slate-700 font-mono text-xs font-bold">{p.price}</td>
                  <td className="py-3.5 px-6">
                    <div className="flex gap-1 flex-wrap">
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
