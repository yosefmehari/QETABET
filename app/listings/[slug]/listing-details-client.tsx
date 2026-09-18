'use client';

import React, { useState } from 'react';
import {
  Phone,
  MessageSquare,
  CreditCard,
  Ban,
  CheckCircle,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { InquiryModal } from '@/components/inquiry-modal';
import { PaymentModal } from '@/components/payment-modal';

interface ListingDetailsClientProps {
  listingId: string;
  listingTitle: string;
  monthlyRent: number;
  depositMonths: number;
  isPriceNegotiable: boolean;
  landlordName: string | null;
  landlordPhone: string;
}

export function ListingDetailsClient({
  listingId,
  listingTitle,
  monthlyRent,
  depositMonths,
  isPriceNegotiable,
  landlordName,
  landlordPhone,
}: ListingDetailsClientProps) {
  const { t, language, formatMoney } = useLanguage();
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  // Standard broker comparison: A delala takes 1 full month of rent
  const brokerSavings = monthlyRent;

  return (
    <div className="sticky top-24 space-y-4">
      {/* Price Card */}
      <div className="rounded-3xl border border-stone-200/90 bg-white p-7 shadow-xl shadow-stone-900/5 space-y-6">
        <div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black tracking-tight text-stone-900">
              {formatMoney(monthlyRent)}
            </span>
            <span className="text-xs font-semibold text-stone-500">{t.details.perMonth}</span>
          </div>

          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="rounded-lg bg-stone-100 px-2.5 py-1 text-stone-700 font-semibold border border-stone-200/60">
              {language === 'am' ? 'ማስያዣ:' : 'Deposit:'} {depositMonths} {depositMonths === 1 ? t.details.depositMonth : t.details.depositMonths}
            </span>
            {isPriceNegotiable ? (
              <span className="rounded-lg bg-amber-50 border border-amber-200 px-2.5 py-1 text-amber-800 font-bold">
                {t.details.priceNegotiable}
              </span>
            ) : (
              <span className="rounded-lg bg-stone-100 px-2.5 py-1 text-stone-600 font-medium">
                {t.details.priceFixed}
              </span>
            )}
          </div>
        </div>

        {/* Delala savings banner */}
        <div className="rounded-2xl border border-emerald-300/80 bg-gradient-to-br from-emerald-50 to-teal-50/50 p-4 text-xs text-emerald-950 shadow-xs">
          <div className="flex items-center gap-2 font-black text-emerald-800">
            <div className="p-1 rounded-full bg-emerald-600 text-white">
              <Ban className="h-3.5 w-3.5" />
            </div>
            <span>{t.details.brokerSavingsTitle} {formatMoney(brokerSavings)}!</span>
          </div>
          <p className="mt-1.5 text-[11px] text-emerald-900/80 leading-relaxed">
            {t.details.brokerSavingsDesc}
          </p>
        </div>

        {/* Primary CTAs */}
        <div className="space-y-3">
          {/* Direct Phone Call */}
          <a
            href={`tel:${landlordPhone}`}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 py-3.5 text-xs font-extrabold text-white shadow-md shadow-emerald-700/20 hover:from-emerald-700 hover:to-emerald-800 transition active:scale-98"
          >
            <Phone className="h-4 w-4" />
            <span>{t.details.callLandlordBtn}: {landlordPhone}</span>
          </a>

          {/* Send Inquiry Form */}
          <button
            type="button"
            onClick={() => setIsInquiryOpen(true)}
            className="w-full flex items-center justify-center gap-2 rounded-2xl border border-stone-300 bg-stone-50/80 py-3.5 text-xs font-bold text-stone-800 hover:bg-stone-100 transition active:scale-98"
          >
            <MessageSquare className="h-4 w-4 text-emerald-700" />
            <span>{t.details.sendMessageBtn}</span>
          </button>

          {/* Reserve / Holding deposit */}
          <button
            type="button"
            onClick={() => setIsPaymentOpen(true)}
            className="w-full flex items-center justify-center gap-2 rounded-2xl border border-sky-300/90 bg-sky-50/70 py-3.5 text-xs font-bold text-sky-900 hover:bg-sky-100 transition active:scale-98 shadow-xs"
          >
            <CreditCard className="h-4 w-4 text-sky-600" />
            <span>{t.details.reserveDepositBtn}</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="pt-2 border-t border-stone-100 space-y-2 text-[11px] text-stone-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span>{t.details.trustPoint1}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span>{t.details.trustPoint2}</span>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        listingId={listingId}
        listingTitle={listingTitle}
        landlordName={landlordName}
        landlordPhone={landlordPhone}
      />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        listingId={listingId}
        listingTitle={listingTitle}
        monthlyRent={monthlyRent}
      />
    </div>
  );
}
