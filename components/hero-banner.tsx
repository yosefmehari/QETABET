'use client';

import React from 'react';
import { ShieldCheck, Droplets, Zap, Ban, CheckCircle } from 'lucide-react';

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
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-950 to-stone-950 text-white pt-8 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 -mt-12 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-12 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        {/* Anti-broker / Anti-Telegram badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300 backdrop-blur-md">
          <Ban className="h-3.5 w-3.5 text-rose-400" />
          <span>No Unofficial Telegram Scams • No Predatory 1-Month Broker Cuts</span>
        </div>

        {/* Heading */}
        <div className="mt-4 max-w-3xl">
          <h1 className="text-2xl font-black tracking-tight sm:text-4xl lg:text-5xl text-white">
            Verified Addis Ababa Rentals{' '}
            <span className="text-emerald-400 block sm:inline">
              Direct from Homeowners.
            </span>
          </h1>
          <p className="mt-3 text-sm text-stone-300 sm:text-base max-w-2xl leading-relaxed">
            Eliminate ghost listings and fake brokers. Every apartment on QetaBet is physically verified
            for continuous water tanks (Rotto), standby generator, and true market prices in ETB.
          </p>
        </div>

        {/* Quick Addis Infrastructure Highlights */}
        <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={() => onQuickFilter('hasWaterReserve', !activeWaterFilter)}
            className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition shadow-sm ${
              activeWaterFilter
                ? 'bg-sky-500 text-white ring-2 ring-sky-300'
                : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
            }`}
          >
            <Droplets className="h-4 w-4 text-sky-400" />
            <span>Water Tank Guaranteed</span>
            {activeWaterFilter && <CheckCircle className="h-3.5 w-3.5 ml-1" />}
          </button>

          <button
            type="button"
            onClick={() => onQuickFilter('hasGenerator', !activeGeneratorFilter)}
            className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition shadow-sm ${
              activeGeneratorFilter
                ? 'bg-amber-500 text-white ring-2 ring-amber-300'
                : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
            }`}
          >
            <Zap className="h-4 w-4 text-amber-400 fill-amber-400" />
            <span>Generator Backup</span>
            {activeGeneratorFilter && <CheckCircle className="h-3.5 w-3.5 ml-1" />}
          </button>

          <div className="hidden sm:flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs text-stone-300">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>National ID & Title Deed Vetted</span>
          </div>
        </div>
      </div>
    </section>
  );
}
