'use client';

import React, { useState } from 'react';
import {
  Phone,
  MessageSquare,
  CreditCard,
  ShieldCheck,
  Ban,
  CheckCircle,
} from 'lucide-react';
import { formatETB } from '@/lib/utils';
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
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  // Standard broker comparison: A delala takes 1 full month of rent
  const brokerSavings = monthlyRent;

  return (
    <div className="sticky top-24 space-y-4">
      {/* Price Card */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-lg space-y-5">
        <div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-stone-900">
              {formatETB(monthlyRent)}
            </span>
            <span className="text-xs font-semibold text-stone-500">per month</span>
          </div>

          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <span className="rounded-md bg-stone-100 px-2 py-1 text-stone-600 font-medium">
              Deposit: {depositMonths} {depositMonths === 1 ? 'month' : 'months'}
            </span>
            {isPriceNegotiable ? (
              <span className="rounded-md bg-amber-100 px-2 py-1 text-amber-800 font-semibold">
                Negotiable with Landlord
              </span>
            ) : (
              <span className="rounded-md bg-stone-100 px-2 py-1 text-stone-600 font-medium">
                Fixed Price
              </span>
            )}
          </div>
        </div>

        {/* Delala savings banner */}
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3.5 text-xs text-emerald-950">
          <div className="flex items-center gap-1.5 font-bold text-emerald-800">
            <Ban className="h-4 w-4 text-emerald-600" />
            <span>You Save {formatETB(brokerSavings)}!</span>
          </div>
          <p className="mt-1 text-[11px] text-emerald-900/80">
            By renting directly through QetaBet, you avoid paying the standard 1-month broker fee.
          </p>
        </div>

        {/* Primary CTAs */}
        <div className="space-y-2.5">
          {/* Direct Phone Call */}
          <a
            href={`tel:${landlordPhone}`}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white shadow hover:bg-emerald-700 transition"
          >
            <Phone className="h-4 w-4" />
            <span>Call Landlord: {landlordPhone}</span>
          </a>

          {/* Send Inquiry Form */}
          <button
            type="button"
            onClick={() => setIsInquiryOpen(true)}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-stone-50 py-3 text-xs font-bold text-stone-800 hover:bg-stone-100 transition"
          >
            <MessageSquare className="h-4 w-4 text-emerald-700" />
            <span>Send Direct Message / Schedule Visit</span>
          </button>

          {/* Reserve / Holding deposit */}
          <button
            type="button"
            onClick={() => setIsPaymentOpen(true)}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-sky-300 bg-sky-50 py-3 text-xs font-bold text-sky-800 hover:bg-sky-100 transition"
          >
            <CreditCard className="h-4 w-4 text-sky-600" />
            <span>Reserve via Telebirr or Chapa</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="pt-2 border-t border-stone-100 space-y-2 text-[11px] text-stone-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span>Identity and ownership papers physically inspected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span>No hidden delala fees or unexpected charges</span>
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
