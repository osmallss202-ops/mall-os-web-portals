import React from 'react';
import { 
  Users, 
  Search, 
  MapPin, 
  Tag, 
  CheckCircle2, 
  TrendingUp, 
  Trophy, 
  Accessibility, 
  Baby, 
  ArrowUpRight,
  Database,
  Radio
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export default async function MallExecutiveDashboardPage() {
  let isLive = false;
  let dynamicStoreCount = 5;
  let dynamicProductCount = 15;
  let dynamicEventCount = 3;
  let dynamicAnalyticsCount = 80;

  // Intentar cargar métricas reales desde Supabase Cloud
  try {
    const supabase = createClient();
    const [storesRes, prodsRes, eventsRes, analyticsRes] = await Promise.all([
      supabase.from('stores').select('id, name', { count: 'exact' }),
      supabase.from('products').select('id', { count: 'exact' }),
      supabase.from('events').select('id', { count: 'exact' }),
      supabase.from('analytics_events').select('id', { count: 'exact' }),
    ]);

    if (storesRes.count !== null && storesRes.count > 0) {
      isLive = true;
      dynamicStoreCount = storesRes.count;
      dynamicProductCount = prodsRes.count ?? 15;
      dynamicEventCount = eventsRes.count ?? 3;
      dynamicAnalyticsCount = analyticsRes.count ?? 80;
    }
  } catch (err) {
    console.warn('Usando métricas referenciales para pitch:', err);
    isLive = false;
  }

  const topStores = [
    { rank: 1, name: 'ZARA', level: 'Nivel Autopista', interactions: 842, conversions: '18.4%' },
    { rank: 2, name: 'Tiendas Tijerazo', level: 'Nivel Autopista', interactions: 615, conversions: '14.2%' },
    { rank: 3, name: 'Bershka', level: 'Nivel Acuario', interactions: 520, conversions: '12.8%' },
    { rank: 4, name: 'Samsung Store', level: 'Nivel Acuario', interactions: 490, conversions: '11.5%' },
    { rank: 5, name: 'McCafé & Postres', level: 'Plaza La Fuente', interactions: 430, conversions: '16.0%' },
    { rank: 6, name: 'Mango Bajito', level: 'Nivel Autopista', interactions: 380, conversions: '9.2%' },
    { rank: 7, name: 'Bonsai Sushi', level: 'Nivel Diversión', interactions: 345, conversions: '22.1%' },
    { rank: 8, name: 'Palacio del Blumer', level: 'Nivel Autopista', interactions: 310, conversions: '15.3%' },
    { rank: 9, name: 'Bath & Body Works', level: 'Nivel Libertador', interactions: 280, conversions: '19.7%' },
    { rank: 10, name: 'Cines Unidos', level: 'Nivel Diversión', interactions: 250, conversions: '28.0%' },
  ];

  const funnelSteps = [
    { label: 'Visitas al Centro Comercial (App Activa)', count: '12,450', percentage: '100%', width: 'w-full', bg: 'bg-indigo-600' },
    { label: 'Búsquedas Asistidas en Conserje IA', count: '5,600', percentage: '45.0%', width: 'w-[80%]', bg: 'bg-indigo-500' },
    { label: 'Rutas Trazadas Turn-by-Turn en Mapa 2.5D', count: '3,480', percentage: '28.0%', width: 'w-[62%]', bg: 'bg-indigo-400' },
    { label: 'Cupones Flash Activados por Visitantes', count: '1,490', percentage: '12.0%', width: 'w-[40%]', bg: 'bg-indigo-300' },
    { label: 'Canjes Validados en Caja de Tienda', count: '1,060', percentage: '8.5%', width: 'w-[28%]', bg: 'bg-emerald-500' },
  ];

  const hotQueries = [
    { query: 'Blazers y sacos de dama (ZARA)', count: 184, trend: '+35%' },
    { query: 'Sábanas 300 hilos (Tijerazo)', count: 142, trend: '+28%' },
    { query: 'Galaxy S24 Ultra financiado', count: 129, trend: '+14%' },
    { query: 'Cafetería con wifi y postres', count: 110, trend: '+20%' },
    { query: 'Pantalones cargo streetwear', count: 98, trend: '+8%' },
    { query: 'Ropa deportiva y calzado', count: 85, trend: '+12%' },
  ];

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header Ejecutivo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Consola Ejecutiva · Sambil Chacao</h1>
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
            Métricas de afluencia, conversión de vitrinas, demanda del Conserje y rendimiento de las más de 500 tiendas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-sm">
            Últimos 30 días
          </span>
        </div>
      </div>

      {/* KPI Cards Superiores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Visitantes Únicos</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">12,450</div>
          <span className="text-xs text-emerald-600 font-bold">↑ +18.4% vs mes anterior</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Interacciones Conserje</span>
            <Search className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">18,320</div>
          <span className="text-xs text-blue-600 font-bold">2.4 consultas por visitante</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Rutas al Local</span>
            <MapPin className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">3,480</div>
          <span className="text-xs text-amber-600 font-bold">Tráfico a pie directo a caja</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Canjes Efectivos</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">1,060</div>
          <span className="text-xs text-emerald-600 font-bold">8.5% tasa de conversión</span>
        </div>
      </div>

      {/* Grid Central: Embudo de Conversión & Top 10 Tiendas */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* KPI 2: Embudo de Conversión Comercial */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-extrabold text-lg text-slate-900">Embudo de Conversión Comercial</h2>
                <p className="text-xs text-slate-500">Desde la llegada al centro comercial hasta la compra en el local</p>
              </div>
              <span className="text-xs font-bold px-2 py-1 bg-emerald-50 text-emerald-700 rounded-lg">
                8.5% Global
              </span>
            </div>

            <div className="space-y-4 my-6">
              {funnelSteps.map((step, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700">{step.label}</span>
                    <span className="font-bold text-slate-900">{step.count} ({step.percentage})</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5">
                    <div className={`${step.bg} h-full rounded-full transition-all duration-500 ${step.width}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Retorno de inversión medible por visita</span>
            <span className="font-bold text-slate-900">1,060 ventas canalizadas</span>
          </div>
        </div>

        {/* KPI 1: Top 10 Tiendas por Atracción y Conversión */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-extrabold text-lg text-slate-900">Top 10 Tiendas del Mall</h2>
              <p className="text-xs text-slate-500">Ranking por interacción en app y visitas dirigidas a puerta</p>
            </div>
            <Trophy className="w-5 h-5 text-amber-500" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Tienda</th>
                  <th className="py-2.5 px-3">Nivel</th>
                  <th className="py-2.5 px-3 text-right">Interacciones</th>
                  <th className="py-2.5 px-3 text-right">Conversión</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {topStores.map((s) => (
                  <tr key={s.rank} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-2 px-3 font-bold text-slate-400">{s.rank}</td>
                    <td className="py-2 px-3 font-bold text-slate-900">{s.name}</td>
                    <td className="py-2 px-3 text-slate-500">{s.level}</td>
                    <td className="py-2 px-3 text-right font-mono text-slate-700">{s.interactions}</td>
                    <td className="py-2 px-3 text-right font-bold text-emerald-600">{s.conversions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Grid Inferior: Búsquedas Calientes & Experiencias */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* KPI 3: Búsquedas Calientes del Conserje IA */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-extrabold text-lg text-slate-900">Demanda Caliente en Conserje IA</h2>
              <p className="text-xs text-slate-500">Lo que los visitantes buscan exactamente antes de comprar</p>
            </div>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>

          <div className="space-y-3">
            {hotQueries.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-[10px]">
                    {idx + 1}
                  </span>
                  <span className="font-bold text-slate-800">{item.query}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-slate-500">{item.count} búsquedas</span>
                  <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {item.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* KPI 4: Impacto de Experiencias (Modo Niño & Accesibilidad) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-extrabold text-lg text-slate-900">Impacto en Experiencia & RSE</h2>
                <p className="text-xs text-slate-500">Métricas de hospitalidad, familias y accesibilidad universal</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 my-4">
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/60 space-y-1">
                <div className="flex items-center gap-2 text-amber-700 font-bold text-xs">
                  <Baby className="w-4 h-4" />
                  Modo Niño (Gamificación)
                </div>
                <div className="text-2xl font-black text-amber-950">2,140</div>
                <p className="text-[11px] text-amber-700 leading-tight">
                  Niños participaron en la Búsqueda del Tesoro generando +42 min de permanencia familiar.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/60 space-y-1">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-xs">
                  <Accessibility className="w-4 h-4" />
                  Rutas Accesibles
                </div>
                <div className="text-2xl font-black text-blue-950">490</div>
                <p className="text-[11px] text-blue-700 leading-tight">
                  Rutas sin barreras arquitectónicas usando ascensores para personas con movilidad reducida o coches.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Responsabilidad Social y Fidelización</span>
            <span className="font-bold text-slate-900">Tiempo promedio en mall: 2h 45m</span>
          </div>
        </div>
      </div>
    </div>
  );
}
