'use client';

import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { initiatePaymentMock } from '@/actions/listings';
import { useLanguage } from '@/lib/i18n';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  listingId: string;
  listingTitle: string;
  monthlyRent: number;
}

export function PaymentModal({
  isOpen,
  onClose,
  listingId,
  listingTitle,
  monthlyRent,
}: PaymentModalProps) {
  const { t, formatMoney } = useLanguage();
  const [provider, setProvider] = useState<'TELEBIRR' | 'CHAPA'>('TELEBIRR');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [receipt, setReceipt] = useState<{ txRef: string; status: string; message: string } | null>(
    null
  );
  const [error, setError] = useState('');

  if (!isOpen) return null;

  // Standard reserve holding deposit (e.g., 10% of 1 month rent or 2,000 ETB)
  const depositAmount = Math.max(2000, Math.round(monthlyRent * 0.1));

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.trim().length < 9) {
      setError(t.payment.errorPhone);
      return;
    }
    setError('');
    setIsProcessing(true);

    try {
      const res = await initiatePaymentMock({
        listingId,
        amount: depositAmount,
        provider,
        phoneNumber: phoneNumber.trim(),
      });
      setReceipt(res);
    } catch {
      setError(t.payment.errorFailed);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition"
        >
          <X className="h-5 w-5" />
        </button>

        {receipt ? (
          <div className="py-4 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                {t.payment.successBadge}
              </span>
              <h3 className="mt-2 text-lg font-bold text-stone-900">{t.payment.successTitle}</h3>
              <p className="mt-1 text-xs text-stone-500">{listingTitle}</p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-500">{t.payment.txRefLabel}</span>
                <span className="font-mono font-bold text-stone-900">{receipt.txRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{t.payment.methodLabel}</span>
                <span className="font-bold text-stone-900">{provider}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{t.payment.amountPaidLabel}</span>
                <span className="font-bold text-emerald-700">{formatMoney(depositAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{t.payment.statusLabel}</span>
                <span className="font-semibold text-emerald-600 uppercase">{receipt.status}</span>
              </div>
            </div>

            <p className="text-[11px] text-stone-500">
              {t.payment.holdingNotice}
            </p>

            <button
              onClick={onClose}
              className="w-full rounded-xl bg-stone-900 py-2.5 text-xs font-bold text-white hover:bg-emerald-600 transition"
            >
              {t.payment.doneBtn}
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-stone-900">{t.payment.title}</h3>
              </div>
              <p className="text-xs text-stone-500 mt-1">
                {t.payment.subtitle}
              </p>
            </div>

            <div className="mb-4 rounded-xl bg-stone-50 p-3 border border-stone-200 text-xs flex justify-between items-center">
              <div>
                <p className="font-semibold text-stone-800">{t.payment.holdingReservation}</p>
                <p className="text-[11px] text-stone-500">{t.payment.deductedNotice}</p>
              </div>
              <span className="text-base font-extrabold text-stone-900">
                {formatMoney(depositAmount)}
              </span>
            </div>

            {error && (
              <div className="mb-3 flex items-center gap-2 rounded-xl bg-rose-50 p-3 text-xs text-rose-700">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handlePay} className="space-y-4">
              {/* Payment Gateway Picker */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  {t.payment.selectGatewayLabel}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {/* Telebirr */}
                  <button
                    type="button"
                    onClick={() => setProvider('TELEBIRR')}
                    className={`flex flex-col items-center justify-center rounded-xl border p-3 text-center transition ${
                      provider === 'TELEBIRR'
                        ? 'border-sky-500 bg-sky-50/60 ring-2 ring-sky-300'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <span className="text-xs font-extrabold text-sky-700">Telebirr (ቴሌብር)</span>
                    <span className="text-[10px] text-stone-500 mt-0.5">{t.payment.telebirrSub}</span>
                  </button>

                  {/* Chapa */}
                  <button
                    type="button"
                    onClick={() => setProvider('CHAPA')}
                    className={`flex flex-col items-center justify-center rounded-xl border p-3 text-center transition ${
                      provider === 'CHAPA'
                        ? 'border-lime-600 bg-lime-50/60 ring-2 ring-lime-400'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <span className="text-xs font-extrabold text-lime-700">Chapa (ቻፓ)</span>
                    <span className="text-[10px] text-stone-500 mt-0.5">{t.payment.chapaSub}</span>
                  </button>
                </div>
              </div>

              {/* Phone number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  {t.payment.phoneLabel} ({provider})
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+251 91 123 4567"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div className="flex items-center gap-2 text-[11px] text-stone-500">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>{t.payment.encryptionBadge}</span>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white shadow hover:bg-emerald-700 transition disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>{t.payment.authorizingBtn} {provider}...</span>
                  </>
                ) : (
                  <span>{t.payment.payBtn} {formatMoney(depositAmount)} ({provider})</span>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
