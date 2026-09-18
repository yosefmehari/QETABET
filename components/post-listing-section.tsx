'use client';

import React, { useState } from 'react';
import { PlusCircle, ShieldCheck, CheckCircle2, Phone, Check } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export function PostListingSection() {
  const { t } = useLanguage();
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 9) {
      setSubmitted(true);
    }
  };

  return (
    <section id="post-listing" className="border-t border-stone-200 bg-stone-100/60 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-950 to-stone-900 text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-400/30">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              {t.landlordSection.badge}
            </span>
            <h2 className="mt-4 text-2xl sm:text-3xl font-black text-white">
              {t.landlordSection.title}
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-stone-300 leading-relaxed">
              {t.landlordSection.subtitle}
            </p>

            <ul className="mt-5 space-y-2 text-xs text-stone-200">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{t.landlordSection.bullet1}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{t.landlordSection.bullet2}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{t.landlordSection.bullet3}</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-6 text-stone-900 shadow-xl">
            {submitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-stone-900">{t.landlordSection.receivedTitle}</h3>
                <p className="text-xs text-stone-600">
                  {t.landlordSection.receivedDesc} ({phone})
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  {t.landlordSection.formTitle}
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  {t.landlordSection.formSubtitle}
                </p>

                <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      {t.landlordSection.phoneLabel}
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                      <input
                        type="tel"
                        required
                        placeholder="+251 91 123 4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-xl border border-stone-300 pl-10 pr-3.5 py-2.5 text-xs text-stone-900 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 py-3 text-xs font-bold text-white shadow hover:from-emerald-700 hover:to-emerald-800 transition"
                  >
                    <PlusCircle className="h-4 w-4" />
                    <span>{t.landlordSection.submitBtn}</span>
                  </button>

                  <div className="pt-2 text-center">
                    <a
                      href="/listings/new"
                      className="inline-block text-xs font-bold text-emerald-700 hover:underline"
                    >
                      {t.landlordSection.fullListingLink}
                    </a>
                  </div>

                  <p className="text-[10px] text-center text-stone-400">
                    {t.landlordSection.termsNotice}
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
