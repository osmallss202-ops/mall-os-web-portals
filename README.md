# Mall OS Web Portals · B2B Suite

Suite corporativa web de escritorio para centros comerciales y cadenas de retail, construida con **Next.js 14 App Router**, **Tailwind CSS**, **Supabase SSR**, y componentes de alta fidelidad.

---

## 🏛️ Estructura del Proyecto

* **`src/app/(public)`**: Landing page institucional para presentación ejecutiva y acceso general.
* **`src/app/(auth)`**: Login corporativo B2B seguro con email, contraseña y callback.
* **`src/app/(store)`**: **Store OS** para locatarios y marcas (CRUD de productos con `price_min`, `price_max`, tallas, colores, ofertas y validador de canje).
* **`src/app/(mall)`**: **Mall Executive OS** para juntas directivas y consorcios (Dashboard con los 4 KPIs clave, directorio de más de 1.000 locales, eventos, concursos y auditoría).
* **`src/components/pitch`**: **PitchModeSwitcher** blindado por variable de entorno `NEXT_PUBLIC_DEMO_MODE=true` con banner rojo de advertencia.

---

## 🚀 Instalación y Puesta en Marcha

1. **Instalar dependencias:**
   ```bash
   pnpm install
   ```

2. **Configurar variables de entorno:**
   Copia el archivo de ejemplo y completa tus credenciales de Supabase:
   ```bash
   cp .env.local.example .env.local
   ```

3. **Iniciar en modo desarrollo:**
   ```bash
   pnpm dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🛡️ Seguridad y Pitch Mode

* **Modo Demostración en Vivo:** Cuando `NEXT_PUBLIC_DEMO_MODE=true`, la barra superior permite alternar instantáneamente entre la consola de **Gerente ZARA** y la consola de **Gerencia Sambil** sin fricción de contraseñas.
* **Producción:** En despliegues de producción (`DEMO_MODE=false`), el switcher se desactiva automáticamente y el acceso se restringe mediante políticas estrictas en `middleware.ts`.
