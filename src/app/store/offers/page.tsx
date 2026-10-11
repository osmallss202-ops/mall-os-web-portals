import React from 'react';
import { 
  Tag, 
  Plus, 
  Calendar, 
  Ticket, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  Percent
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

interface OfferItem {
  id: string;
  title: string;
  description: string;
  benefit_label: string;
  starts_at: string;
  ends_at: string;
  total_coupons: number;
  activated_count: number;
  redeemed_count: number;
  status: string;
}

export default async function StoreOffersPage() {
  let isLive = false;
  let offers: OfferItem[] = [];

  const fallbackOffers: OfferItem[] = [
    {
      id: 'd1000000-0000-0000-0000-000000000010',
      title: 'Especial de Temporada: Colección Lino',
      description: 'Obtén 20% de descuento directo en cualquier blazer o prenda de lino seleccionada.',
      benefit_label: '-20% OFF en Lino',
      starts_at: 'Activo',
      ends_at: 'Hasta 25 Octubre',
      total_coupons: 100,
      activated_count: 14,
      redeemed_count: 5,
      status: 'active'
    }
  ];

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('offers')
      .select('*')
      .eq('store_id', 'b0000000-0000-0000-0000-000000000001') // ZARA
      .order('starts_at', { ascending: false });

    if (!error && data && data.length > 0) {
      isLive = true;
      offers = data.map((d: any) => ({
        id: d.id,
        title: d.title,
        description: d.description || '',
        benefit_label: d.benefit_label || 'Descuento',
        starts_at: new Date(d.starts_at).toLocaleDateString('es-VE', { month: 'short', day: 'numeric' }),
        ends_at: new Date(d.ends_at).toLocaleDateString('es-VE', { month: 'short', day: 'numeric' }),
        total_coupons: d.total_coupons || 100,
        activated_count: d.activated_count || 0,
        redeemed_count: d.redeemed_count || 0,
        status: d.status || 'active'
      }));
    } else {
      offers = fallbackOffers;
    }
  } catch (err) {
    offers = fallbackOffers;
  }

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Ofertas Flash y Cupones
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
            Crea promociones con límite de canje para incentivar visitas presenciales a ZARA Sambil Chacao.
          </p>
        </div>

        <button 
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Crear Nueva Oferta Flash</span>
        </button>
      </div>

      {/* Grid de Ofertas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-lg text-xs font-black bg-blue-50 text-blue-700 border border-blue-200">
                    {offer.benefit_label}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3" />
                  Activa en App
                </span>
              </div>

              <h3 className="font-extrabold text-lg text-slate-900 mb-2 leading-tight">
                {offer.title}
              </h3>
              <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                {offer.description}
              </p>

              {/* Métricas de Conversión de la Oferta */}
              <div className="grid grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <div>
                  <span className="block text-xs text-slate-400 font-semibold">Cupo Total</span>
                  <span className="text-base font-black text-slate-900">{offer.total_coupons}</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400 font-semibold">Activados</span>
                  <span className="text-base font-black text-blue-600">{offer.activated_count}</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400 font-semibold">Canjeados POS</span>
                  <span className="text-base font-black text-emerald-600">{offer.redeemed_count}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Vigencia: {offer.ends_at}</span>
              </div>
              <span className="font-bold text-blue-600">
                Canjeable vía Validador QR
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
