import type { Metadata } from 'next';
import './globals.css';
import { PitchModeSwitcher } from '@/components/pitch/PitchModeSwitcher';

export const metadata: Metadata = {
  title: 'Mall OS Portals · Store OS & Mall Executive Suite',
  description: 'Plataforma B2B para Centros Comerciales y Gestión de Retail Multimarca',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
        <PitchModeSwitcher />
        <main className="flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  );
}
