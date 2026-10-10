'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Lock, Mail, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message || 'Credenciales incorrectas');
        setIsLoading(false);
        return;
      }

      if (data?.user) {
        router.push('/store/dashboard');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error de autenticación');
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-blue-600 rounded-xl mx-auto flex items-center justify-center text-white font-bold text-xl mb-3 shadow-md">
          M
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Acceso Corporativo B2B</h1>
        <p className="text-sm text-slate-500 mt-1">
          Ingreso exclusivo para gerentes de tienda y directiva de centros comerciales
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
            Correo Corporativo
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="gerente@zara.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
            Contraseña
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Validando credenciales...
            </>
          ) : (
            <>
              Ingresar a la Consola
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Seguridad TLS 1.3
        </span>
        <Link href="/store/dashboard" className="text-blue-600 font-semibold hover:underline">
          Modo Demo (Bypass) →
        </Link>
      </div>
    </div>
  );
}
