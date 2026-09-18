'use client';

import React from 'react';
import { ShieldCheck, XCircle, CheckCircle2, AlertTriangle, Zap, Droplets, Banknote, Sparkles } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export function AddisMarketInfo() {
  const { t } = useLanguage();

  return (
    <section className="mt-20 border-t border-stone-200/80 bg-gradient-to-b from-white to-stone-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100/90 border border-emerald-300/60 px-3.5 py-1 text-xs font-extrabold text-emerald-800 uppercase tracking-wider shadow-xs">
            <Sparkles className="h-3 w-3 text-emerald-600" />
            {t.market.badge}
          </span>
          <h2 className="mt-3 text-2xl font-black text-stone-900 sm:text-4xl tracking-tight">
            {t.market.title}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-500">
            {t.market.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Telegram Channels */}
          <div className="rounded-3xl border border-rose-200/80 bg-rose-50/30 p-7 flex flex-col justify-between shadow-xs transition hover:shadow-md">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="font-extrabold text-rose-900 text-sm">{t.market.telegramTitle}</span>
                <span className="rounded-2xl bg-rose-100 p-2 text-rose-600">
                  <XCircle className="h-5 w-5" />
                </span>
              </div>
              <ul className="space-y-3.5 text-xs text-stone-700">
                <li className="flex items-start gap-2.5">
                  <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{t.market.telegramBullet1}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{t.market.telegramBullet2}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{t.market.telegramBullet3}</span>
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-4 border-t border-rose-200/60 flex items-center justify-between text-xs font-bold text-rose-700">
              <span>{t.market.telegramSecurityLabel}</span>
              <span className="rounded-lg bg-rose-100 px-2 py-0.5 text-[11px]">{t.market.telegramSecurityValue}</span>
            </div>
          </div>

          {/* Predatory Delalas */}
          <div className="rounded-3xl border border-amber-200/80 bg-amber-50/30 p-7 flex flex-col justify-between shadow-xs transition hover:shadow-md">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="font-extrabold text-amber-950 text-sm">{t.market.delalaTitle}</span>
                <span className="rounded-2xl bg-amber-100 p-2 text-amber-800">
                  <Banknote className="h-5 w-5" />
                </span>
              </div>
              <ul className="space-y-3.5 text-xs text-stone-700">
                <li className="flex items-start gap-2.5">
                  <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{t.market.delalaBullet1}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{t.market.delalaBullet2}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{t.market.delalaBullet3}</span>
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-4 border-t border-amber-200/60 flex items-center justify-between text-xs font-bold text-amber-800">
              <span>{t.market.delalaCostLabel}</span>
              <span className="rounded-lg bg-amber-100 px-2 py-0.5 text-[11px]">{t.market.delalaCostValue}</span>
            </div>
          </div>

          {/* QetaBet Direct */}
          <div className="rounded-3xl border-2 border-emerald-500 bg-emerald-50/80 p-7 flex flex-col justify-between shadow-xl shadow-emerald-950/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-emerald-600 to-teal-600 text-white text-[10px] font-black px-3.5 py-1 rounded-bl-2xl uppercase tracking-wider shadow-sm">
              {t.market.qetabetBadge}
            </div>
            <div>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <span className="font-extrabold text-emerald-950 text-base">{t.market.qetabetTitle}</span>
                  <span className="block text-[11px] text-emerald-700 font-medium">{t.market.qetabetSubtitle}</span>
                </div>
                <span className="rounded-2xl bg-emerald-600 p-2 text-white shadow-sm">
                  <CheckCircle2 className="h-5 w-5" />
                </span>
              </div>
              <ul className="space-y-3.5 text-xs text-emerald-950 font-medium">
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{t.market.qetabetBullet1}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Droplets className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                  <span>{t.market.qetabetBullet2}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Zap className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{t.market.qetabetBullet3}</span>
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-4 border-t border-emerald-200/80 flex items-center justify-between text-xs font-black text-emerald-900">
              <span>{t.market.qetabetCostLabel}</span>
              <span className="rounded-lg bg-emerald-600 px-2.5 py-1 text-[11px] text-white shadow-xs">
                {t.market.qetabetCostValue}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
