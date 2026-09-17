import React from 'react';
import { ShieldCheck, XCircle, CheckCircle2, AlertTriangle, Zap, Droplets, Banknote } from 'lucide-react';

export function AddisMarketInfo() {
  return (
    <section className="mt-16 border-t border-stone-200 bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            Why QetaBet?
          </span>
          <h2 className="mt-3 text-2xl font-black text-stone-900 sm:text-3xl">
            Fixing Addis Ababa's Rental Chaos
          </h2>
          <p className="mt-2 text-sm text-stone-600">
            Comparing typical Addis renting methods with QetaBet direct verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Telegram Channels */}
          <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-rose-800 text-sm">Telegram Channels</span>
                <span className="rounded-full bg-rose-100 p-1 text-rose-600">
                  <XCircle className="h-5 w-5" />
                </span>
              </div>
              <ul className="space-y-3 text-xs text-stone-700">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>Unstructured photo spam with zero address or verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>Fake listings stolen from Pinterest and Airbnb</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>Ghost landlords demanding advance Telebirr payments upfront</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-rose-200/60 text-xs font-semibold text-rose-700">
              High Risk • Zero Protection
            </div>
          </div>

          {/* Predatory Delalas */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-amber-900 text-sm">Traditional Street Brokers (ደላላ)</span>
                <span className="rounded-full bg-amber-100 p-1 text-amber-700">
                  <Banknote className="h-5 w-5" />
                </span>
              </div>
              <ul className="space-y-3 text-xs text-stone-700">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Extorts a mandatory full 1-month rent commission from you</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Inflates landlord prices artificially to maximize their cut</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Hides water rationing schedule and electricity blackout realities</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-amber-200/60 text-xs font-semibold text-amber-800">
              Costs 30,000 - 80,000+ ETB in lost fees
            </div>
          </div>

          {/* QetaBet Solution */}
          <div className="rounded-2xl border-2 border-emerald-500 bg-emerald-50/70 p-6 flex flex-col justify-between shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              Recommended
            </div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-emerald-950 text-base">QetaBet Direct (ቀጣቤት)</span>
                <span className="rounded-full bg-emerald-600 p-1 text-white">
                  <CheckCircle2 className="h-5 w-5" />
                </span>
              </div>
              <ul className="space-y-3 text-xs text-emerald-950 font-medium">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>0% Delala Broker Fee:</strong> Deal directly with the verified homeowner</span>
                </li>
                <li className="flex items-start gap-2">
                  <Droplets className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                  <span><strong>Water Reserve Audited:</strong> Rotto tank capacity and pump verified</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Generator Verified:</strong> Standby power for Addis outages</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-emerald-200 text-xs font-bold text-emerald-800">
              Direct Phone & Chat • Telebirr / Chapa Ready
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
