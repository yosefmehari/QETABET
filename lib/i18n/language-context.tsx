'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Language, Translations, translations } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
  formatMoney: (amount: number | string | { toString(): string }) => string;
  translateLocation: (name: string | null | undefined) => string;
  translateListingType: (type: string | null | undefined) => string;
  translateFurnishing: (status: string | null | undefined) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'qetabet_preferred_language';

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Default to Amharic ('am') with seamless switch to English ('en')
  const [language, setLanguageState] = useState<Language>('am');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (saved && (saved === 'en' || saved === 'am')) {
        setLanguageState(saved);
        document.documentElement.lang = saved;
      } else {
        // Default to Amharic for Ethiopian locale
        document.documentElement.lang = 'am';
      }
    } catch {
      // Storage access error or private mode
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    } catch {
      // Storage access error
    }
  };

  const toggleLanguage = () => {
    const next = language === 'am' ? 'en' : 'am';
    setLanguage(next);
  };

  const t = useMemo(() => {
    return translations[language] || translations.am;
  }, [language]);

  const formatMoney = (amount: number | string | { toString(): string }): string => {
    const numeric = typeof amount === 'number' ? amount : Number(amount.toString());
    if (isNaN(numeric)) return language === 'am' ? '0 ብር' : '0 ETB';

    const formatted = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(numeric);

    return language === 'am' ? `${formatted} ብር` : `${formatted} ETB`;
  };

  const translateLocation = (name: string | null | undefined): string => {
    if (!name) return '';
    if (language === 'en') return name;
    return translations.am.locations[name] || name;
  };

  const translateListingType = (type: string | null | undefined): string => {
    if (!type) return '';
    return t.propertyTypes[type] || type;
  };

  const translateFurnishing = (status: string | null | undefined): string => {
    if (!status) return '';
    return t.furnishingTypes[status] || status;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        formatMoney,
        translateLocation,
        translateListingType,
        translateFurnishing,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
