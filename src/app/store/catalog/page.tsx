'use client';

import React, { useState } from 'react';
import { Plus, ShoppingBag, Tag, Trash2, Edit2, CheckCircle2, AlertCircle, X, Sparkles } from 'lucide-react';

interface ProductItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  price_min: number;
  price_max: number;
  sizes: string[];
  colors: string[];
  is_active: boolean;
}

export default function StoreCatalogPage() {
  const [products, setProducts] = useState<ProductItem[]>([
    {
      id: 'prod-1',
      name: 'Blazer Entallado Lino',
      slug: 'blazer-entallado-lino',
      description: 'Blazer de corte estructurado en mezcla de lino transpirable. Ideal para media estación.',
      price_min: 45,
      price_max: 55,
      sizes: ['S', 'M', 'L'],
      colors: ['Beige Arena', 'Negro'],
      is_active: true,
    },
    {
      id: 'prod-2',
      name: 'Pantalón Wide Leg Denim',
      slug: 'pantalon-wide-leg-denim',
      description: 'Pantalón vaquero de tiro alto con pernera ancha. Tejido rígido 100% algodón.',
      price_min: 35,
      price_max: 42,
      sizes: ['36', '38', '40', '42'],
      colors: ['Azul Claro', 'Azul Marino'],
      is_active: true,
    },
    {
      id: 'prod-3',
      name: 'Vestido Midi Plisado',
      slug: 'vestido-midi-plisado',
      description: 'Vestido con falda plisada soleil y cuello fluido. Cinturón a tono.',
      price_min: 48,
      price_max: 60,
      sizes: ['XS', 'S', 'M'],
      colors: ['Verde Esmeralda', 'Floral'],
      is_active: true,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceMin, setPriceMin] = useState<number>(30);
  const [priceMax, setPriceMax] = useState<number>(45);
  const [sizeInput, setSizeInput] = useState('');
  const [sizes, setSizes] = useState<string[]>(['S', 'M', 'L']);
  const [colorInput, setColorInput] = useState('');
  const [colors, setColors] = useState<string[]>(['Negro', 'Blanco']);

  const handleAddSize = () => {
    if (sizeInput.trim() && !sizes.includes(sizeInput.trim().toUpperCase())) {
      setSizes([...sizes, sizeInput.trim().toUpperCase()]);
      setSizeInput('');
    }
  };

  const handleRemoveSize = (s: string) => {
    setSizes(sizes.filter((item) => item !== s));
  };

  const handleAddColor = () => {
    if (colorInput.trim() && !colors.includes(colorInput.trim())) {
      setColors([...colors, colorInput.trim()]);
      setColorInput('');
    }
  };

  const handleRemoveColor = (c: string) => {
    setColors(colors.filter((item) => item !== c));
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newProd: ProductItem = {
      id: `prod-${Date.now()}`,
      name: name.trim(),
      slug: name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: description.trim(),
      price_min: Number(priceMin),
      price_max: Number(priceMax),
      sizes,
      colors,
      is_active: true,
    };

    setProducts([newProd, ...products]);
    setIsModalOpen(false);
    setName('');
    setDescription('');
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Catálogo de Productos de Alta Conversión</h1>
          <p className="text-sm text-slate-500 mt-1">
            Permite que el comprador llegue a tu tienda física con la decisión de compra sobre el 75% positiva.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-md transition-all"
        >
          <Plus className="w-4 h-4" />
          Añadir Nuevo Producto
        </button>
      </div>

      {/* Banner de Estrategia */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-5 rounded-2xl flex items-start gap-4 shadow-sm">
        <Sparkles className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
        <div className="text-xs leading-relaxed">
          <span className="font-bold text-sm block mb-1">Estrategia de Rangos Referenciales (Venezuela):</span>
          Al publicar rangos como <code className="bg-white/20 px-1.5 py-0.5 rounded font-mono font-bold">$35 - $45</code> con tallas y colores, evitas desajustes de precios diarios con tu caja registradora, mientras el <strong>Conserje IA</strong> puede responder exactamente lo que el visitante busca y guiarlo a tu puerta.
        </div>
      </div>

      {/* Tabla de Productos */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/80 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="py-3 px-6">Producto y Descripción</th>
                <th className="py-3 px-6">Rango de Precio</th>
                <th className="py-3 px-6">Tallas Disponibles</th>
                <th className="py-3 px-6">Colores</th>
                <th className="py-3 px-6">Estado</th>
                <th className="py-3 px-6 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900">{p.name}</div>
                    <div className="text-xs text-slate-500 max-w-xs truncate">{p.description}</div>
                  </td>
                  <td className="py-4 px-6 font-mono text-sm font-bold text-slate-800">
                    ${p.price_min.toFixed(2)} - ${p.price_max.toFixed(2)}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {p.sizes.map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {p.colors.map((c) => (
                        <span key={c} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-semibold">
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                      Activo en App
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => setProducts(products.filter((item) => item.id !== p.id))}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                      title="Eliminar producto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal / Dialog de Creación de Producto */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="font-bold text-lg text-slate-900">Añadir Producto a la Vitrina Digital</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Nombre del Artículo
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ej. Camisa Oxford Manga Larga"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Descripción Corta
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detalles de tela, fit o temporada para ayudar al comprador..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
              </div>

              {/* Rangos de precio */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Precio Mínimo ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    required
                    value={priceMin}
                    onChange={(e) => setPriceMin(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Precio Máximo ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    required
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm font-mono font-bold"
                  />
                </div>
              </div>

              {/* Tallas */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Tallas Disponibles
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={sizeInput}
                    onChange={(e) => setSizeInput(e.target.value)}
                    placeholder="ej. S, M, L o 38, 40"
                    className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddSize}
                    className="px-3 py-1.5 bg-slate-800 text-white text-xs font-bold rounded-xl hover:bg-slate-700"
                  >
                    Añadir
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {sizes.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-xs font-bold flex items-center gap-1">
                      {s}
                      <button type="button" onClick={() => handleRemoveSize(s)} className="text-blue-500 hover:text-blue-800">
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Colores */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Colores Disponibles
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={colorInput}
                    onChange={(e) => setColorInput(e.target.value)}
                    placeholder="ej. Beige, Negro, Blanco"
                    className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddColor}
                    className="px-3 py-1.5 bg-slate-800 text-white text-xs font-bold rounded-xl hover:bg-slate-700"
                  >
                    Añadir
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {colors.map((c) => (
                    <span key={c} className="px-2 py-0.5 rounded bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1">
                      {c}
                      <button type="button" onClick={() => handleRemoveColor(c)} className="text-slate-500 hover:text-slate-800">
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-md"
                >
                  Guardar Producto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
