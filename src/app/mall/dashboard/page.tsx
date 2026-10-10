import React from 'react';
import { Users, Search, MapPin, Tag, CheckCircle2, TrendingUp, Trophy, Accessibility, Baby, ArrowUpRight } from 'lucide-react';

export default function MallExecutiveDashboardPage() {
  const topStores = [
    { rank: 1, name: 'ZARA', level: 'Nivel Libertador', interactions: 842, conversions: '18.4%' },
    { rank: 2, name: 'Tijerazo', level: 'Nivel Acuario', interactions: 615, conversions: '14.2%' },
    { rank: 3, name: 'Mango Bajito', level: 'Nivel Autopista', interactions: 520, conversions: '12.8%' },
    { rank: 4, name: 'Nike Store', level: 'Nivel Diversión', interactions: 490, conversions: '11.5%' },
    { rank: 5, name: 'Miniso', level: 'Nivel Acuario', interactions: 430, conversions: '16.0%' },
    { rank: 6, name: 'Samsung Store', level: 'Nivel Libertador', interactions: 380, conversions: '9.2%' },
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
    { query: 'Blazers y sacos de dama', count: 184, trend: '+35%' },
    { query: 'Sandalias de fiesta plataforma', count: 142, trend: '+28%' },
    { query: 'Cafetería con wifi', count: 129, trend: '+14%' },
    { query: 'Sushi y comida japonesa', count: 110, trend: '+20%' },
    { query: 'Cine películas cartelera', count: 98, trend: '+8%' },
    { query: 'Ropa deportiva y gimnasio', count: 85, trend: '+12%' },
  ];

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header Ejecutivo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Consola Ejecutiva · Sambil Chacao</h1>
          <p className="text-sm text-slate-500 mt-1">
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
              <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                ROI Medible
              </span>
            </div>

            <div className="space-y-4 my-6">
              {funnelSteps.map((step, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>{step.label}</span>
                    <span className="font-mono text-slate-900">{step.count} ({step.percentage})</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div className={`${step.bg} h-full rounded-full transition-all duration-500 ${step.width}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-100">
            💡 <strong>Argumento de Venta:</strong> Demuestra a las marcas aliadas que Mall OS no es solo un mapa, sino una máquina que canaliza más de 1.000 clientes listos para pagar a las cajas registradoras.
          </div>
        </div>

        {/* KPI 1: Top 10 Tiendas por Interacción */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-extrabold text-lg text-slate-900">Top 10 Tiendas Más Demandadas</h2>
              <p className="text-xs text-slate-500">Ranking en base a clics de vitrina, rutas trazadas y canjes</p>
            </div>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Tienda</th>
                  <th className="py-2.5 px-3">Nivel</th>
                  <th className="py-2.5 px-3 text-right">Interacciones</th>
                  <th className="py-2.5 px-3 text-right">Conv.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {topStores.map((s) => (
                  <tr key={s.rank} className="hover:bg-slate-50/60">
                    <td className="py-2.5 px-3 font-bold text-slate-400">{s.rank}</td>
                    <td className="py-2.5 px-3 font-bold text-slate-900">{s.name}</td>
                    <td className="py-2.5 px-3 text-slate-500">{s.level}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-indigo-700">{s.interactions}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-emerald-600">{s.conversions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Grid Inferior: Búsquedas Calientes & Impacto de Experiencias */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* KPI 3: Búsquedas Calientes del Conserje */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-extrabold text-lg text-slate-900">Búsquedas Calientes del Conserje IA</h2>
              <p className="text-xs text-slate-500">Qué productos y categorías buscan los compradores en tiempo real</p>
            </div>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full">
              Inteligencia Comercial
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {hotQueries.map((q, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Search className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-semibold text-slate-900">{q.query}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-slate-600 font-bold">{q.count} consultas</span>
                  <span className="text-xs font-bold text-emerald-600">{q.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* KPI 4: Impacto de Experiencias (Modo Niño & Accesible) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="font-extrabold text-lg text-slate-900 mb-1">Impacto de Experiencias y RSE</h2>
            <p className="text-xs text-slate-500 mb-6">Métricas de adopción de inclusión y fidelización familiar</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/60">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-xs mb-2">
                  <Baby className="w-4 h-4" />
                  Modo Niño (Búsqueda del Tesoro)
                </div>
                <div className="text-2xl font-black text-amber-900 mb-1">480</div>
                <p className="text-xs text-amber-700">Misiones completadas en plazas del mall</p>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/60">
                <div className="flex items-center gap-2 text-blue-800 font-bold text-xs mb-2">
                  <Accessibility className="w-4 h-4" />
                  Modo Accesible Inclusivo
                </div>
                <div className="text-2xl font-black text-blue-900 mb-1">162</div>
                <p className="text-xs text-blue-700">Rutas trazadas exclusivamente por ascensores y rampas</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Certificación de Hospitalidad Digital Mall OS</span>
            <span className="font-bold text-indigo-600">Cumplimiento 100%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
