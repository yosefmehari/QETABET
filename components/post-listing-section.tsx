'use client';

import React, { useState } from 'react';
import { PlusCircle, ShieldCheck, CheckCircle2, Phone, Check } from 'lucide-react';

export function PostListingSection() {
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
              For Addis Landlords & Homeowners
            </span>
            <h2 className="mt-4 text-2xl sm:text-3xl font-black text-white">
              Rent Your Property Directly. Keep 100% of the Rent.
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-stone-300 leading-relaxed">
              Tired of unreliable brokers demanding kickbacks or misrepresenting your apartment? List on QetaBet, get verified by our Addis inspection team, and connect with serious, pre-screened tenants directly.
            </p>

            <ul className="mt-5 space-y-2 text-xs text-stone-200">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Zero broker commission (0% Delala)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Direct Telebirr / Chapa escrow payments</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Water tank & power backup badge verification</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-6 text-stone-900 shadow-xl">
            {submitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-stone-900">Request Received!</h3>
                <p className="text-xs text-stone-600">
                  Our Addis Ababa onboarding specialist will call {phone} within 2 hours to schedule your free photographic & tank verification visit.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  List Your Property in 2 Minutes
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Enter your phone number to start direct landlord onboarding.
                </p>

                <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Phone Number (Ethiopia)
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
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white shadow hover:bg-emerald-700 transition"
                  >
                    <PlusCircle className="h-4 w-4" />
                    <span>Get Free Landlord Verification</span>
                  </button>

                  <p className="text-[10px] text-center text-stone-400">
                    By submitting, you agree to direct tenant communication with zero broker fees.
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
