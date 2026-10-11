import React from 'react';
import { 
  Trophy, 
  Gift, 
  Calendar, 
  CheckCircle2, 
  Plus, 
  Users, 
  Sparkles,
  Store
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

interface ContestItem {
  id: string;
  title: string;
  description: string;
  prize: string;
  terms: string;
  starts_at: string;
  ends_at: string;
  status: string;
  store_name?: string;
}

export default async function MallContestsPage() {
  let isLive = false;
  let contests: ContestItem[] = [];

  const fallbackContests: ContestItem[] = [
    {
      id: 'f0000000-0000-0000-0000-000000000001',
      title: 'Gran Sorteo Verano ZARA Sambil',
      description: 'Registra tu visita en la app y participa por un certificado de compra para renovar tu armario completo.',
      prize: 'Certificado de $200 en ZARA Sambil Chacao',
      terms: 'Válido para compras en tienda física. Anuncio del ganador vía Conserje IA el 30 del mes.',
      starts_at: 'Activo',
      ends_at: 'Hasta 30 Octubre',
      status: 'active',
      store_name: 'ZARA'
    },
    {
      id: 'f0000000-0000-0000-0000-000000000002',
      title: 'Desafío Samsung Galaxy Play',
      description: 'Demuestra tu habilidad en el circuito de fotografía nocturna en Plaza La Fuente y gana los nuevos audífonos.',
      prize: 'Unos Galaxy Buds FE Pro inalámbricos',
      terms: 'Abierto a todos los visitantes con la app instalada.',
      starts_at: 'Activo',
      ends_at: 'Hasta 25 Octubre',
      status: 'active',
      store_name: 'Samsung Store'
    }
  ];

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('contests')
      .select('id, title, description, prize, terms, starts_at, ends_at, status, stores(name)')
      .order('starts_at', { ascending: false });

    if (!error && data && data.length > 0) {
      isLive = true;
      contests = data.map((d: any) => ({
        id: d.id,
        title: d.title,
        description: d.description || '',
        prize: d.prize,
        terms: d.terms || '',
        starts_at: new Date(d.starts_at).toLocaleDateString('es-VE', { month: 'short', day: 'numeric' }),
        ends_at: new Date(d.ends_at).toLocaleDateString('es-VE', { month: 'short', day: 'numeric' }),
        status: d.status || 'active',
        store_name: d.stores?.name || 'Sambil Oficial'
      }));
    } else {
      contests = fallbackContests;
    }
  } catch (err) {
    contests = fallbackContests;
  }

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Concursos y Sorteos Oficiales
            </h1>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                isLive
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-amber-100 text-amber-800 border border-amber-300'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              {isLive ? 'Datos en Vivo (Supabase Cloud)' : 'Modo Demo · Datos Referenciales'}
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Activaciones de lealtad, premios patrocinados y sorteos gamificados para visitantes de Sambil Chacao.
          </p>
        </div>

        <button 
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Crear Sorteo de Mall</span>
        </button>
      </div>

      {/* Grid de Concursos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contests.map((contest) => (
          <div
            key={contest.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-200">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Patrocinado por {contest.store_name}
                    </span>
                    <h3 className="font-extrabold text-lg text-slate-900 leading-tight">
                      {contest.title}
                    </h3>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3" />
                  Activo
                </span>
              </div>

              <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200/60 my-4">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
                  <Gift className="w-4 h-4 text-amber-600" />
                  <span>Premio Mayor:</span>
                </div>
                <p className="font-extrabold text-sm text-slate-900">{contest.prize}</p>
              </div>

              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                {contest.description}
              </p>

              <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-600 space-y-1">
                <p className="font-semibold text-slate-700">Términos y condiciones:</p>
                <p className="text-slate-500">{contest.terms}</p>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Vigencia: {contest.ends_at}</span>
              </div>
              <button className="font-bold text-indigo-600 hover:text-indigo-800">
                Ver Participantes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
