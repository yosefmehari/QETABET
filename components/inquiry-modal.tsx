'use client';

import React, { useState, useEffect } from 'react';
import { X, Send, Phone, CheckCircle2, AlertCircle } from 'lucide-react';
import { createInquiry } from '@/actions/listings';
import { useLanguage } from '@/lib/i18n';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  listingId: string;
  listingTitle: string;
  landlordName: string | null;
  landlordPhone: string;
}

export function InquiryModal({
  isOpen,
  onClose,
  listingId,
  listingTitle,
  landlordName,
  landlordPhone,
}: InquiryModalProps) {
  const { t, language } = useLanguage();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (language === 'am') {
      setMessage(
        `ሰላም ${landlordName || 'የቤት ባለቤት'}፣ በቃጣቤት ላይ ያስመዘገቡትን "${listingTitle}" ተመልክቼ ለመጎብኘት ፈልጌ ነበር።`
      );
    } else {
      setMessage(
        `Hello ${landlordName || 'Landlord'}, I saw your listing for "${listingTitle}" on QetaBet and I am interested in scheduling a viewing.`
      );
    }
  }, [language, landlordName, listingTitle]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.trim().length < 9) {
      setError(t.inquiry.errorPhone);
      return;
    }
    setError('');
    setIsSubmitting(true);

    try {
      await createInquiry({
        listingId,
        senderPhone: phoneNumber.trim(),
        senderName: name.trim() || undefined,
        message: message.trim(),
      });
      setIsSuccess(true);
    } catch {
      setError(t.inquiry.errorSend);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition"
        >
          <X className="h-5 w-5" />
        </button>

        {isSuccess ? (
          <div className="py-6 text-center space-y-3">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">{t.inquiry.successTitle}</h3>
            <p className="text-sm text-stone-600 max-w-sm mx-auto">
              {t.inquiry.successDesc}
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-2 justify-center">
              <a
                href={`tel:${landlordPhone}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition"
              >
                <Phone className="h-4 w-4" />
                <span>{t.inquiry.callNowBtn}: {landlordPhone}</span>
              </a>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-stone-200 px-4 py-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition"
              >
                {t.inquiry.closeBtn}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                {t.inquiry.directContactBadge}
              </span>
              <h3 className="mt-2 text-lg font-bold text-stone-900">
                {t.inquiry.contactTitle} {landlordName ? `(${landlordName})` : ''}
              </h3>
              <p className="text-xs text-stone-500 line-clamp-1">{listingTitle}</p>
            </div>

            {error && (
              <div className="mb-4 flex items-center gap-2 rounded-xl bg-rose-50 p-3 text-xs text-rose-700">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  {t.inquiry.fullNameLabel}
                </label>
                <input
                  type="text"
                  placeholder={t.inquiry.fullNamePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  {t.inquiry.phoneLabel} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder={t.inquiry.phonePlaceholder}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  {t.inquiry.messageLabel}
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white shadow hover:bg-emerald-700 transition disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  <span>{isSubmitting ? t.inquiry.sendingBtn : t.inquiry.sendBtn}</span>
                </button>
                <a
                  href={`tel:${landlordPhone}`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-xs font-bold text-stone-700 hover:bg-stone-100 transition"
                  title="Direct Phone Call"
                >
                  <Phone className="h-4 w-4 text-emerald-600" />
                  <span className="hidden sm:inline">{t.inquiry.directCallBtn}</span>
                </a>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
