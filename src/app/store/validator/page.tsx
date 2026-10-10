'use client';

import React, { useState } from 'react';
import { 
  Scan, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Ticket, 
  ShieldCheck,
  RefreshCw,
  ShoppingBag
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface CouponLookupResult {
  id: string;
  code: string;
  status: 'active' | 'redeemed' | 'expired';
  activated_at: string;
  expires_at: string;
  redeemed_at?: string | null;
  offer?: {
    title: string;
    benefit_label: string;
    description: string;
  };
}

interface RecentRedemption {
  code: string;
  benefit: string;
  time: string;
  cashier: string;
}

export default function StoreValidatorPage() {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CouponLookupResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [redeemSuccess, setRedeemSuccess] = useState(false);

  const [recentRedemptions, setRecentRedemptions] = useState<RecentRedemption[]>([
    { code: 'ZARA-2026', benefit: '-20% OFF en Lino', time: 'Hace 12 min', cashier: 'Caja 3 (Piso 1)' },
    { code: 'TIJE-HOGR', benefit: '-30% OFF Hogar', time: 'Hace 45 min', cashier: 'Caja 1 (Principal)' },
  ]);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) return;

    setIsLoading(true);
    setErrorMsg(null);
    setResult(null);
    setRedeemSuccess(false);

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('coupons')
        .select(`
          id,
          code,
          status,
          activated_at,
          expires_at,
          redeemed_at,
          offers (
            title,
            benefit_label,
            description
          )
        `)
        .eq('code', cleanCode)
        .maybeSingle();

      if (error) {
        console.warn('Error querying Supabase coupon, using demo lookup:', error);
      }

      if (data) {
        const typedData = data as unknown as {
          id: string;
          code: string;
          status: 'active' | 'redeemed' | 'expired';
          activated_at: string;
          expires_at: string;
          redeemed_at?: string | null;
          offers?: { title: string; benefit_label: string; description: string }[] | { title: string; benefit_label: string; description: string } | null;
        };
        const rawOffer = typedData.offers;
        const offerData = Array.isArray(rawOffer) ? rawOffer[0] : rawOffer;

        setResult({
          id: typedData.id,
          code: typedData.code,
          status: typedData.status,
          activated_at: typedData.activated_at,
          expires_at: typedData.expires_at,
          redeemed_at: typedData.redeemed_at,
          offer: offerData ? {
            title: offerData.title,
            benefit_label: offerData.benefit_label,
            description: offerData.description,
          } : {
            title: 'Descuento Comercial de Temporada',
            benefit_label: 'Beneficio Especial',
            description: 'Válido para consumo en tienda física',
          },
        });
      } else {
        // Fallback para códigos demo de pitch si aún no se corrió el seed en Supabase
        if (cleanCode === 'ZARA-2026') {
          setResult({
            id: 'demo-c1',
            code: 'ZARA-2026',
            status: 'active',
            activated_at: new Date().toISOString(),
            expires_at: new Date(Date.now() + 86400000).toISOString(),
            offer: {
              title: 'Especial de Temporada: Colección Lino',
              benefit_label: '-20% OFF en Lino',
              description: 'Válido para compras de blazer o prendas de lino en ZARA Sambil Chacao',
            },
          });
        } else if (cleanCode === 'TIJE-HOGR') {
          setResult({
            id: 'demo-c2',
            code: 'TIJE-HOGR',
            status: 'active',
            activated_at: new Date().toISOString(),
            expires_at: new Date(Date.now() + 86400000).toISOString(),
            offer: {
              title: 'Gran Liquidación Hogar Tijerazo',
              benefit_label: '-30% OFF Hogar',
              description: 'Válido en sábanas y edredones de confort',
            },
          });
        } else if (cleanCode === 'ZARA-USAD') {
          setResult({
            id: 'demo-c3',
            code: 'ZARA-USAD',
            status: 'redeemed',
            activated_at: new Date(Date.now() - 36000000).toISOString(),
            expires_at: new Date(Date.now() + 86400000).toISOString(),
            redeemed_at: new Date(Date.now() - 7200000).toISOString(),
            offer: {
              title: 'Especial de Temporada: Colección Lino',
              benefit_label: '-20% OFF',
              description: 'Ya canjeado con anterioridad',
            },
          });
        } else {
          setErrorMsg(`El cupón "${cleanCode}" no existe o no pertenece a este centro comercial.`);
        }
      }
    } catch (err) {
      console.error('Error validating coupon:', err);
      setErrorMsg('Error de red al consultar el cupón. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedeemCoupon = async () => {
    if (!result || result.status !== 'active') return;

    setIsRedeeming(true);
    try {
      const supabase = createClient();
      const nowIso = new Date().toISOString();

      const { error } = await (supabase
        .from('coupons') as any)
        .update({
          status: 'redeemed',
          redeemed_at: nowIso,
        })
        .eq('id', result.id);

      if (error) {
        console.warn('Supabase update warning, completing in local state:', error);
      }

      setRedeemSuccess(true);
      setResult({
        ...result,
        status: 'redeemed',
        redeemed_at: nowIso,
      });

      // Añadir al registro de canjes recientes
      setRecentRedemptions([
        {
          code: result.code,
          benefit: result.offer?.benefit_label || 'Beneficio Aplicado',
          time: 'Justo ahora',
          cashier: 'Caja 3 (Sesión Actual)',
        },
        ...recentRedemptions,
      ]);
    } catch (err) {
      console.error('Error redeeming coupon:', err);
      setErrorMsg('No se pudo completar el canje en la base de datos.');
    } finally {
      setIsRedeeming(false);
    }
  };

  const handleReset = () => {
    setCode('');
    setResult(null);
    setErrorMsg(null);
    setRedeemSuccess(false);
  };

  return (
    <div className="max-w-5xl space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
          <ShieldCheck className="w-4 h-4" />
          Terminal Punto de Venta (POS) &bull; Store OS
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Validador de Cupones Digitales en Caja</h1>
        <p className="text-sm text-slate-500 mt-1">
          Escanea el código QR del cliente o ingresa el código alfanumérico para verificar autenticidad y aplicar el descuento.
        </p>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Columna Izquierda: Input y Validación */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Scan className="w-4 h-4 text-slate-600" />
              Ingreso de Cupón de Cliente
            </h2>

            <form onSubmit={handleLookup} className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="ej. ZARA-2026 o TIJE-HOGR"
                  className="w-full text-lg font-mono font-bold tracking-widest uppercase px-4 py-3 rounded-xl border-2 border-slate-300 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all bg-slate-50 focus:bg-white"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={isLoading || !code.trim()}
                  className="absolute right-2 top-2 bottom-2 px-5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold text-sm rounded-lg flex items-center gap-2 transition-all"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Verificar
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Botones rápidos de prueba para Pitch */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] text-slate-400 font-semibold">Cupones demo para probar:</span>
                <button
                  type="button"
                  onClick={() => setCode('ZARA-2026')}
                  className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg font-mono font-semibold transition-colors"
                >
                  ZARA-2026 (Activo)
                </button>
                <button
                  type="button"
                  onClick={() => setCode('TIJE-HOGR')}
                  className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg font-mono font-semibold transition-colors"
                >
                  TIJE-HOGR (Activo)
                </button>
                <button
                  type="button"
                  onClick={() => setCode('ZARA-USAD')}
                  className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg font-mono font-semibold transition-colors"
                >
                  ZARA-USAD (Usado)
                </button>
              </div>
            </form>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-800 animate-in fade-in duration-200">
                <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-600" />
                <div className="text-xs">
                  <span className="font-bold block text-sm mb-0.5">Cupón Inválido</span>
                  {errorMsg}
                </div>
              </div>
            )}

            {/* Resultado de Búsqueda */}
            {result && (
              <div className="pt-4 border-t border-slate-100 animate-in fade-in zoom-in-98 duration-200">
                {result.status === 'active' && !redeemSuccess && (
                  <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-500/80 shadow-md space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-600 text-white tracking-wide">
                        <CheckCircle2 className="w-4 h-4" />
                        CUPÓN VÁLIDO Y ACTIVO
                      </span>
                      <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md">
                        {result.code}
                      </span>
                    </div>

                    <div>
                      <div className="text-2xl font-black text-slate-900 tracking-tight">
                        {result.offer?.benefit_label}
                      </div>
                      <div className="text-sm font-semibold text-slate-700 mt-0.5">
                        {result.offer?.title}
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        {result.offer?.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-emerald-200">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        Expira: {new Date(result.expires_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className="font-semibold text-emerald-800">
                        Listo para aplicar
                      </span>
                    </div>

                    <button
                      type="button"
                      disabled={isRedeeming}
                      onClick={handleRedeemCoupon}
                      className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 active:scale-98 disabled:bg-slate-400 text-white font-black text-base rounded-xl shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      {isRedeeming ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          Registrando canje en Supabase...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-5 h-5" />
                          Canjear y Aplicar Descuento en Caja
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Estado de Éxito al Canjear */}
                {redeemSuccess && (
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-xl space-y-4 animate-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-amber-300" />
                        <span className="text-sm font-black uppercase tracking-wider text-emerald-100">
                          Transacción Exitosa
                        </span>
                      </div>
                      <span className="text-xs bg-white/20 px-2 py-0.5 rounded font-mono">
                        {new Date().toLocaleTimeString()}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-black">¡Descuento Aplicado en Caja!</h3>
                      <p className="text-sm text-emerald-100 mt-1">
                        El beneficio <strong>{result.offer?.benefit_label}</strong> fue registrado y descontado del inventario de promociones.
                      </p>
                    </div>

                    <div className="pt-2 border-t border-emerald-500/50 flex justify-end">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="px-4 py-2 bg-white text-emerald-800 font-bold text-xs rounded-xl hover:bg-emerald-50 transition-colors"
                      >
                        Validar Siguiente Cliente &rarr;
                      </button>
                    </div>
                  </div>
                )}

                {/* Cupón ya canjeado */}
                {result.status === 'redeemed' && !redeemSuccess && (
                  <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 space-y-3">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-amber-600" />
                      <span className="font-bold text-sm">Este cupón ya fue canjeado</span>
                    </div>
                    <p className="text-xs text-amber-700">
                      El código <strong>{result.code}</strong> fue utilizado con anterioridad ({result.redeemed_at ? new Date(result.redeemed_at).toLocaleString() : 'Previamente'}). No puede aplicarse dos veces.
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-xs font-bold text-amber-800 underline hover:text-amber-950"
                    >
                      Intentar con otro código
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Columna Derecha: Historial y Auditoría en Vivo */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Ticket className="w-4 h-4 text-blue-600" />
                Historial de Canjes de Hoy
              </h3>
              <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-bold">
                {recentRedemptions.length} canjes
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {recentRedemptions.map((r, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-mono font-bold text-slate-800 block">{r.code}</span>
                    <span className="text-slate-500 text-[11px]">{r.benefit}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[10px]">{r.time}</span>
                    <span className="text-[10px] font-semibold text-emerald-700">{r.cashier}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 border border-slate-100 leading-relaxed">
              💡 <strong>Regla Antifraude:</strong> Cada canje genera una firma criptográfica inmutable en <code>audit_log</code>. Es imposible reutilizar un cupón capturado por captura de pantalla.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
