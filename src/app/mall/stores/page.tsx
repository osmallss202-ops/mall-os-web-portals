import React from 'react';
import { createClient } from '@/lib/supabase/server';
import StoreTable, { StoreRow } from '@/components/mall/StoreTable';

export default async function MallStoresDirectoryPage() {
  let isLive = false;
  let stores: StoreRow[] = [];

  const fallbackStores: StoreRow[] = [
    {
      id: 'b0000000-0000-0000-0000-000000000001',
      name: 'ZARA',
      slug: 'zara',
      description: 'Moda internacional masculina, femenina y calzado de última colección.',
      floor: 1,
      unit: 'Local AC-10 · Nivel Autopista',
      phone: '+582129590001',
      status: 'active',
      can_publish_offers: true,
      category_name: 'Moda y Calzado'
    },
    {
      id: 'b0000000-0000-0000-0000-000000000002',
      name: 'Bershka',
      slug: 'bershka',
      description: 'Tendencias juveniles, streetwear y accesorios urbanos.',
      floor: 2,
      unit: 'Local AQ-20 · Nivel Acuario',
      phone: '+582129590002',
      status: 'active',
      can_publish_offers: true,
      category_name: 'Moda y Calzado'
    },
    {
      id: 'b0000000-0000-0000-0000-000000000003',
      name: 'Tiendas Tijerazo',
      slug: 'tijerazo',
      description: 'Gran tienda por departamentos: moda familiar, ropa de cama, hogar y electrodomésticos.',
      floor: 1,
      unit: 'Local AC-01 · Nivel Autopista',
      phone: '+582129590003',
      status: 'active',
      can_publish_offers: true,
      category_name: 'Departamentos y Hogar'
    },
    {
      id: 'b0000000-0000-0000-0000-000000000004',
      name: 'Samsung Store',
      slug: 'samsung',
      description: 'Tienda oficial Samsung: Galaxy Series, tablets, smartwatches y ecosistema inteligente.',
      floor: 2,
      unit: 'Local AQ-05 · Nivel Acuario',
      phone: '+582129590004',
      status: 'active',
      can_publish_offers: true,
      category_name: 'Tecnología y Móviles'
    },
    {
      id: 'b0000000-0000-0000-0000-000000000005',
      name: 'McCafé & Postres',
      slug: 'mccafe',
      description: 'Café de grano recién tostado, frappés, repostería y helados artesanales.',
      floor: 1,
      unit: 'Plaza La Fuente · Nivel Autopista',
      phone: '+582129590005',
      status: 'active',
      can_publish_offers: true,
      category_name: 'Gastronomía y Café'
    }
  ];

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('stores')
      .select('id, name, slug, description, floor, unit, phone, status, can_publish_offers, categories(name)')
      .order('name');

    if (!error && data && data.length > 0) {
      isLive = true;
      stores = data.map((d: any) => ({
        id: d.id,
        name: d.name,
        slug: d.slug,
        description: d.description || '',
        floor: d.floor || 1,
        unit: d.unit || 'Sin asignar',
        phone: d.phone || 'N/A',
        status: d.status || 'active',
        can_publish_offers: d.can_publish_offers ?? true,
        category_name: d.categories?.name || 'General'
      }));
    } else {
      stores = fallbackStores;
    }
  } catch (err) {
    stores = fallbackStores;
  }

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header Ejecutivo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Directorio Comercial de Tiendas
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
            Gestión integral de los 500+ locales, asignación de inquilinos e invitaciones oficiales a Store OS.
          </p>
        </div>
      </div>

      {/* Tabla Interactiva de Tiendas con Filtros y Modal */}
      <StoreTable stores={stores} />
    </div>
  );
}
