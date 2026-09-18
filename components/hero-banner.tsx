'use client';

import React from 'react';
import { ShieldCheck, Droplets, Zap, Ban, Check } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

interface HeroBannerProps {
  onQuickFilter: (key: string, value: any) => void;
  activeWaterFilter: boolean;
  activeGeneratorFilter: boolean;
}

export function HeroBanner({
  onQuickFilter,
  activeWaterFilter,
  activeGeneratorFilter,
}: HeroBannerProps) {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#092215] via-[#0b291a] to-[#0d1f18] text-white pt-10 pb-14 px-4 sm:px-6 lg:px-8">
      {/* Aurora radial glows */}
      <div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-32 w-3/4 bg-emerald-600/10 blur-2xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        {/* Anti-broker / Anti-Telegram badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-950/60 px-4 py-1.5 text-xs font-bold text-emerald-300 backdrop-blur-md shadow-inner">
          <Ban className="h-3.5 w-3.5 text-rose-400 shrink-0" />
          <span>{t.hero.antiBrokerBadge}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
        </div>

        {/* Heading */}
        <div className="mt-5 max-w-3xl">
          <h1 className="text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl text-white leading-[1.12]">
            {t.hero.headingMain}{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
              {t.hero.headingAccent}
            </span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-stone-300 max-w-2xl leading-relaxed">
            {t.hero.headingSub}
          </p>
        </div>

        {/* Quick Addis Infrastructure Filter Triggers */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onQuickFilter('hasWaterReserve', !activeWaterFilter)}
            className={`group inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all duration-200 shadow-md ${
              activeWaterFilter
                ? 'bg-sky-500 text-white ring-2 ring-sky-300 shadow-sky-500/30 scale-102'
                : 'bg-white/10 text-stone-200 hover:bg-white/15 border border-white/15 hover:border-sky-400/50 hover:text-white'
            }`}
          >
            <div className={`p-1 rounded-lg ${activeWaterFilter ? 'bg-sky-600' : 'bg-sky-500/20 text-sky-400'}`}>
              <Droplets className="h-4 w-4" />
            </div>
            <span>{t.hero.waterFilterBtn}</span>
            {activeWaterFilter && <Check className="h-4 w-4 ml-0.5" />}
          </button>

          <button
            type="button"
            onClick={() => onQuickFilter('hasGenerator', !activeGeneratorFilter)}
            className={`group inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all duration-200 shadow-md ${
              activeGeneratorFilter
                ? 'bg-amber-500 text-white ring-2 ring-amber-300 shadow-amber-500/30 scale-102'
                : 'bg-white/10 text-stone-200 hover:bg-white/15 border border-white/15 hover:border-amber-400/50 hover:text-white'
            }`}
          >
            <div className={`p-1 rounded-lg ${activeGeneratorFilter ? 'bg-amber-600' : 'bg-amber-500/20 text-amber-400'}`}>
              <Zap className="h-4 w-4 fill-current" />
            </div>
            <span>{t.hero.genFilterBtn}</span>
            {activeGeneratorFilter && <Check className="h-4 w-4 ml-0.5" />}
          </button>

          <div className="hidden sm:flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-stone-300 backdrop-blur-sm">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>{t.hero.vettedBadge}</span>
          </div>
        </div>

        {/* Live Metrics Ticker Bar */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 pt-6 text-left">
          <div>
            <span className="text-[11px] font-semibold text-stone-400 block">{t.hero.metric1Label}</span>
            <span className="text-xl font-extrabold text-emerald-400 tracking-tight">{t.hero.metric1Value}</span>
            <span className="text-[10px] text-stone-400 block">{t.hero.metric1Sub}</span>
          </div>
          <div>
            <span className="text-[11px] font-semibold text-stone-400 block">{t.hero.metric2Label}</span>
            <span className="text-xl font-extrabold text-sky-400 tracking-tight">{t.hero.metric2Value}</span>
            <span className="text-[10px] text-stone-400 block">{t.hero.metric2Sub}</span>
          </div>
          <div>
            <span className="text-[11px] font-semibold text-stone-400 block">{t.hero.metric3Label}</span>
            <span className="text-xl font-extrabold text-amber-300 tracking-tight">{t.hero.metric3Value}</span>
            <span className="text-[10px] text-stone-400 block">{t.hero.metric3Sub}</span>
          </div>
          <div>
            <span className="text-[11px] font-semibold text-stone-400 block">{t.hero.metric4Label}</span>
            <span className="text-xl font-extrabold text-white tracking-tight">{t.hero.metric4Value}</span>
            <span className="text-[10px] text-stone-400 block">{t.hero.metric4Sub}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
