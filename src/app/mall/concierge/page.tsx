'use client';

import React, { useState } from 'react';
import { 
  Bell, 
  Send, 
  Radio, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Compass,
  Baby
} from 'lucide-react';

interface BroadcastMessage {
  id: string;
  title: string;
  body: string;
  audience: string;
  sent_at: string;
  reach: number;
}

export default function MallConciergeBroadcasterPage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [audience, setAudience] = useState('all');
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSending, setIsSending] = useState(false);

  const [history, setHistory] = useState<BroadcastMessage[]>([
    {
      id: '1',
      title: '¡Desfile Fashion Week en Plaza Central!',
      body: 'Inicia en 15 minutos en Nivel Autopista. Asientos preferenciales para usuarios de la app.',
      audience: 'Todos los Visitantes en el Mall',
      sent_at: 'Hace 45 minutos',
      reach: 1240
    },
    {
      id: '2',
      title: 'Zona Infantil: Pinta-Caritas en Plaza Jardín',
      body: 'Actividad gratuita de bienvenida para los más pequeños hasta las 18:00.',
      audience: 'Usuarios en Modo Niño',
      sent_at: 'Hace 2 horas',
      reach: 380
    },
    {
      id: '3',
      title: 'Flash Sale: 2x1 en McCafé Plaza La Fuente',
      body: 'Activa tu cupón en la app y presenta en caja durante la próxima hora.',
      audience: 'Cercanos a Plaza La Fuente',
      sent_at: 'Hace 4 horas',
      reach: 650
    }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setStatusMsg({ type: 'error', text: 'Por favor completa el título y el cuerpo del mensaje.' });
      return;
    }

    setIsSending(true);
    setStatusMsg(null);

    setTimeout(() => {
      const audienceLabel = 
        audience === 'all' ? 'Todos los Visitantes en el Mall' :
        audience === 'kids' ? 'Usuarios en Modo Niño' :
        audience === 'fashion' ? 'Interesados en Moda & ZARA' :
        'Cercanos a Plaza Central (L1)';

      const newMsg: BroadcastMessage = {
        id: Date.now().toString(),
        title,
        body,
        audience: audienceLabel,
        sent_at: 'Justo ahora',
        reach: audience === 'all' ? 1420 : 450
      };

      setHistory([newMsg, ...history]);
      setTitle('');
      setBody('');
      setIsSending(false);
      setStatusMsg({ type: 'success', text: `¡Aviso emitido con éxito! Alcance instantáneo estimado: ${newMsg.reach} visitantes.` });
    }, 600);
  };

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Emisor de Avisos del Conserje IA
          </h1>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
            <Radio className="w-3 h-3 text-indigo-600 animate-pulse" />
            Canal de Transmisión Activo
          </span>
        </div>
        <p className="text-sm text-slate-500 mt-1">
          Envía notificaciones push y recomendaciones dinámicas del Conserje IA a los shoppers dentro de Sambil Chacao.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulario de Emisión */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h2 className="font-extrabold text-base text-slate-900">Nuevo Aviso al Visitante</h2>
          </div>

          {statusMsg && (
            <div
              className={`p-3 rounded-xl mb-4 text-xs font-semibold flex items-center gap-2 ${
                statusMsg.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {statusMsg.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              )}
              <span>{statusMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleSend} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Segmento de Audiencia
              </label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="all">🌐 Todos los visitantes activos en el Mall</option>
                <option value="kids">🧸 Familias con Modo Niño activado</option>
                <option value="fashion">👗 Visitantes con interés en Moda</option>
                <option value="l1">📍 Visitantes en Nivel Autopista (L1)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Título del Aviso
              </label>
              <input
                type="text"
                placeholder="ej. ¡Desfile en vivo en Plaza Central!"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Mensaje del Conserje IA
              </label>
              <textarea
                rows={3}
                placeholder="Redacta la recomendación que el avatar del Conserje mostrará a los visitantes..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSending ? 'Emitiendo por WebSocket...' : 'Transmitir Aviso Ahora'}</span>
            </button>
          </form>
        </div>

        {/* Historial de Transmisiones */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-extrabold text-base text-slate-900">Avisos Emitidos Recientes</h2>
            <span className="text-xs text-slate-500 font-medium">Últimas 24 horas</span>
          </div>

          {history.map((msg) => (
            <div
              key={msg.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {msg.audience}
                  </span>
                  <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {msg.sent_at}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <Users className="w-3 h-3" />
                  <span>{msg.reach} alcanzados</span>
                </div>
              </div>

              <h3 className="font-extrabold text-sm text-slate-900 mb-1">{msg.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{msg.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
