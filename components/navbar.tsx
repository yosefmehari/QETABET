'use client';

import React from 'react';
import Link from 'next/link';
import { Home, PlusCircle, CheckCircle2, ShieldCheck, ShieldAlert } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { LanguageSwitcher } from '@/components/language-switcher';

export function Navbar() {
  const { t, language } = useLanguage();

  return (
    <header className="sticky top-[3px] z-40 w-full border-b border-stone-200/80 bg-white/85 backdrop-blur-xl shadow-xs transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-2.5 focus:outline-none shrink-0">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-700/25 transition-transform duration-300 group-hover:scale-105">
            <Home className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            <div className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-amber-400 border-2 border-white ring-1 ring-amber-400/50" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-stone-900">
                QETA<span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">BET</span>
              </span>
              <span className="rounded-lg bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 text-[11px] font-extrabold text-emerald-800 tracking-wide">
                ቀጣቤት
              </span>
            </div>
            <p className="hidden text-[10px] font-medium text-stone-400 sm:block tracking-tight">
              {t.nav.brandSubtitle}
            </p>
          </div>
        </Link>

        {/* Value Prop Badges (Desktop) */}
        <div className="hidden xl:flex items-center gap-3 text-xs font-semibold text-stone-600">
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-50/80 px-3.5 py-1 text-emerald-900 border border-emerald-200/60 shadow-xs">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            <span>{t.nav.zeroDelala}</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-stone-100/80 px-3 py-1 text-stone-700 border border-stone-200/50">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>{t.nav.waterPower}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-medium text-stone-500">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{t.nav.telebirrChapa}</span>
          </div>
        </div>

        {/* Actions & Language Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <LanguageSwitcher variant="pill" className="hidden sm:inline-flex" />
          <LanguageSwitcher variant="compact" className="sm:hidden" />

          {/* Post Property Link */}
          <Link
            href="/listings/new"
            className="group inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 px-3 sm:px-4 py-2 text-xs font-bold text-white shadow-md shadow-emerald-700/20 hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 active:scale-95 whitespace-nowrap"
          >
            <PlusCircle className="h-4 w-4 transition-transform group-hover:rotate-90 duration-300 shrink-0" />
            <span>{t.nav.listProperty}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
