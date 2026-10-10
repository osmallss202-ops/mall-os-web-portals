import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bgncghyhyosugfnraoqm.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

  // Si está en modo demo explícito para pitch comercial, permite acceso a /store y /admin
  if (isDemo && (path.startsWith('/store') || path.startsWith('/admin'))) {
    return supabaseResponse;
  }

  // Rutas protegidas que requieren autenticación real en producción
  const isProtectedRoute = path.startsWith('/store') || path.startsWith('/admin');
  const isAuthRoute = path.startsWith('/login') || path.startsWith('/magic-link') || path.startsWith('/callback');

  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (user && isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/store/dashboard';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
