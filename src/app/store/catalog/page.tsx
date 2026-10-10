'use client';

import React, { useState } from 'react';
import { Plus, ShoppingBag, Tag, Trash2, Edit2, CheckCircle2, AlertCircle, X, Sparkles, Image as ImageIcon, Eye } from 'lucide-react';

export interface ProductColorVariant {
  name: string;
  hex: string;
  images: string[];
}

export interface ProductItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  price_min: number;
  price_max: number;
  sizes: string[];
  colors: ProductColorVariant[];
  selectedColorIdx?: number;
  selectedPhotoIdx?: number;
  is_active: boolean;
}

export default function StoreCatalogPage() {
  const [products, setProducts] = useState<ProductItem[]>([
    {
      id: 'prod-1',
      name: 'Blazer Entallado Lino',
      slug: 'blazer-entallado-lino',
      description: 'Blazer de corte estructurado en mezcla de lino transpirable. Solapas de muesca y forro suave.',
      price_min: 45,
      price_max: 55,
      sizes: ['S', 'M', 'L'],
      colors: [
        {
          name: 'Beige Arena',
          hex: '#D7C4B7',
          images: [
            'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80',
            'https://images.unsplash.com/photo-1548624149-f9b1859aa9d0?w=400&q=80',
          ],
        },
        {
          name: 'Negro Clásico',
          hex: '#1E1E1E',
          images: [
            'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80',
          ],
        },
      ],
      selectedColorIdx: 0,
      is_active: true,
    },
    {
      id: 'prod-2',
      name: 'Pantalón Wide Leg Denim',
      slug: 'pantalon-wide-leg-denim',
      description: 'Pantalón vaquero de tiro alto con pernera ancha. Tejido rígido 100% algodón de primera calidad.',
      price_min: 35,
      price_max: 42,
      sizes: ['36', '38', '40', '42'],
      colors: [
        {
          name: 'Azul Claro Vintage',
          hex: '#8DA4C4',
          images: [
            'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&q=80',
          ],
        },
        {
          name: 'Azul Marino Profundo',
          hex: '#1E293B',
          images: [
            'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=400&q=80',
          ],
        },
      ],
      selectedColorIdx: 0,
      is_active: true,
    },
    {
      id: 'prod-3',
      name: 'Vestido Midi Plisado',
      slug: 'vestido-midi-plisado',
      description: 'Vestido con falda plisada soleil y cuello fluido. Cinturón elástico desmontable a tono.',
      price_min: 48,
      price_max: 60,
      sizes: ['XS', 'S', 'M'],
      colors: [
        {
          name: 'Verde Esmeralda',
          hex: '#059669',
          images: [
            'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80',
          ],
        },
        {
          name: 'Terracota Floral',
          hex: '#C2410C',
          images: [
            'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&q=80',
          ],
        },
      ],
      selectedColorIdx: 0,
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

  // Gestión de colores con múltiples fotos
  const [colors, setColors] = useState<ProductColorVariant[]>([
    {
      name: 'Negro',
      hex: '#000000',
      images: ['https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80'],
    },
  ]);
  const [currentColorName, setCurrentColorName] = useState('');
  const [currentColorHex, setCurrentColorHex] = useState('#2563EB');
  const [currentColorImageUrl, setCurrentColorImageUrl] = useState('');
  const [currentColorImagesList, setCurrentColorImagesList] = useState<string[]>([]);

  const handleAddImageToCurrentColor = () => {
    if (currentColorImageUrl.trim() && !currentColorImagesList.includes(currentColorImageUrl.trim())) {
      setCurrentColorImagesList([...currentColorImagesList, currentColorImageUrl.trim()]);
      setCurrentColorImageUrl('');
    }
  };

  const handleAddColorVariant = () => {
    if (!currentColorName.trim()) return;

    let finalImages = [...currentColorImagesList];
    if (currentColorImageUrl.trim() && !finalImages.includes(currentColorImageUrl.trim())) {
      finalImages.push(currentColorImageUrl.trim());
    }

    if (finalImages.length === 0) {
      finalImages = ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80'];
    }

    const newColor: ProductColorVariant = {
      name: currentColorName.trim(),
      hex: currentColorHex,
      images: finalImages,
    };

    setColors([...colors, newColor]);
    setCurrentColorName('');
    setCurrentColorHex('#2563EB');
    setCurrentColorImagesList([]);
    setCurrentColorImageUrl('');
  };

  const handleRemoveColorVariant = (idx: number) => {
    setColors(colors.filter((_, i) => i !== idx));
  };

  const handleAddSize = () => {
    if (sizeInput.trim() && !sizes.includes(sizeInput.trim().toUpperCase())) {
      setSizes([...sizes, sizeInput.trim().toUpperCase()]);
      setSizeInput('');
    }
  };

  const handleRemoveSize = (s: string) => {
    setSizes(sizes.filter((item) => item !== s));
  };

  const handleSelectColorInTable = (prodId: string, colorIdx: number) => {
    setProducts(
      products.map((p) => {
        if (p.id === prodId) {
          return { ...p, selectedColorIdx: colorIdx, selectedPhotoIdx: 0 };
        }
        return p;
      })
    );
  };

  const handleSelectPhotoInTable = (prodId: string, photoIdx: number) => {
    setProducts(
      products.map((p) => {
        if (p.id === prodId) {
          return { ...p, selectedPhotoIdx: photoIdx };
        }
        return p;
      })
    );
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
      colors: colors.length > 0 ? colors : [{ name: 'Único', hex: '#000000', images: [] }],
      selectedColorIdx: 0,
      is_active: true,
    };

    setProducts([newProd, ...products]);
    setIsModalOpen(false);
    setName('');
    setDescription('');
    setColors([]);
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Catálogo de Productos de Alta Conversión</h1>
          <p className="text-sm text-slate-500 mt-1">
            Cada color incluye sus propias fotografías reales para elevar la decisión de compra sobre el 75% antes de llegar a la tienda.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-md transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          Añadir Nuevo Producto
        </button>
      </div>

      {/* Banner de Estrategia */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-5 rounded-2xl flex items-start gap-4 shadow-sm border border-blue-800">
        <Sparkles className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
        <div className="text-xs leading-relaxed">
          <span className="font-bold text-sm block mb-1">Galería Visual por Color (Certeza de Compra &gt; 75%):</span>
          Cuando el visitante en la App Móvil toca un color (ej: <em>Beige</em> o <em>Negro</em>), la vitrina cambia automáticamente a las fotos exactas de esa variante. El usuario ve la prenda real en su color y talla deseada, eliminando dudas y caminando directo a caja.
        </div>
      </div>

      {/* Tabla Interactiva de Productos */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/80 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-6">Foto del Color</th>
                <th className="py-3 px-6">Producto y Detalle</th>
                <th className="py-3 px-6">Rango de Precio</th>
                <th className="py-3 px-6">Tallas</th>
                <th className="py-3 px-6">Colores (Haz clic para ver fotos)</th>
                <th className="py-3 px-6">Estado</th>
                <th className="py-3 px-6 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((p) => {
                const activeColor = p.colors[p.selectedColorIdx || 0] || p.colors[0];
                const activePhoto =
                  activeColor?.images?.[p.selectedPhotoIdx || 0] ||
                  activeColor?.images?.[0] ||
                  'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80';

                return (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                    {/* Foto interactiva según el color seleccionado */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col items-center gap-1.5">
                        <div className="relative w-16 h-20 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 group">
                          <img
                            src={activePhoto}
                            alt={p.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-xs text-[9px] text-white text-center py-0.5 truncate px-1">
                            {activeColor?.name || 'Foto'}
                          </div>
                        </div>

                        {/* Miniaturas de fotos del color activo */}
                        {activeColor?.images && activeColor.images.length > 1 && (
                          <div className="flex gap-1 max-w-[76px] justify-center flex-wrap">
                            {activeColor.images.map((imgUrl, imgIdx) => {
                              const isSelectedPhoto = (p.selectedPhotoIdx || 0) === imgIdx;
                              return (
                                <button
                                  key={imgIdx}
                                  type="button"
                                  onClick={() => handleSelectPhotoInTable(p.id, imgIdx)}
                                  className={`w-4 h-4 rounded overflow-hidden border transition-all ${
                                    isSelectedPhoto
                                      ? 'ring-2 ring-blue-500 border-blue-500 scale-110'
                                      : 'opacity-60 hover:opacity-100 border-slate-300'
                                  }`}
                                  title={`Ver foto ${imgIdx + 1} de ${activeColor.name}`}
                                >
                                  <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-900 text-base">{p.name}</div>
                      <div className="text-xs text-slate-500 max-w-xs line-clamp-2 mt-0.5">{p.description}</div>
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

                    {/* Selector interactivo de colores con badge de fotos */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-1.5 max-w-xs">
                        {p.colors.map((c, cIdx) => {
                          const isSelected = (p.selectedColorIdx || 0) === cIdx;
                          return (
                            <button
                              key={cIdx}
                              onClick={() => handleSelectColorInTable(p.id, cIdx)}
                              className={`flex items-center gap-2 px-2.5 py-1 rounded-lg text-xs font-semibold text-left transition-all ${
                                isSelected
                                  ? 'bg-slate-900 text-white shadow-sm ring-2 ring-blue-500/50'
                                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              }`}
                            >
                              <span
                                className="w-3.5 h-3.5 rounded-full border border-black/20 flex-shrink-0"
                                style={{ backgroundColor: c.hex }}
                              />
                              <span className="truncate">{c.name}</span>
                              <span className={`text-[10px] ml-auto ${isSelected ? 'text-blue-300' : 'text-slate-500'}`}>
                                ({c.images?.length || 1} {c.images?.length === 1 ? 'foto' : 'fotos'})
                              </span>
                            </button>
                          );
                        })}
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
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal / Dialog de Creación de Producto */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="font-bold text-lg text-slate-900">Añadir Producto con Fotos por Color</h2>
                <p className="text-xs text-slate-500">Cada color puede incluir una o más fotografías asociadas.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-5 mt-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Nombre del Artículo
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ej. Chaqueta Biker Cuero Sintético"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Descripción Detallada
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detalles de corte, materiales o recomendaciones de uso..."
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
                    placeholder="ej. S, M, L, XL"
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
                    <span key={s} className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-800 text-xs font-bold flex items-center gap-1.5">
                      {s}
                      <button type="button" onClick={() => handleRemoveSize(s)} className="text-blue-500 hover:text-blue-800 font-bold">
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* GESTIÓN DE COLORES Y FOTOGRAFÍAS ASOCIADAS */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-800">
                    Añadir Color y Fotografías Asociadas
                  </label>
                  <span className="text-[10px] text-blue-700 font-bold bg-blue-100 px-2 py-0.5 rounded-full">
                    Una o varias imágenes por color
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  <div className="sm:col-span-6">
                    <input
                      type="text"
                      value={currentColorName}
                      onChange={(e) => setCurrentColorName(e.target.value)}
                      placeholder="Nombre del color (ej. Beige Arena)"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                    />
                  </div>

                  <div className="sm:col-span-3 flex items-center gap-2">
                    <input
                      type="color"
                      value={currentColorHex}
                      onChange={(e) => setCurrentColorHex(e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent p-0"
                      title="Seleccionar tono exacto"
                    />
                    <span className="text-xs font-mono text-slate-600">{currentColorHex}</span>
                  </div>

                  <div className="sm:col-span-3">
                    <button
                      type="button"
                      onClick={handleAddColorVariant}
                      className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-sm"
                    >
                      + Guardar Color
                    </button>
                  </div>
                </div>

                {/* Subir / Asociar fotos para este color */}
                <div className="pt-2 border-t border-slate-200/60">
                  <span className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Fotografías para este color ({currentColorImagesList.length} añadidas):
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={currentColorImageUrl}
                      onChange={(e) => setCurrentColorImageUrl(e.target.value)}
                      placeholder="URL de foto (ej. https://...)"
                      className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white"
                    />
                    <button
                      type="button"
                      onClick={handleAddImageToCurrentColor}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl"
                    >
                      + Asociar Foto
                    </button>
                  </div>

                  {/* Botones de fotos de muestra para agilizar demostración */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
                    <span className="text-[10px] text-slate-400 font-semibold">Muestras rápidas:</span>
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentColorImagesList([
                          ...currentColorImagesList,
                          'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80',
                        ])
                      }
                      className="text-[10px] bg-slate-200/80 hover:bg-slate-300 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                    >
                      + Frontal
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentColorImagesList([
                          ...currentColorImagesList,
                          'https://images.unsplash.com/photo-1548624149-f9b1859aa9d0?w=400&q=80',
                        ])
                      }
                      className="text-[10px] bg-slate-200/80 hover:bg-slate-300 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                    >
                      + Detalle
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentColorImagesList([
                          ...currentColorImagesList,
                          'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80',
                        ])
                      }
                      className="text-[10px] bg-slate-200/80 hover:bg-slate-300 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                    >
                      + Modelo
                    </button>
                  </div>

                  {currentColorImagesList.length > 0 && (
                    <div className="flex gap-2 mt-2 overflow-x-auto py-1">
                      {currentColorImagesList.map((img, i) => (
                        <div key={i} className="relative w-12 h-14 rounded-lg overflow-hidden border border-slate-300 flex-shrink-0">
                          <img src={img} alt="preview" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setCurrentColorImagesList(currentColorImagesList.filter((_, idx) => idx !== i))}
                            className="absolute top-0.5 right-0.5 bg-black/70 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Lista de colores ya configurados */}
                {colors.length > 0 && (
                  <div className="pt-3 border-t border-slate-200">
                    <span className="text-[11px] font-bold text-slate-700 block mb-2">Colores del Producto:</span>
                    <div className="space-y-2">
                      {colors.map((c, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full border border-black/20" style={{ backgroundColor: c.hex }} />
                            <span className="font-bold text-slate-900">{c.name}</span>
                            <span className="text-[11px] text-slate-500">({c.images.length} {c.images.length === 1 ? 'imagen' : 'imágenes'})</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveColorVariant(idx)}
                            className="text-red-500 hover:text-red-700 p-1 font-bold"
                          >
                            Eliminar
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
