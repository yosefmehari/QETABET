'use client';

import React from 'react';
import { Home, Shield } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="border-t border-stone-200 bg-stone-900 text-stone-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white font-black">
              <Home className="h-5 w-5" />
            </div>
            <span className="text-xl font-black text-white tracking-tight">
              QETA<span className="text-emerald-500">BET</span>
            </span>
          </div>
          <p className="text-xs text-stone-400 max-w-md leading-relaxed">
            {t.footer.tagline}
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold pt-1">
            <Shield className="h-4 w-4" />
            <span>{t.footer.livingParameters}</span>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
            {t.footer.majorSubCitiesTitle}
          </h4>
          <ul className="space-y-2 text-xs text-stone-400">
            <li>{language === 'am' ? 'ቦሌ (ሲኤምሲ፣ አትላስ፣ መድኃኔዓለም፣ ገርጂ)' : 'Bole (CMC, Atlas, Medhanialem, Gerji)'}</li>
            <li>{language === 'am' ? 'ቂርቆስ (ካዛንቺስ፣ ኦሊምፒያ፣ ሜክሲኮ)' : 'Kirkos (Kazanchis, Olympia, Mexico)'}</li>
            <li>{language === 'am' ? 'የካ (መገናኛ፣ ሲግናል፣ ኮተቤ)' : 'Yeka (Megenagna, Signal, Kotebe)'}</li>
            <li>{language === 'am' ? 'ንፋስ ስልክ ላፍቶ (ሳርቤት፣ ብስራተ ገብርኤል)' : 'Nifas Silk-Lafto (Sarbet, Bisrate Gabriel)'}</li>
            <li>{language === 'am' ? 'አራዳ (ፒያሳ፣ 4 ኪሎ፣ 6 ኪሎ)' : 'Arada (Piazza, 4 Kilo, 6 Kilo)'}</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
            {t.footer.paymentSupportTitle}
          </h4>
          <ul className="space-y-2 text-xs text-stone-400">
            <li>{t.footer.telebirrEscrow}</li>
            <li>{t.footer.chapaBanking}</li>
            <li>{t.footer.verificationNotice}</li>
            <li className="pt-2 text-[11px] text-stone-500">
              {t.footer.addressNotice}
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-7xl mt-8 pt-6 border-t border-stone-800 text-center text-xs text-stone-500">
        © {new Date().getFullYear()} {t.footer.copyright}
      </div>
    </footer>
  );
}
