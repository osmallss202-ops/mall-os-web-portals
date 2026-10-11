import React from 'react';
import { 
  Calendar, 
  MapPin, 
  Plus, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  Building2,
  Tag
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

interface EventItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  location_zone: string;
  starts_at: string;
  ends_at: string;
  status: string;
  store_name?: string;
}

export default async function MallEventsAgendaPage() {
  let isLive = false;
  let events: EventItem[] = [];

  const fallbackEvents: EventItem[] = [
    {
      id: 'e0000000-0000-0000-0000-000000000001',
      title: 'Fashion Week Sambil Chacao 2026',
      description: 'Desfile exclusivo de nuevas colecciones de primavera-verano con las principales marcas de moda del país.',
      image_url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
      location_zone: 'Plaza Central · Nivel Autopista',
      starts_at: 'Próximo Jueves · 17:00',
      ends_at: 'Domingo · 21:00',
      status: 'published',
      store_name: 'ZARA & Aliados'
    },
    {
      id: 'e0000000-0000-0000-0000-000000000002',
      title: 'Samsung Galaxy AI Tour',
      description: 'Zona interactiva para experimentar traducción en vivo, edición fotográfica generativa y cámaras nocturnas.',
      image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02560?w=800&q=80',
      location_zone: 'Plaza La Fuente · Nivel Autopista',
      starts_at: 'Activo Hoy · 11:00',
      ends_at: '30 Octubre · 20:00',
      status: 'published',
      store_name: 'Samsung Store'
    },
    {
      id: 'e0000000-0000-0000-0000-000000000003',
      title: 'Búsqueda del Tesoro Infantil (Modo Niño)',
      description: 'Circuito guiado para niños con acertijos por el mall, sellos digitales y premios de cortesía en plaza.',
      image_url: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&q=80',
      location_zone: 'Plaza Jardín y Nivel Diversión',
      starts_at: 'Sábados y Domingos',
      ends_at: 'Permanente',
      status: 'published',
      store_name: 'Institucional Sambil'
    }
  ];

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('events')
      .select('id, title, description, image_url, location_zone, starts_at, ends_at, status, stores(name)')
      .order('starts_at', { ascending: false });

    if (!error && data && data.length > 0) {
      isLive = true;
      events = data.map((d: any) => ({
        id: d.id,
        title: d.title,
        description: d.description || '',
        image_url: d.image_url || 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800',
        location_zone: d.location_zone || 'Áreas Comunes',
        starts_at: new Date(d.starts_at).toLocaleDateString('es-VE', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        ends_at: new Date(d.ends_at).toLocaleDateString('es-VE', { month: 'short', day: 'numeric' }),
        status: d.status || 'published',
        store_name: d.stores?.name || 'Evento Institucional'
      }));
    } else {
      events = fallbackEvents;
    }
  } catch (err) {
    events = fallbackEvents;
  }

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Agenda y Eventos del Mall
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
            Programación de experiencias de plaza, activaciones de marca y circuito familiar en Sambil Chacao.
          </p>
        </div>

        <button 
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Programar Nuevo Evento</span>
        </button>
      </div>

      {/* Grid de Eventos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Imagen del Evento */}
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-emerald-700 shadow-sm">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Publicado
                  </span>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-900/80 backdrop-blur-md text-white">
                    {event.store_name}
                  </span>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6">
                <h3 className="font-extrabold text-lg text-slate-900 mb-2 leading-tight">
                  {event.title}
                </h3>
                <p className="text-xs text-slate-500 mb-4 line-clamp-3 leading-relaxed">
                  {event.description}
                </p>

                <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                    <span className="font-semibold text-slate-700">{event.location_zone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Inicia: {event.starts_at}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Visible en App Shopper</span>
              <button className="font-bold text-indigo-600 hover:text-indigo-800">
                Editar Programación
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
