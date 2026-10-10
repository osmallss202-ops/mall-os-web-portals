import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex items-center justify-center bg-slate-100/70 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200/80 p-8">
        {children}
      </div>
    </div>
  );
}
