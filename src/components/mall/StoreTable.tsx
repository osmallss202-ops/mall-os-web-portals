'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Store, 
  Search, 
  MapPin, 
  Phone, 
  Mail, 
  Tag, 
  CheckCircle2, 
  ExternalLink,
  Filter,
  UserPlus,
  SlidersHorizontal
} from 'lucide-react';
import InviteManagerModal from './InviteManagerModal';

export interface StoreRow {
  id: string;
  name: string;
  slug: string;
  description: string;
  floor: number;
  unit: string;
  phone: string;
  status: string;
  can_publish_offers: boolean;
  category_name?: string;
}

interface StoreTableProps {
  stores: StoreRow[];
}

export default function StoreTable({ stores }: StoreTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFloor, setSelectedFloor] = useState<number | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Modal state
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState<string | undefined>(undefined);

  // Categorías únicas
  const categories = useMemo(() => {
    const set = new Set<string>();
    stores.forEach((s) => {
      if (s.category_name) set.add(s.category_name);
    });
    return Array.from(set);
  }, [stores]);

  // Filtrado reactivo en tiempo real
  const filteredStores = useMemo(() => {
    return stores.filter((store) => {
      const matchesSearch = 
        store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFloor = selectedFloor === 'all' || store.floor === selectedFloor;
      const matchesCategory = selectedCategory === 'all' || store.category_name === selectedCategory;

      return matchesSearch && matchesFloor && matchesCategory;
    });
  }, [stores, searchTerm, selectedFloor, selectedCategory]);

  const handleOpenInvite = (storeId?: string) => {
    setSelectedStoreId(storeId);
    setIsInviteOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Barra de Filtros Interactiva */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Input de Búsqueda */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por tienda, código o local (ej. ZARA, AC-10)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Botón de Invitar Gerente Principal */}
          <button
            onClick={() => handleOpenInvite()}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all shrink-0"
          >
            <UserPlus className="w-4 h-4" />
            <span>Invitar Gerente de Tienda</span>
          </button>
        </div>

        {/* Filtros por Categoría y Piso */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Categoría:
          </span>

          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todas ({stores.length})
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}

          <div className="h-4 w-px bg-slate-200 mx-2 hidden sm:block" />

          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
            Nivel:
          </span>
          {[
            { id: 'all', label: 'Todos' },
            { id: 1, label: 'L1 Autopista' },
            { id: 2, label: 'L2 Acuario' },
            { id: 3, label: 'L3 Libertador' },
            { id: 4, label: 'L4 Diversión' },
          ].map((fl) => (
            <button
              key={fl.id}
              onClick={() => setSelectedFloor(fl.id as any)}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                selectedFloor === fl.id
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
              }`}
            >
              {fl.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Tiendas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStores.map((store) => (
          <div
            key={store.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-bold bg-indigo-50 text-indigo-700 mb-1.5">
                    {store.category_name}
                  </span>
                  <h3 className="font-extrabold text-lg text-slate-900 leading-tight">
                    {store.name}
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3" />
                  Activo
                </span>
              </div>

              <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                {store.description}
              </p>

              <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-semibold text-slate-700">{store.unit}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{store.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>
                    Cupones flash:{' '}
                    <strong className="text-emerald-600">
                      {store.can_publish_offers ? 'Habilitado' : 'Bloqueado'}
                    </strong>
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              <Link
                href="/store/catalog"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800"
              >
                <span>Catálogo D-086</span>
                <ExternalLink className="w-3 h-3" />
              </Link>

              <button
                onClick={() => handleOpenInvite(store.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold transition-colors"
              >
                <Mail className="w-3 h-3" />
                <span>Invitar Gerente</span>
              </button>
            </div>
          </div>
        ))}

        {filteredStores.length === 0 && (
          <div className="col-span-full p-12 text-center bg-white rounded-2xl border border-dashed border-slate-300">
            <Store className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h4 className="font-bold text-slate-700 text-sm">No se encontraron tiendas</h4>
            <p className="text-xs text-slate-500 mt-1">
              Prueba cambiando los términos de búsqueda o los filtros de categoría/piso.
            </p>
          </div>
        )}
      </div>

      {/* Modal Interactivo de Invitación */}
      <InviteManagerModal
        stores={stores.map((s) => ({ id: s.id, name: s.name, unit: s.unit }))}
        initialStoreId={selectedStoreId}
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
      />
    </div>
  );
}
