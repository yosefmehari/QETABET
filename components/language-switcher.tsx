'use client';

import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  variant?: 'pill' | 'compact' | 'badge';
  className?: string;
}

export function LanguageSwitcher({ variant = 'pill', className = '' }: LanguageSwitcherProps) {
  const { language, setLanguage, toggleLanguage } = useLanguage();

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={toggleLanguage}
        className={`inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-stone-50 px-2.5 py-1.5 text-xs font-bold text-stone-700 hover:bg-stone-100 hover:border-stone-300 transition active:scale-95 shadow-2xs ${className}`}
        title={language === 'am' ? 'Switch to English' : 'ወደ አማርኛ ቀይር'}
        aria-label="Toggle language between Amharic and English"
      >
        <span className="text-sm leading-none" role="img" aria-label={language === 'am' ? 'Ethiopian Flag' : 'UK Flag'}>
          {language === 'am' ? '🇪🇹' : '🇬🇧'}
        </span>
        <span className="tracking-tight">{language === 'am' ? 'አማ' : 'EN'}</span>
      </button>
    );
  }

  return (
    <div
      className={`inline-flex items-center rounded-xl border border-stone-200/90 bg-stone-100/90 p-0.5 text-xs font-bold shadow-2xs ${className}`}
      role="group"
      aria-label="Language selector"
    >
      <button
        type="button"
        onClick={() => setLanguage('am')}
        className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 transition-all duration-200 ${
          language === 'am'
            ? 'bg-white text-emerald-800 shadow-xs ring-1 ring-stone-200/50'
            : 'text-stone-600 hover:text-stone-900'
        }`}
        aria-pressed={language === 'am'}
      >
        <span className="text-sm leading-none" role="img" aria-label="Ethiopia">
          🇪🇹
        </span>
        <span>አማርኛ</span>
      </button>

      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 transition-all duration-200 ${
          language === 'en'
            ? 'bg-white text-emerald-800 shadow-xs ring-1 ring-stone-200/50'
            : 'text-stone-600 hover:text-stone-900'
        }`}
        aria-pressed={language === 'en'}
      >
        <span className="text-sm leading-none" role="img" aria-label="English">
          🇬🇧
        </span>
        <span>EN</span>
      </button>
    </div>
  );
}
